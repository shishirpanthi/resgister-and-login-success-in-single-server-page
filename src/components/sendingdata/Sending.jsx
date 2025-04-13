import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sending.module.css";

const Sending = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendDataToBackend = async () => {
    try {
      const response = await fetch("http://localhost:3000/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Data sent successfully!");
        navigate("/submitted-data", { state: formData }); // Navigate to the new route with form data
      } else {
        alert("Failed to send data.");
      }
    } catch (error) {
      console.error("Error sending data:", error);
      alert("An error occurred while sending data.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Enter Details</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendDataToBackend();
        }}
      >
        <div className={styles.formGroup}>
          <label className={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Sending;
