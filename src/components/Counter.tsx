import { useState } from 'react';
import styles from './Counter.module.css';

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div className={styles.counter}>
      <h2>🔢 Counter</h2>
      <p>{count}</p>
      {count === 0 && <p className={styles.zero}>📍 Counter is at zero</p>}
      {count > 0 && <p style={{ color: '#4caf50', fontSize: '14px' }}>📈 Positive count!</p>}
      {count < 0 && <p style={{ color: '#f44336', fontSize: '14px' }}>📉 Negative count!</p>}
      <div>
        <button className={styles.buttonStyle} onClick={() => setCount(count + 1)}>
          ➕ Increment
        </button>
        <button className={styles.buttonStyle} onClick={() => setCount(count - 1)}>
          ➖ Decrement
        </button>
        <button className={styles.buttonStyle} onClick={() => setCount(0)}>
          🔄 Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
