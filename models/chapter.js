const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
  chapTitle: { 
    type: String, 
    required: true 
  },
  chapNote: { 
    type: String, 
    required: true ,
  },
  imgURL: {
    type:String 
  },
  chapDate: { 
    type: Date, 
    default: Date.now 
  }, 
  reqNum: {
    type: Number,
    required:true
  }
});

const Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;