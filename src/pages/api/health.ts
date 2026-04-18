import type { NextApiRequest, NextApiResponse } from 'next';

import { getTaskStorageHealth } from '@/server/taskStore';

type HealthResponse =
  | {
      ok: true;
      environment: string;
      timestamp: string;
      storage: Awaited<ReturnType<typeof getTaskStorageHealth>>;
    }
  | {
      ok: false;
      environment: string;
      timestamp: string;
      error: string;
    };

export default async function handler(req: NextApiRequest, res: NextApiResponse<HealthResponse>) {
  if (req.method && req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({
      ok: false,
      environment: process.env.NODE_ENV ?? 'development',
      timestamp: new Date().toISOString(),
      error: 'Method not allowed.',
    });
  }

  try {
    const storage = await getTaskStorageHealth();

    return res.status(storage.status === 'ok' ? 200 : 207).json({
      ok: true,
      environment: process.env.NODE_ENV ?? 'development',
      timestamp: new Date().toISOString(),
      storage,
    });
  } catch (error) {
    return res.status(503).json({
      ok: false,
      environment: process.env.NODE_ENV ?? 'development',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Health check failed.',
    });
  }
}
