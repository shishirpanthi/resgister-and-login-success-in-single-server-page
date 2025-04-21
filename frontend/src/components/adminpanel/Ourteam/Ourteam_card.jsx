import React, { useEffect, useState } from "react";
import styles from "./Ourteam_card.module.css";

const Ourteam_card = () => {
  const [teamData, setTeamData] = useState([]);
  const [formData, setFormData] = useState({ name: "", post: "", image: null });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch team data from the backend
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch("http://localhost:3000/ourteams");
        const data = await response.json();
        setTeamData(data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeamData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          if (img.width > 250 || img.height > 250) {
            alert("Image dimensions should not exceed 250px by 250px.");
          } else {
            setFormData({ ...formData, image: reader.result }); // Save base64 string
          }
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing
        ? `http://localhost:3000/ourteams/${editId}`
        : "http://localhost:3000/ourteams";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Fetch updated team data after successful submission
        const updatedData = await fetch("http://localhost:3000/ourteams");
        const data = await updatedData.json();
        setTeamData(data);
        setFormData({ name: "", post: "", image: null }); // Reset form
        setIsEditing(false);
        setEditId(null);
      } else {
        console.error("Error submitting data");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/ourteams/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTeamData(teamData.filter((member) => member._id !== id));
      } else {
        console.error("Error deleting team member");
      }
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
  };

  // Handle edit
  const handleEdit = (member) => {
    setFormData({ name: member.name, post: member.post, image: member.image });
    setIsEditing(true);
    setEditId(member._id);
  };

  return (
    <div className={styles.team}>
      <div className={styles.teamHeader}>
        <div className={styles.header}>
          <h1 className={styles.headerheding}>
            <span style={{ color: "black", fontWeight: "bold" }}>Meet </span>
            Our Team
          </h1>
        </div>
      </div>

      {/* Form to Add/Edit Team Member */}
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="post"
          placeholder="Post"
          value={formData.post}
          onChange={handleInputChange}
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          required={!isEditing} // File input is required only for new entries
        />
        <p className={styles.dimensionMessage}>
          *Please upload an image with maxium dimensions 250x250 pixels.
        </p>
        <button type="submit">
          {isEditing ? "Update Team Member" : "Add Team Member"}
        </button>
      </form>

      {/* Team Members Cards */}
      <div className={styles.cardsContainer}>
        {teamData.map((member) => (
          <div key={member._id} className={styles.card}>
            <img
              src={member.image}
              alt={`${member.name}'s profile`}
              className={styles.cardImage}
            />
            <h3 className={styles.cardName}>{member.name}</h3>
            <p className={styles.cardPost}>{member.post}</p>
            <div className={styles.cardActions}>
              <button
                className={styles.editButton}
                onClick={() => handleEdit(member)}
              >
                Edit
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(member._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ourteam_card;
