import styles from "./LoadMoreBtn.module.css";
const LoadMoreBtn = ({ onclick }) => {
  return (
    <button className={styles.loadMoreBtn} onClick={onclick}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
