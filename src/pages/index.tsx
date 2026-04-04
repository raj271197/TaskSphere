import TodoList from '../components/TodoList';
import Counter from '../components/Counter';
import PostList from '../components/PostList';

const Home = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', color: 'white', marginTop: '40px', fontSize: '3rem' }}>
        ✨ Welcome to Your App
      </h1>
      <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>
        Manage your tasks, count things, and explore posts
      </p>
      
      <Counter />
      <TodoList />
      <PostList />
      
      <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.7)' }}>
        <p>🎉 Made with modern CSS and React</p>
      </div>
    </div>
  );
};

export default Home;