import React, { useEffect, useState } from "react";
import styles from "./Ourteam_card.module.css";
import TeamMembersCards from "./TeamMembersPage"; // Import the new component

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
        setFormData({ ...formData, image: reader.result }); // Save base64 string
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
          *Please upload an image with dimensions 150x150 pixels.
        </p>
        <button type="submit">
          {isEditing ? "Update Team Member" : "Add Team Member"}
        </button>
      </form>

      {/* Team Members Cards */}
      <TeamMembersCards
        teamData={teamData}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Ourteam_card;
