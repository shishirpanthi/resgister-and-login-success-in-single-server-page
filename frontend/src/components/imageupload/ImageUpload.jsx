import React, { useState, useEffect } from "react";
import styles from "./ImageUpload.module.css";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [note, setNote] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch images from the database on component mount
  const fetchImages = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/images");
      if (!res.ok) throw new Error("Failed to fetch images");
      const data = await res.json();
      console.log("Fetched images:", data); // Debugging log
      setUploadedImages(data || []); // Populate uploadedImages with data or an empty array
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

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
      const res = await fetch("http://localhost:3000/api/images/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload image");
      const data = await res.json();
      setUploadedImages((prev) => [...prev, data]); // Add the new image to the state
      setImage(null);
      fetchImages(); // Refresh the list of images after upload
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload the image. Please try again.");
    }
  };

  // Delete image
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`http://localhost:3000/api/images/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete image");
      setUploadedImages((prev) => prev.filter((img) => img._id !== id)); // Remove the deleted image from the state
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete the image. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Upload the Image for Poster</h2>
      <form className={styles.form} onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={handleChange} />
        <button type="submit" className={styles.uploadButton}>
          Upload
        </button>
      </form>

      {/* Display note message */}
      {note && <p className={styles.note}>{note}</p>}

      <div className={styles.imageGrid}>
        {uploadedImages.length > 0 ? (
          uploadedImages.map((img) => (
            <div key={img._id} className={styles.imageWrapper}>
              {img.url ? (
                <img
                  src={img.url} // e.g., "http://localhost:3000/uploads/poster_abc123.jpg"
                  alt={`Uploaded image ${img._id}`}
                  className={styles.image}
                />
              ) : (
                <p className={styles.noImageText}>Image not available</p>
              )}
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(img._id)}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))
        ) : (
          <p className={styles.noImages}>No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
