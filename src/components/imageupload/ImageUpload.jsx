import React, { useState, useEffect } from "react";
import styles from "./ImageUpload.module.css";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  // Handle file selection
  const handleChange = (e) => {
    setImage(e.target.files[0]);
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

  // Fetch existing images from MongoDB
//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const res = await fetch("http://localhost:3000/images");
//         const data = await res.json();
//         setUploadedImages(data);
//       } catch (err) {
//         console.error("Error fetching images:", err);
//       }
//     };

//     fetchImages();
//   }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Upload the Image for Poster</h2>
      <form className={styles.form} onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={handleChange} />
        <button type="submit" className={styles.uploadButton}>
          Upload
        </button>
      </form>

      {/* <h3 className={styles.uploadedImagesHeading}>Uploaded Images:</h3> */}
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
