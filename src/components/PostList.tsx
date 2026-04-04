import { useState, useEffect } from 'react';
import styles from './PostList.module.css';

const PostList = () => {
  const [posts, setPosts] = useState<any[]>([]); // Array of posts
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className={styles.postList}><p className={styles.loading}>⏳ Loading posts...</p></div>;
  if (error) return <div className={styles.postList}><p className={styles.error}>❌ {error}</p></div>;

  return (
    <div className={styles.postList}>
      <h2>📝 Featured Posts</h2>
      {posts.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#667eea' }}>No posts available.</p>
      ) : (
        <div>
          {posts.map((post, index) => (
            <div key={post.id} className={styles.postItem}>
              <h3>📌 {post.title}</h3>
              <p>{post.body}</p>
              <small style={{ color: '#999' }}>Post #{post.id}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
