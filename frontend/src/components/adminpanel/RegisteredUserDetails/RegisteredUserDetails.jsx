import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./RegisteredUserDetails.module.css";

function RegisteredUserDetails() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEdit = (user) => {
    setEditUserId(user._id);
    setEditUserData({ name: user.name, email: user.email });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUserData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:3000/admin/${editUserId}`,
        editUserData
      );
      fetchUsers();
      setEditUserId(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admin/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Registered user details</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {editUserId === user._id ? (
                  <input
                    type="text"
                    name="name"
                    value={editUserData.name}
                    onChange={handleEditChange}
                    className={styles.input}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {editUserId === user._id ? (
                  <input
                    type="email"
                    name="email"
                    value={editUserData.email}
                    onChange={handleEditChange}
                    className={styles.input}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className={styles.actions}>
                {editUserId === user._id ? (
                  <button
                    onClick={saveEdit}
                    className={`${styles.button} ${styles.edit}`}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(user)}
                    className={`${styles.button} ${styles.edit}`}
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(user._id)}
                  className={`${styles.button} ${styles.delete}`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RegisteredUserDetails;
