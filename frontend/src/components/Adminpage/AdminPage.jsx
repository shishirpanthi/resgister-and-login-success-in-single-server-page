import React, { useEffect, useState } from "react";
import styles from "./AdminPage.module.css"; // Import CSS module

const AdminPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin");
        const data = await response.json();
        setImages(data.images); // Update state with fetched images
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/images/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setImages(images.filter((image) => image._id !== id)); // Remove deleted image from state
      } else {
        console.error("Failed to delete image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleEdit = (id) => {
    alert(`Edit functionality for image ID: ${id} is not implemented yet.`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Page</h1>
      <ul className={styles.imageList}>
        {images.map((image) => (
          <li key={image._id} className={styles.imageItem}>
            <img
              src={image.url}
              alt={image.filename}
              className={styles.image}
            />
            <p className={styles.filename}>{image.filename}</p>
            <div className={styles.actions}>
              <button
                className={styles.editButton}
                onClick={() => handleEdit(image._id)}
              >
                Edit
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(image._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
