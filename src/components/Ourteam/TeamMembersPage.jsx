import React, { useEffect, useState } from "react";
import styles from "./Ourteam_card.module.css";

const TeamMembersPage = () => {
  const [teamData, setTeamData] = useState([]);

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

  return (
    <div className={styles.team}>
      {/* Header Section */}
      <div className={styles.teamHeader}>
        <div className={styles.header}>
          <h1 className={styles.headerheding}>
            <span style={{ color: "black", fontWeight: "bold" }}>Meet </span>
            Our Team
          </h1>
        </div>
      </div>

      {/* Team Members Cards */}
      <div className={styles.container}>
        {teamData.map((member) => (
          <div key={member._id} className={styles.card}>
            <img
              src={member.image}
              alt={member.name}
              className={styles.image}
            />
            <h3 className={styles.name}>{member.name}</h3>
            <p className={styles.post}>{member.post}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembersPage;
