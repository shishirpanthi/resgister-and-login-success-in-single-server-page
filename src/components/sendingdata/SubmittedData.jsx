import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon
import styles from "./Sending.module.css";

const SubmittedData = () => {
  const [dataList, setDataList] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to track loading
  const navigate = useNavigate();

  const fetchData = async () => {
    setTimeout(async () => {
      try {
        const response = await fetch("http://localhost:3000/showdata");
        const data = await response.json();
        setDataList(data); // Update the state with fetched data
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    }, 500); // Delay fetch by 10 seconds (10,000 milliseconds)
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component loads
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>All Submitted Data</h1>
      {loading ? (
        <div className={styles.loading}>
          <FaSpinner className={styles.spinner} /> {/* Spinner icon */}
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className={styles.button}
            onClick={() => navigate(-1)} // Navigate to the previous page
          >
            Back
          </button>
        </>
      )}
    </div>
  );
};

export default SubmittedData;
