import React, { useEffect, useState } from "react";
import styles from "./Viewslider.module.css";

export default function Viewslider() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current slide index

  // Fetch all images on mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/sliderimg"); // Backend API endpoint
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        images.length > 0 ? (prevIndex + 1) % images.length : 0
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images]);

 return (
   <div className={styles["slider-container"]}>
     <h2 className={styles.title}>View Slider</h2>
     <div className={styles.slider}>
       {images.length > 0 && (
         <div className={styles.slide}>
           <img
             src={`data:image/jpeg;base64,${images[currentIndex].image}`}
             alt="Slider"
             className={styles.image}
           />
         </div>
       )}
     </div>
   </div>
 );
}
