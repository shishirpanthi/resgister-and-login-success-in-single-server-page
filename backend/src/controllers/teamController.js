const TeamMember = require("../models/TeamMember");

// GET all
exports.getAllTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find();
    res.json(members);
  } catch {
    res.status(500).json({ message: "Error fetching team members" });
  }
};

// CREATE
exports.createTeamMember = async (req, res) => {
  const { name, post, image } = req.body;
  if (!name || !post || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newMember = new TeamMember({ name, post, image });
    await newMember.save();
    res.status(201).json({ message: "Team member added" });
  } catch {
    res.status(500).json({ message: "Error saving team member" });
  }
};

// UPDATE
exports.updateTeamMember = async (req, res) => {
  const { name, post, image } = req.body;
  try {
    const updated = await TeamMember.findByIdAndUpdate(
      req.params.id,
      { name, post, ...(image && { image }) },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Member not found" });
    res.json({ message: "Team member updated" });
  } catch {
    res.status(500).json({ message: "Error updating team member" });
  }
};

// DELETE
exports.deleteTeamMember = async (req, res) => {
  try {
    const deleted = await TeamMember.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Member not found" });
    res.json({ message: "Team member deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting team member" });
  }
};
