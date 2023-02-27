const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  id: {
    type: String,
    default: "Root",
    required: true,
  },
  name: {
    type: String,
    default: [],
  },
  isFolder: {
    type: Boolean,
    default: true,
  },
  items: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Data", dataSchema);
