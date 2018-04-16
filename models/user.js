var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: "Username is Required"
  },
  password: {
    type: String,
    trim: true,
    required: "Password is Required",
    validate: [
      function(input) {
        return input.length >= 6;
      },
      "Password should be longer."
    ]
  },
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  userCreated: {
    type: Date,
    default: Date.now
  },

  homeLocation: {
  	type: String,
  	required: "Home Location is Required"
  },
  internLocation: {
  	type: String,
  	required: "Internship Location is Required"
  },


  // `chapterRef` is an object that stores a Chapter id
  // The ref property links the ObjectId to the Chapter model
  // This allows us to populate the User with an associated Chapter
  chapterRef: [
  {
    type: Schema.Types.ObjectId,
    ref: "Chapter"
  }
  ],

  requirementRef: [
  {
    type: Schema.Types.ObjectId,
    ref: "Requirement"
  }
  ],
  
    expRef: [
  {
    type: Schema.Types.ObjectId,
    ref: "Expense"
  }
  ]

});

var User = mongoose.model("User", UserSchema);

module.exports = User;
