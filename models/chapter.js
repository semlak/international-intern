const mongoose = require('mongoose');

const { Schema } = mongoose;

const chapterSchema = new Schema({
  chapTitle: {
    type: String,
    required: true
  },
  chapNote: {
    type: String,
    required: true,
  },
  chapImg: {
    type: String
  },
  chapDate: {
    type: Date,
    default: Date.now
  },
  reqNum: {
    type: Number,
  },
  user: {
    type: Schema.Types.ObjectId, ref: 'user'
  }
});

const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;
