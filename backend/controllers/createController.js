const createController = (req, res) => {
  const { name } = req.body;

  // Here you would typically handle the data, e.g., save it to a database
  console.log("Received name:", name);

  // Send a response back to the client
  res.status(201).json({ message: "Data received successfully", name });
};

export default createController;
