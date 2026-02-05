const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true },
  snippet: { type: String, required: true },
  body: { type: String, required: true },
  // Changing 'image' to an array of strings for multiple photos
  images: [String] 
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;