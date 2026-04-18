import Head from 'next/head';

import TaskDashboard from '@/components/TaskDashboard';

export default function Home() {
  return (
    <>
      <Head>
        <title>TaskSphere | Production-ready task dashboard</title>
      </Head>
      <main>
        <TaskDashboard />
      </main>
    </>
  );
}
