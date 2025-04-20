import React from "react";
// import styles from "./Ourteam_card.module.css"; // Reuse the same CSS module

const TeamMembersCards = ({ teamData, handleEdit, handleDelete }) => {
  return (
    <div className={styles.container}>
      {teamData.map((member) => (
        <div key={member._id} className={styles.card}>
          <img src={member.image} alt={member.name} className={styles.image} />
          <h3 className={styles.name}>{member.name}</h3>
          <p className={styles.post}>{member.post}</p>
          {handleEdit && handleDelete && (
            <>
              <button onClick={() => handleEdit(member)}>Edit</button>
              <button onClick={() => handleDelete(member._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TeamMembersCards;
