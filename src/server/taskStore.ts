import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

import { ObjectId, type WithId } from 'mongodb';
import { z } from 'zod';

import { env, hasMongoConfig } from '@/lib/env';
import { getMongoClient } from '@/server/mongodb';
import type { Task, TaskPayload, TaskPriority, TaskStatus } from '@/types/task';

const dataDirectory = path.join(process.cwd(), 'data');
const runtimeDirectory = path.join(dataDirectory, 'runtime');
const fallbackFile = path.join(runtimeDirectory, 'tasks.json');
const seedFile = path.join(dataDirectory, 'tasks.json');

const taskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required.').max(120, 'Title is too long.'),
  description: z.string().trim().max(500, 'Description is too long.').optional().default(''),
  status: z.enum(['todo', 'in_progress', 'done']).optional().default('todo'),
  priority: z.enum(['low', 'medium', 'high']).optional().default('medium'),
  dueDate: z
    .union([z.string().datetime({ offset: true }), z.literal(''), z.null(), z.undefined()])
    .transform((value) => (value ? value : null))
    .optional()
    .default(null),
});

const taskUpdateSchema = taskSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  'At least one field must be provided.',
);

type TaskDocument = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
};

const toTask = (document: WithId<TaskDocument>): Task => ({
  id: document._id.toString(),
  title: document.title,
  description: document.description,
  status: document.status,
  priority: document.priority,
  dueDate: document.dueDate,
  createdAt: document.createdAt,
  updatedAt: document.updatedAt,
});

const isValidObjectId = (value: string) => ObjectId.isValid(value) && new ObjectId(value).toString() === value;

const normalizeSeedTask = (task: Task): Task => ({
  ...task,
  description: task.description ?? '',
  dueDate: task.dueDate ?? null,
});

const ensureRuntimeFile = async () => {
  await fs.mkdir(runtimeDirectory, { recursive: true });

  try {
    await fs.access(fallbackFile);
  } catch {
    const seedContent = await fs.readFile(seedFile, 'utf8');
    await fs.writeFile(fallbackFile, seedContent, 'utf8');
  }
};

const readFallbackTasks = async (): Promise<Task[]> => {
  await ensureRuntimeFile();
  const contents = await fs.readFile(fallbackFile, 'utf8');
  const parsed = JSON.parse(contents) as Task[];

  return parsed.map(normalizeSeedTask);
};

const writeFallbackTasks = async (tasks: Task[]) => {
  await fs.writeFile(fallbackFile, JSON.stringify(tasks, null, 2), 'utf8');
};

const listFileTasks = async () => {
  const tasks = await readFallbackTasks();
  return tasks.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
};

const createFileTask = async (payload: TaskPayload) => {
  const parsed = taskSchema.parse(payload);
  const tasks = await readFallbackTasks();
  const now = new Date().toISOString();
  const newTask: Task = {
    id: randomUUID(),
    title: parsed.title,
    description: parsed.description,
    status: parsed.status,
    priority: parsed.priority,
    dueDate: parsed.dueDate,
    createdAt: now,
    updatedAt: now,
  };

  tasks.unshift(newTask);
  await writeFallbackTasks(tasks);

  return newTask;
};

const updateFileTask = async (id: string, payload: Partial<TaskPayload>) => {
  const parsed = taskUpdateSchema.parse(payload);
  const tasks = await readFallbackTasks();
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return null;
  }

  const existing = tasks[taskIndex];
  const updatedTask: Task = {
    ...existing,
    ...parsed,
    description: parsed.description ?? existing.description,
    dueDate: parsed.dueDate !== undefined ? parsed.dueDate : existing.dueDate,
    updatedAt: new Date().toISOString(),
  };

  tasks[taskIndex] = updatedTask;
  await writeFallbackTasks(tasks);

  return updatedTask;
};

const deleteFileTask = async (id: string) => {
  const tasks = await readFallbackTasks();
  const filtered = tasks.filter((task) => task.id !== id);

  if (filtered.length === tasks.length) {
    return false;
  }

  await writeFallbackTasks(filtered);
  return true;
};

const getFileTask = async (id: string) => {
  const tasks = await readFallbackTasks();
  return tasks.find((task) => task.id === id) ?? null;
};

const getMongoCollection = async () => {
  const client = await getMongoClient();
  const database = client.db(env.mongodbDb);

  return database.collection<TaskDocument>('tasks');
};

const listMongoTasks = async () => {
  const collection = await getMongoCollection();
  const documents = await collection.find({}).sort({ updatedAt: -1 }).toArray();

  return documents.map(toTask);
};

const createMongoTask = async (payload: TaskPayload) => {
  const parsed = taskSchema.parse(payload);
  const now = new Date().toISOString();
  const collection = await getMongoCollection();
  const document = {
    title: parsed.title,
    description: parsed.description,
    status: parsed.status,
    priority: parsed.priority,
    dueDate: parsed.dueDate,
    createdAt: now,
    updatedAt: now,
  };

  const result = await collection.insertOne(document);
  return {
    id: result.insertedId.toString(),
    ...document,
  };
};

const getMongoTask = async (id: string) => {
  if (!isValidObjectId(id)) {
    return null;
  }

  const collection = await getMongoCollection();
  const document = await collection.findOne({ _id: new ObjectId(id) });

  return document ? toTask(document) : null;
};

const updateMongoTask = async (id: string, payload: Partial<TaskPayload>) => {
  if (!isValidObjectId(id)) {
    return null;
  }

  const parsed = taskUpdateSchema.parse(payload);
  const collection = await getMongoCollection();
  const existing = await collection.findOne({ _id: new ObjectId(id) });

  if (!existing) {
    return null;
  }

  const updatedDocument = {
    ...existing,
    ...parsed,
    description: parsed.description ?? existing.description,
    dueDate: parsed.dueDate !== undefined ? parsed.dueDate : existing.dueDate,
    updatedAt: new Date().toISOString(),
  };

  await collection.updateOne(
    { _id: existing._id },
    {
      $set: {
        title: updatedDocument.title,
        description: updatedDocument.description,
        status: updatedDocument.status,
        priority: updatedDocument.priority,
        dueDate: updatedDocument.dueDate,
        updatedAt: updatedDocument.updatedAt,
      },
    },
  );

  return toTask(updatedDocument);
};

const deleteMongoTask = async (id: string) => {
  if (!isValidObjectId(id)) {
    return false;
  }

  const collection = await getMongoCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });

  return result.deletedCount === 1;
};

const withStorage = async <T>(operation: (storage: 'mongodb' | 'file') => Promise<T>): Promise<T> => {
  if (!hasMongoConfig()) {
    return operation('file');
  }

  try {
    return await operation('mongodb');
  } catch (error) {
    if (!env.enableFileFallback) {
      throw error;
    }

    return operation('file');
  }
};

export const listTasks = async () =>
  withStorage((storage) => (storage === 'mongodb' ? listMongoTasks() : listFileTasks()));

export const createTask = async (payload: TaskPayload) =>
  withStorage((storage) => (storage === 'mongodb' ? createMongoTask(payload) : createFileTask(payload)));

export const getTaskById = async (id: string) =>
  withStorage((storage) => (storage === 'mongodb' ? getMongoTask(id) : getFileTask(id)));

export const updateTask = async (id: string, payload: Partial<TaskPayload>) =>
  withStorage((storage) => (storage === 'mongodb' ? updateMongoTask(id, payload) : updateFileTask(id, payload)));

export const deleteTask = async (id: string) =>
  withStorage((storage) => (storage === 'mongodb' ? deleteMongoTask(id) : deleteFileTask(id)));

export const getTaskStorageHealth = async () => {
  if (!hasMongoConfig()) {
    return {
      status: 'degraded' as const,
      storage: 'file' as const,
      message: 'MONGODB_URI is not configured. Using local file persistence.',
    };
  }

  try {
    await getMongoCollection();

    return {
      status: 'ok' as const,
      storage: 'mongodb' as const,
      message: 'MongoDB connection is healthy.',
    };
  } catch (error) {
    if (env.enableFileFallback) {
      return {
        status: 'degraded' as const,
        storage: 'file' as const,
        message:
          error instanceof Error
            ? `MongoDB connection failed. Falling back to local file storage: ${error.message}`
            : 'MongoDB connection failed. Falling back to local file storage.',
      };
    }

    throw error;
  }
};
