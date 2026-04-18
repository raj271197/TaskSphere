import type { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';

import { createTask, listTasks } from '@/server/taskStore';
import type { Task } from '@/types/task';

type TaskListResponse =
  | { ok: true; data: Task[] }
  | { ok: false; error: string };

type TaskCreateResponse =
  | { ok: true; data: Task }
  | { ok: false; error: string; issues?: string[] };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TaskListResponse | TaskCreateResponse>,
) {
  try {
    if (req.method === 'GET') {
      const tasks = await listTasks();
      return res.status(200).json({ ok: true, data: tasks });
    }

    if (req.method === 'POST') {
      const task = await createTask(req.body ?? {});
      return res.status(201).json({ ok: true, data: task });
    }

    res.setHeader('Allow', 'GET, POST');
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
