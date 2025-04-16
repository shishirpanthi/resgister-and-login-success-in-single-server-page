import React, { useState, useEffect } from "react";
import styles from "./ImageUpload.module.css";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [note, setNote] = useState(""); // State for note message

  // Handle file selection with dimension validation
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        if (img.width < 2000 || img.height < 2000) {
          setNote("* Image dimensions must be at least 2000x2000 pixels.");
          setImage(null);
        } else {
          setNote(""); // Clear note if validation passes
          setImage(file);
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Upload image
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setUploadedImages((prev) => [...prev, data]);
      setImage(null);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Upload the Image for Poster</h2>
      <form className={styles.form} onSubmit={handleUpload}>
        <input type="file" className={styles.choosefile} accept="image/*" onChange={handleChange} />
        <button type="submit" className={styles.uploadButton}>
          Upload
        </button>
      </form>

      {/* Display note message */}
      {note && <p className={styles.note}>{note}</p>}

      <div className={styles.imageGrid}>
        {uploadedImages.map((img) => (
          <div key={img._id} className={styles.imageWrapper}>
            <img src={img.url} alt="Uploaded" className={styles.image} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;
