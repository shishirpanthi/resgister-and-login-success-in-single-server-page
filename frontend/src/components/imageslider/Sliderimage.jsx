import React, { useEffect, useState } from "react";
import styles from "./Sliderimage.module.css";

export default function Sliderimage() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);

  // Fetch all images on mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/sliderimg"); // Updated to backend port 3000
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:3000/api/sliderimg", {
        // Updated to backend port 3000
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        fetchImages();
        setFile(null);
      } else {
        console.error("Image upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/sliderimg/${id}`, {
        // Updated to backend port 3000
        method: "DELETE",
      });
      fetchImages();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Image Slider Manager</h2>

      <form onSubmit={handleUpload} className={styles.form}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className={styles.fileInput}
        />
        <button type="submit" className={styles.uploadBtn}>
          Upload
        </button>
      </form>

      <div className={styles.slider}>
        {images.map((img) => (
          <div key={img._id} className={styles.slide}>
            <img
              src={`data:image/jpeg;base64,${img.image}`}
              alt="Slider"
              className={styles.image}
            />
            <button
              onClick={() => handleDelete(img._id)}
              className={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
