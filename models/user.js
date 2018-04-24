const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: "Username is Required"
  },

  // Note: actual password won't be stored, only salted hash of password
  password: {
    type: String
    // trim: true,
    // required: "Password is Required",
    // validate: [
      // function(input) {
        // return input.length >= 6;
      // },
      // "Password should be longer."
    // ]
  },
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  fullname: {
    type: String
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

  // internLocationCity: {
  // 	type: String,
  // 	required: "Internship Location City is Required"
  // },

  // internLocationCountry: {
  //   type: String,
  //   required: "Internship Location Country is Required"
  // },

  // `chapterRef` is an object that stores a Chapter id
  // The ref property links the ObjectId to the Chapter model
  // This allows us to populate the User with an associated Chapter
  chapterRef: [
  {
    type: Schema.Types.ObjectId,
    ref: "Chapter"
  }
  ],

  needsRef: [
  {
    type: Schema.Types.ObjectId,
    ref: "Needs"
  }
  ],
  
    expRef: [
  {
    type: Schema.Types.ObjectId,
    ref: "Expense"
  }
  ]

});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);

module.exports = User;
