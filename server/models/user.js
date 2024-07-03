const { model, Schema } = require("mongoose");
const bcryptjs = require("bcryptjs")

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "user name is required"],
    minlength: [3, "name must be minimum 3 characters"],
    maxlength: [25, "name must be maximum 25 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    type: String,
    required: [true, "email is required"],
    unique: [true, "the email already used"],
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.\w{2,4}$/;
        return emailRegex.test(value);
      },
      message: "please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [6, "password must be minimum 6 character"],
    set: (value) => {
      return bcryptjs.hashSync(value, bcryptjs.genSaltSync(10));
    },
  },
  cartData : {
    type : Object
  }
  ,
  date : {
    type : Date,
    default : Date.now
  }
});


const User =  new model("user",userSchema)
module.exports = User;