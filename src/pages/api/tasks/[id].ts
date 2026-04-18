import type { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';

import { deleteTask, getTaskById, updateTask } from '@/server/taskStore';
import type { Task } from '@/types/task';

type TaskResponse =
  | { ok: true; data: Task }
  | { ok: true; deleted: true }
  | { ok: false; error: string; issues?: string[] };

const readId = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export default async function handler(req: NextApiRequest, res: NextApiResponse<TaskResponse>) {
  const id = readId(req.query.id);

  if (!id) {
    return res.status(400).json({ ok: false, error: 'Task id is required.' });
  }

  try {
    if (req.method === 'GET') {
      const task = await getTaskById(id);

      if (!task) {
        return res.status(404).json({ ok: false, error: 'Task not found.' });
      }

      return res.status(200).json({ ok: true, data: task });
    }

    if (req.method === 'PUT') {
      const task = await updateTask(id, req.body ?? {});

      if (!task) {
        return res.status(404).json({ ok: false, error: 'Task not found.' });
      }

      return res.status(200).json({ ok: true, data: task });
    }

    if (req.method === 'DELETE') {
      const deleted = await deleteTask(id);

      if (!deleted) {
        return res.status(404).json({ ok: false, error: 'Task not found.' });
      }

      return res.status(200).json({ ok: true, deleted: true });
    }

    res.setHeader('Allow', 'GET, PUT, DELETE');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        ok: false,
        error: 'Task validation failed.',
        issues: error.issues.map((issue) => issue.message),
      });
    }

    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Unexpected server error.',
    });
  }
}
