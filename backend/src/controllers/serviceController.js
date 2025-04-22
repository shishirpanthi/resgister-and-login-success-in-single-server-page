const Service = require("../models/Service");
const fs = require("fs");

// Create Service
const createService = async (req, res) => {
  try {
    const { description } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    const newService = new Service({ imageUrl, description });
    await newService.save();

    res.status(201).json(newService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create service" });
  }
};

// Get All Services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
};

// Delete Service
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });

    const filePath = `.${service.imageUrl}`;
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await service.deleteOne();
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete service" });
  }
};

module.exports = {
  createService,
  getAllServices,
  deleteService,
};
