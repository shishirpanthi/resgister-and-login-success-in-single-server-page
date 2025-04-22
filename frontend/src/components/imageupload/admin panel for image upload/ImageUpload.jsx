import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ImageUpload.module.css";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
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

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post("http://localhost:3000/api/imageupload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFile(null);
      fetchImages();
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  // Handle image deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/images/${id}`);
      setImages(images.filter((img) => img._id !== id));
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Upload Image For Gallery</h2>

      <div className={styles.uploadBox}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button onClick={handleUpload}>Upload</button>
      </div>

      {/* Render Gallery component */}
      {/* <Gallery images={images} /> */}

      <div className={styles.gallery}>
        {images.map((img) => (
          <div key={img._id} className={styles.imageCard}>
            <img src={img.image} alt={img.name} />
            <button
              className={styles.deleteBtn}
              onClick={() => handleDelete(img._id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
