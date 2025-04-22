import React, { useState, useEffect } from "react";
import styles from "./Services.module.css";
import axios from "axios";

const Services = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/services");
      setServices(res.data);
    } catch (err) {
      console.error("Error fetching services", err);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !description) return;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    try {
      await axios.post("http://localhost:3000/api/services", formData);
      setDescription("");
      setImage(null);
      fetchServices();
    } catch (err) {
      console.error("Error uploading service", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/services/${id}`);
      fetchServices(); // refresh list
    } catch (err) {
      console.error("Error deleting service", err);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Our Services</h1> {/* Added heading */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <textarea
          placeholder="Enter service description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
        />
        <button type="submit" className={styles.button}>
          Add Service
        </button>
      </form>
      <div className={styles.cardsContainer}>
        {services.map((service) => (
          <div key={service._id} className={styles.card}>
            <img
              src={`http://localhost:3000${service.imageUrl}`}
              alt="Service"
              className={styles.image}
            />
            <p className={styles.description}>{service.description}</p>
            <button
              onClick={() => handleDelete(service._id)}
              className={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
