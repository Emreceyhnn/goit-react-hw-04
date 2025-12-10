import React from 'react';
import styles from './LoadMoreBtn.module.css';
const LoadMoreBtn = ({ onclick }) => {
  return (
    <button className={styles.loadMoreBtn} onClick={onclick}>
      Daha Fazla Yükle
    </button>
  );
};

export default LoadMoreBtn;
