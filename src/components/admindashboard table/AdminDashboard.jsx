import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setData(response.data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to edit the post with ID: {id}?</p>
          <button
            onClick={() => {
              toast.info(`Edit confirmed for ID: ${id}`);
              closeToast();
            }}
            className={styles.toastButton}
          >
            Okay
          </button>
          <button onClick={closeToast} className={styles.toastButton}>
            Cancel
          </button>
        </div>
      ),
      { autoClose: false }
    );
  };

  const handleDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete the post with ID: {id}?</p>
          <button
            onClick={() => {
              setData(data.filter((post) => post.id !== id));
              toast.success(`Post with ID: ${id} deleted successfully.`);
              closeToast();
            }}
            className={styles.toastButton}
          >
            Okay
          </button>
          <button onClick={closeToast} className={styles.toastButton}>
            Cancel
          </button>
        </div>
      ),
      { autoClose: false }
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Admin Panel</h1>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && data.length === 0 && (
        <p className={styles.noData}>
          No data available. Please try again later.
        </p>
      )}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td>
                <button
                  className={styles.editButton}
                  onClick={() => handleEdit(post.id)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;
