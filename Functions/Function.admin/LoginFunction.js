const User = require("../../models/model.admin/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

const UserLogin = async (userData, res) => {
  try {
    //let {password} = userData
    //validate the email
    const user = await User.findOne({ email: userData.email });
    if (!user) return res.status(400).json("Email incorrect");

    //validate the password
    const validpass = await bcrypt.compare(userData.password, user.password);
    if (!validpass)
      return res.status(400).json("password incorrect please check again");

    //checking the role
    //if (user.role != role) return res.status(400).json("access denied ");

    //create and asign a token
    let token = jwt.sign(
      { _id: user._id, role: user.role, email: user.email },
      process.env.TOKEN_SECRET,
      { expiresIn: 14400 }
    );

    res.header("Authorization", token);
    res.send({
      token,
      response: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(400).json("Error : " + err);
  }
};

module.exports = { UserLogin };
