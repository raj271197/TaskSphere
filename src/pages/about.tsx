export default function About() {
  return (
    <main style={{ minHeight: '100vh', padding: '60px 20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'rgba(255,255,255,0.95)', padding: '40px', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', backdropFilter: 'blur(10px)' }}>
        <h1 style={{ color: '#667eea', fontSize: '2.5rem', marginBottom: '20px', textAlign: 'center' }}>🎯 About This Project</h1>
        
        <div style={{ color: '#333', lineHeight: '1.8', fontSize: '16px' }}>
          <p style={{ marginBottom: '20px' }}>
            <strong>📚 CPAN 144 Final Exam Project</strong><br/>
            This is a modern, beautifully designed web application built using Next.js and TypeScript with a focus on responsive design and user experience.
          </p>
          
          <h2 style={{ color: '#667eea', fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px' }}>✨ Features</h2>
          <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
            <li>🔢 Interactive Counter Component</li>
            <li>📋 Todo List Management</li>
            <li>📝 Dynamic Post Display</li>
            <li>👤 User Profile Cards</li>
            <li>🎨 Modern CSS Styling with Gradients</li>
            <li>⚡ Smooth Animations</li>
            <li>📱 Fully Responsive Design</li>
          </ul>
          
          <h2 style={{ color: '#667eea', fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px' }}>🛠️ Technology Stack</h2>
          <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
            <li>⚛️ React & Next.js</li>
            <li>📘 TypeScript</li>
            <li>🎨 CSS Modules</li>
            <li>🌐 JSONPlaceholder API</li>
          </ul>
          
          <h2 style={{ color: '#667eea', fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px' }}>🎨 Design Features</h2>
          <p>
            The application features a beautiful gradient background (purple to violet), smooth animations, hover effects, and modern UI components. All components are styled with glassmorphism effects and smooth transitions for an enhanced user experience.
          </p>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '30px', borderTop: '1px solid rgba(102, 126, 234, 0.2)' }}>
          <p style={{ color: '#999' }}>🌟 Made with care and modern web technologies</p>
        </div>
      </div>
    </main>
  );
}
