import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Gallery.module.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  // Fetch images from backend
  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/images");
      setImages(res.data);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const openGalleryView = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeGalleryView = () => {
    setSelectedImage(null);
    setCurrentIndex(null);
  };

  const showNextImage = () => {
    if (currentIndex !== null && currentIndex < images.length - 1) {
      const nextIndex = currentIndex + 1;
      setSelectedImage(images[nextIndex].image);
      setCurrentIndex(nextIndex);
    }
  };

  const showPreviousImage = () => {
    if (currentIndex !== null && currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setSelectedImage(images[prevIndex].image);
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <>
      <h1 className={styles.heading}>Our Gallery</h1>
      <div className={styles.gallery}>
        {images.map((img, index) => (
          <div key={img._id} className={styles.imageCard}>
            <img src={img.image} alt={img.name} />
            <button
              className={styles.viewButton}
              onClick={() => openGalleryView(img.image, index)}
            >
              View
            </button>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className={styles.modal} onClick={closeGalleryView}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={(e) => {
                e.stopPropagation();
                closeGalleryView();
              }}
            >
              ✖
            </button>
            <button
              className={styles.prevButton}
              onClick={(e) => {
                e.stopPropagation();
                showPreviousImage();
              }}
              disabled={currentIndex === 0}
            >
              ❮
            </button>
            <img src={selectedImage} alt="Selected" />
            <button
              className={styles.nextButton}
              onClick={(e) => {
                e.stopPropagation();
                showNextImage();
              }}
              disabled={currentIndex === images.length - 1}
            >
              ❯
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
