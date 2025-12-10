import React from 'react';
import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';
const ImageGallery = ({ imageList, imageOnclick }) => {
  if (!imageList || imageList.length === 0) {
    return null;
  }

  return (
    <ul className={styles['image-gallery']}>
      {imageList.map(image => (
        <li key={image.id}>
          <ImageCard
            imageOnclick={imageOnclick}
            src={image.urls.small}
            alt={image.id}
            image={image}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
