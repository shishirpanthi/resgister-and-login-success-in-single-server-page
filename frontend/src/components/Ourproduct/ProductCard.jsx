import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import products from "./products.json"; // Import JSON data
import styles from "./ProductCard.module.css"; // Import CSS Module

const ProductCard = ({ showSeeMoreButton }) => {
  const [visibleCount, setVisibleCount] = useState(
    showSeeMoreButton ? 4 : products.products.length
  ); // Initial number of products to display
  const [isDirectNavigation, setIsDirectNavigation] = useState(true); // State to track if navigated directly
  const navigate = useNavigate(); // Hook to navigate programmatically
  const location = useLocation(); // Hook to get the current location

  useEffect(() => {
    // Check if navigated directly or via NavLink
    if (location.state && location.state.fromNavLink) {
      setVisibleCount(products.products.length); // Show all products
      setIsDirectNavigation(false); // Set to false if navigated via NavLink
    } else if (showSeeMoreButton) {
      setVisibleCount(4); // Show limited products if navigated directly
    }
  }, [location.state, showSeeMoreButton]);

  const handleSeeMore = () => {
    navigate("/product", { state: { fromNavLink: true } }); // Redirect to the "/product" page with state
  };

  return (
    <>
      <div className={styles.productwrapper}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <h1 className={styles.headerTitle}>OUR PRODUCT</h1>
          <p className={styles.headerDescription}>
            Discover a delicious variety of crispy, flavorful, and high-quality
            snacks, expertly crafted to satisfy every craving and occasion.
          </p>
        </div>

        {/* Product Cards */}
        <div className={styles.productContainer}>
          {products.products.slice(0, visibleCount).map((product, index) => (
            <div key={index} className={styles.productCard}>
              <img
                src={product.image} // Uses direct image link from JSON
                alt={product.name}
                className={styles.productImage}
              />
              <h2 className={styles.productTitle}>{product.name}</h2>
              <p className={styles.productDescription}>{product.description}</p>
            </div>
          ))}
          {showSeeMoreButton && isDirectNavigation && (
            <div className={styles.buttonSection}>
              <button className={styles.seeMoreButton} onClick={handleSeeMore}>
                See more
              </button>
            </div>
          )}
        </div>

        {/* Button Section
        {showSeeMoreButton && isDirectNavigation && (
          <div className={styles.buttonSection}>
            <button className={styles.seeMoreButton} onClick={handleSeeMore}>
              See more
            </button>
          </div>
        )} */}
      </div>
    </>
  );
};

export default ProductCard;
