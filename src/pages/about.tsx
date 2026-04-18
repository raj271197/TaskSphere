import Head from 'next/head';

const sections = [
  {
    title: 'What changed',
    items: [
      'Replaced the disconnected demo widgets with a real task dashboard backed by typed API routes.',
      'Added MongoDB integration with a local file fallback so development stays productive even before cloud secrets are present.',
      'Hardened the app for production with validation, security headers, linting, and deployment docs.',
    ],
  },
  {
    title: 'Architecture',
    items: [
      'Frontend: Next.js pages router with TypeScript and CSS Modules.',
      'Backend: Next.js API routes for health checks and task CRUD operations.',
      'Persistence: MongoDB Atlas in production, JSON file fallback for local development when enabled.',
    ],
  },
  {
    title: 'Deploy checklist',
    items: [
      'Set MONGODB_URI and MONGODB_DB in your host environment.',
      'Set NEXT_PUBLIC_API_BASE_URL to the public app URL when serving behind a custom domain.',
      'Disable ENABLE_FILE_FALLBACK in production so missing database configuration fails loudly.',
    ],
  },
];

export default function About() {
  return (
    <>
      <Head>
        <title>About TaskSphere</title>
      </Head>
      <main
        style={{
          width: 'min(960px, calc(100vw - 32px))',
          margin: '0 auto',
          padding: '40px 0 72px',
        }}
      >
        <section
          style={{
            padding: '32px',
            borderRadius: '28px',
            border: '1px solid rgba(148, 163, 184, 0.22)',
            background: 'rgba(255,255,255,0.84)',
            boxShadow: '0 24px 60px rgba(15, 23, 42, 0.12)',
            backdropFilter: 'blur(18px)',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              padding: '6px 12px',
              borderRadius: '999px',
              background: 'rgba(245, 158, 11, 0.14)',
              color: '#92400e',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontSize: '0.82rem',
            }}
          >
            Production notes
          </span>
          <h1 style={{ margin: '16px 0 12px', fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', color: '#0f172a' }}>
            TaskSphere is now built to survive real deployment conditions.
          </h1>
          <p style={{ color: '#475569', maxWidth: '62ch', lineHeight: 1.7 }}>
            The original repository was a polished classroom demo, but it did not have persistent data, reliable
            backend flows, environment guidance, or deployment guardrails. This version closes those gaps.
          </p>

          <div style={{ display: 'grid', gap: '18px', marginTop: '28px' }}>
            {sections.map((section) => (
              <article
                key={section.title}
                style={{
                  padding: '22px',
                  borderRadius: '22px',
                  background: 'rgba(248,250,252,0.92)',
                  border: '1px solid rgba(226,232,240,0.9)',
                }}
              >
                <h2 style={{ color: '#0f172a', marginBottom: '12px' }}>{section.title}</h2>
                <ul style={{ marginLeft: '18px', color: '#475569', lineHeight: 1.8 }}>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
