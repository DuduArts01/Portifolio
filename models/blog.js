const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    snippet: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String }, // URL or path
    template: { type: String, default: 'standard' }, // e.g., 'full-width', 'split-screen'
    imgPosition: { type: String, default: 'left' } // e.g., 'left', 'right', 'top'
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;