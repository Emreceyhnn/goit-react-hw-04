import styles from "./ImageCard.module.css";

const ImageCard = ({ src, alt, imageOnclick, image }) => {
  const handleClick = () => {
    imageOnclick(image);
  };

  return (
    <div className={styles.imageCard} onClick={handleClick}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default ImageCard;
