const cors = require("cors");
const bodyParser = require("body-parser");

const applyMiddleware = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
};

module.exports = applyMiddleware;
