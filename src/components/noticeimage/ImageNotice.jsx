import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai"; // Import the close icon
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"; // Import navigation icons
import styles from "./ImageNotice.module.css";

const ImageNotice = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]); // Dynamically fetched images

  // Fetch existing images from the server
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("http://localhost:3000/images");
        const data = await res.json();
        const imageUrls = data.map((img) => img.url); // Assuming the response contains an array of image objects with a `url` field
        setImages(imageUrls);
        if (imageUrls.length > 0) {
          setCurrentIndex(imageUrls.length - 1); // Set the current index to the latest image
        }
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };

    fetchImages();
  }, []);

  const totalImages = images.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  };

  // Auto-slider logic
  useEffect(() => {
    if (totalImages > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [totalImages]);

  return (
    <>
      {isOpen && (
        <>
          <div
            className={styles.backdrop}
            onClick={() => setIsOpen(false)}
          ></div>
          <div className={styles.modal}>
            {images.length > 0 ? (
              <>
                <img
                  src={images[currentIndex]} // Use the current image based on the index
                  alt={`Notice ${currentIndex + 1}`}
                  className={styles.image}
                />
                <AiOutlineClose
                  className={styles.closeIcon}
                  onClick={() => setIsOpen(false)}
                />
                {totalImages > 1 && (
                  <>
                    <AiOutlineLeft
                      className={styles.navIcon}
                      onClick={handlePrev}
                    />
                    <AiOutlineRight
                      className={styles.navIcon}
                      onClick={handleNext}
                    />
                  </>
                )}
              </>
            ) : (
              <p>Loading images...</p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ImageNotice;



///for only show single pic"
// import React, { useState, useEffect } from "react";
// import { AiOutlineClose } from "react-icons/ai"; // Import the close icon
// import styles from "./ImageNotice.module.css";

// const ImageNotice = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [latestImage, setLatestImage] = useState(null); // Store only the latest image

//   // Fetch the latest image from the server
//   useEffect(() => {
//     const fetchLatestImage = async () => {
//       try {
//         const res = await fetch("http://localhost:3000/images");
//         const data = await res.json();
//         if (data.length > 0) {
//           const latestImageUrl = data[data.length - 1].url; // Get the latest image URL
//           setLatestImage(latestImageUrl);
//         }
//       } catch (err) {
//         console.error("Error fetching images:", err);
//       }
//     };

//     fetchLatestImage();
//   }, []);

//   return (
//     <>
//       {isOpen && latestImage && (
//         <>
//           <div
//             className={styles.backdrop}
//             onClick={() => setIsOpen(false)}
//           ></div>
//           <div className={styles.modal}>
//             <img
//               src={latestImage} // Display the latest image
//               alt="Latest Notice"
//               className={styles.image}
//             />
//             <AiOutlineClose
//               className={styles.closeIcon}
//               onClick={() => setIsOpen(false)}
//             />
//           </div>
//         </>
//       )}
//       {!latestImage && <p>Loading latest image...</p>}
//     </>
//   );
// };

// export default ImageNotice;