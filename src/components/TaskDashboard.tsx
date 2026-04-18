import { FormEvent, useEffect, useMemo, useState } from 'react';

import { buildApiUrl } from '@/lib/api';
import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  type Task,
  type TaskHealth,
  type TaskPayload,
  type TaskPriority,
  type TaskStatus,
} from '@/types/task';

import styles from './TaskDashboard.module.css';

type ApiListResponse = {
  ok: boolean;
  data?: Task[];
  error?: string;
  issues?: string[];
};

type ApiTaskResponse = {
  ok: boolean;
  data?: Task;
  deleted?: boolean;
  error?: string;
  issues?: string[];
};

type HealthResponse = {
  ok: boolean;
  storage?: TaskHealth;
  error?: string;
};

type FormState = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
};

const emptyForm: FormState = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  dueDate: '',
};

const statusLabels: Record<TaskStatus, string> = {
  todo: 'To do',
  in_progress: 'In progress',
  done: 'Done',
};

const formatDate = (value: string | null) =>
  value
    ? new Intl.DateTimeFormat('en-CA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(new Date(value))
    : 'No due date';

export default function TaskDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [health, setHealth] = useState<TaskHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const groupedTasks = useMemo(
    () =>
      TASK_STATUSES.reduce(
        (groups, status) => ({
          ...groups,
          [status]: tasks.filter((task) => task.status === status),
        }),
        {} as Record<TaskStatus, Task[]>,
      ),
    [tasks],
  );

  const stats = useMemo(
    () => ({
      total: tasks.length,
      highPriority: tasks.filter((task) => task.priority === 'high').length,
      inProgress: tasks.filter((task) => task.status === 'in_progress').length,
      done: tasks.filter((task) => task.status === 'done').length,
    }),
    [tasks],
  );

  const loadTasks = async () => {
    setLoading(true);
    setError('');

    try {
      const [taskResponse, healthResponse] = await Promise.all([
        fetch(buildApiUrl('/api/tasks')),
        fetch(buildApiUrl('/api/health')),
      ]);

      const taskPayload = (await taskResponse.json()) as ApiListResponse;
      const healthPayload = (await healthResponse.json()) as HealthResponse;

      if (!taskResponse.ok || !taskPayload.ok || !taskPayload.data) {
        throw new Error(taskPayload.error ?? 'Failed to load tasks.');
      }

      setTasks(taskPayload.data);
      setHealth(healthPayload.storage ?? null);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Failed to load dashboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadTasks();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingTaskId(null);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    const payload: TaskPayload = {
      title: form.title,
      description: form.description,
      status: form.status,
      priority: form.priority,
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
    };

    try {
      const response = await fetch(buildApiUrl(editingTaskId ? `/api/tasks/${editingTaskId}` : '/api/tasks'), {
        method: editingTaskId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as ApiTaskResponse;

      if (!response.ok || !result.ok || !result.data) {
        const issues = result.issues?.join(' ');
        throw new Error(issues || result.error || 'Unable to save task.');
      }

      const savedTask = result.data;

      setTasks((current) => {
        if (editingTaskId) {
          return current.map((task) => (task.id === savedTask.id ? savedTask : task));
        }

        return [savedTask, ...current];
      });
      resetForm();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Task save failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
    });
  };

  const toggleStatus = async (task: Task) => {
    const nextStatus: TaskStatus =
      task.status === 'todo' ? 'in_progress' : task.status === 'in_progress' ? 'done' : 'todo';

    try {
      const response = await fetch(buildApiUrl(`/api/tasks/${task.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: nextStatus }),
      });

      const result = (await response.json()) as ApiTaskResponse;

      if (!response.ok || !result.ok || !result.data) {
        throw new Error(result.error ?? 'Unable to update task status.');
      }

      const updatedTask = result.data;
      setTasks((current) => current.map((item) => (item.id === task.id ? updatedTask : item)));
    } catch (toggleError) {
      setError(toggleError instanceof Error ? toggleError.message : 'Status update failed.');
    }
  };

  const removeTask = async (taskId: string) => {
    try {
      const response = await fetch(buildApiUrl(`/api/tasks/${taskId}`), {
        method: 'DELETE',
      });

      const result = (await response.json()) as ApiTaskResponse;

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? 'Unable to delete task.');
      }

      setTasks((current) => current.filter((task) => task.id !== taskId));

      if (editingTaskId === taskId) {
        resetForm();
      }
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Task delete failed.');
    }
  };

  return (
    <section className={styles.shell}>
      <div className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Production-ready TaskSphere</span>
          <h1>Manage work with a frontend and API that can actually ship.</h1>
          <p>
            This dashboard runs against Next.js API routes, supports MongoDB in production, and falls back to local
            file persistence when the database is unavailable during development.
          </p>
        </div>
        <div className={styles.metrics}>
          <article>
            <span>Total tasks</span>
            <strong>{stats.total}</strong>
          </article>
          <article>
            <span>High priority</span>
            <strong>{stats.highPriority}</strong>
          </article>
          <article>
            <span>In progress</span>
            <strong>{stats.inProgress}</strong>
          </article>
          <article>
            <span>Completed</span>
            <strong>{stats.done}</strong>
          </article>
        </div>
      </div>

      <div className={styles.statusBar}>
        <div>
          <strong>API status</strong>
          <p>{health ? health.message : 'Checking backend status...'}</p>
        </div>
        <span className={`${styles.healthBadge} ${health?.status === 'ok' ? styles.ok : styles.degraded}`}>
          {health ? `${health.storage.toUpperCase()} ${health.status === 'ok' ? 'ready' : 'fallback'}` : 'Loading'}
        </span>
      </div>

      {error ? <div className={styles.errorBanner}>{error}</div> : null}

      <div className={styles.workspace}>
        <form className={styles.editorCard} onSubmit={onSubmit}>
          <div className={styles.cardHeader}>
            <div>
              <span className={styles.cardEyebrow}>{editingTaskId ? 'Update task' : 'Create task'}</span>
              <h2>{editingTaskId ? 'Edit selected task' : 'Add something important'}</h2>
            </div>
            {editingTaskId ? (
              <button type="button" className={styles.secondaryButton} onClick={resetForm}>
                Cancel edit
              </button>
            ) : null}
          </div>

          <label className={styles.field}>
            <span>Title</span>
            <input
              required
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              placeholder="Prepare production deployment"
            />
          </label>

          <label className={styles.field}>
            <span>Description</span>
            <textarea
              rows={4}
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              placeholder="Capture anything teammates or recruiters should know."
            />
          </label>

          <div className={styles.fieldRow}>
            <label className={styles.field}>
              <span>Status</span>
              <select
                value={form.status}
                onChange={(event) =>
                  setForm((current) => ({ ...current, status: event.target.value as TaskStatus }))
                }
              >
                {TASK_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {statusLabels[status]}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <span>Priority</span>
              <select
                value={form.priority}
                onChange={(event) =>
                  setForm((current) => ({ ...current, priority: event.target.value as TaskPriority }))
                }
              >
                {TASK_PRIORITIES.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority[0].toUpperCase()}
                    {priority.slice(1)}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <span>Due date</span>
              <input
                type="date"
                value={form.dueDate}
                onChange={(event) => setForm((current) => ({ ...current, dueDate: event.target.value }))}
              />
            </label>
          </div>

          <button className={styles.primaryButton} type="submit" disabled={submitting}>
            {submitting ? 'Saving...' : editingTaskId ? 'Update task' : 'Create task'}
          </button>
        </form>

        <div className={styles.board}>
          {loading ? (
            <div className={styles.loadingCard}>Loading tasks...</div>
          ) : (
            TASK_STATUSES.map((status) => (
              <section key={status} className={styles.column}>
                <div className={styles.columnHeader}>
                  <h3>{statusLabels[status]}</h3>
                  <span>{groupedTasks[status].length}</span>
                </div>

                <div className={styles.columnBody}>
                  {groupedTasks[status].length === 0 ? (
                    <p className={styles.emptyState}>No tasks in this lane yet.</p>
                  ) : (
                    groupedTasks[status].map((task) => (
                      <article key={task.id} className={styles.taskCard}>
                        <div className={styles.taskCardTop}>
                          <span className={`${styles.priorityBadge} ${styles[task.priority]}`}>{task.priority}</span>
                          <span className={styles.dateLabel}>{formatDate(task.dueDate)}</span>
                        </div>
                        <h4>{task.title}</h4>
                        <p>{task.description || 'No description provided.'}</p>
                        <div className={styles.metaRow}>
                          <span>Updated {formatDate(task.updatedAt)}</span>
                          <span>{statusLabels[task.status]}</span>
                        </div>
                        <div className={styles.actionRow}>
                          <button type="button" className={styles.secondaryButton} onClick={() => startEditing(task)}>
                            Edit
                          </button>
                          <button type="button" className={styles.secondaryButton} onClick={() => toggleStatus(task)}>
                            Move
                          </button>
                          <button type="button" className={styles.dangerButton} onClick={() => removeTask(task.id)}>
                            Delete
                          </button>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
