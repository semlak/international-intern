const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requirementSchema = new Schema({
  reqTitle: { 
  	type: String, 
  	required: true 
  },
  reqNote: { 
  	type: String, 
  	required: true ,
  	imageurl: String
  },
  reqDate: { 
  	type: Date, 
  	default: Date.now 
  }
});

const Requirement = mongoose.model("Requirement", requirementSchema);

module.exports = Requirement;