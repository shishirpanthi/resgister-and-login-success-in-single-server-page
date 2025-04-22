import React, { useEffect, useState } from "react";
import { fetchServices } from "../receiving the data from backend/servicesAPI"; // Adjust the path accordingly
import styles from "./ServicesView.module.css"; // Import the CSS module

const ServicesView = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const loadServices = async () => {
      const data = await fetchServices();
      setServices(data);
    };

    loadServices();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Our Services</h1>
      <div className={styles.cardsContainer}>
        {services.map((service) => (
          <div key={service._id} className={styles.card}>
            <img
              src={`http://localhost:3000${service.imageUrl}`}
              alt="Service"
              className={styles.image}
            />
            <p className={styles.description}>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesView;
