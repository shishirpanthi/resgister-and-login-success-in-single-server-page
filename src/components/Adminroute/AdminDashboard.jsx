import React, { useEffect, useState } from "react";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const [data, setData] = useState({ images: [], users: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/user");
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleToggleAdmin = async (userId, currentStatus) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/admin`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isAdmin: !currentStatus }),
        }
      );

      if (response.ok) {
        setData((prevData) => ({
          ...prevData,
          users: prevData.users.map((user) =>
            user._id === userId ? { ...user, isAdmin: !currentStatus } : user
          ),
        }));
        alert("Admin status updated successfully");
      } else {
        alert("Failed to update admin status");
      }
    } catch (error) {
      console.error("Error updating admin status:", error);
      alert("An error occurred while updating admin status");
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setData((prevData) => ({
          ...prevData,
          users: prevData.users.filter((user) => user._id !== userId),
        }));
        alert("User deleted successfully");
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user");
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Registered users</h1>
      <div className={styles.section}>
        {/* <h2>Uploaded Images</h2> */}
        {/* <ul className={styles.imageList}>
          {data.images.map((image) => (
            <li key={image._id}>
              <img src={image.url} alt={image.filename} />
              <p>{image.filename}</p>
            </li>
          ))}
        </ul> */}
      </div>
      <div className={styles.section}>
        {/* <h1 >Registered Users</h1> */}
        <ul className={styles.userList}>
          {data.users.map((user) => (
            <li key={user._id}>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>
                Admin:{" "}
                {user.isAdmin ? (
                  <span className={styles.adminBadge}>Yes</span>
                ) : (
                  "No"
                )}
              </p>
              <button
                className={styles.toggleAdminButton}
                onClick={() => handleToggleAdmin(user._id, user.isAdmin)}
              >
                {user.isAdmin ? "Revoke Admin" : "Grant Admin"}
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete User
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
