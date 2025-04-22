import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Gallery.module.css";

const Gallery = () => {
  const [images, setImages] = useState([]);

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

  return (
    <div className={styles.gallery}>
      {images.map((img) => (
        <div key={img._id} className={styles.imageCard}>
          <img src={img.image} alt={img.name} />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
