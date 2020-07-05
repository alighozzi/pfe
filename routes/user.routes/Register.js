const router = require("express").Router();
let User = require("../../models/model.admin/admin.model");
const validator = require("validator");
const bcrypt = require("bcryptjs");

router.post(
  "/add/admin",
  // verify,
  // verifyRole("SuperAdmin"),
  async (req, res) => {
    //await UserRegister(req.body , 'Admin' , res )
    try {
      //validate the email
      const emailExist = await User.findOne({ email: req.body.email });
      if (emailExist) return res.status(400).json("Email already taken");
      if (!validator.isEmail(req.body.email))
        return res.status(400).json("Email non valid");

      //validate the password
      if (req.body.password != req.body.confirmpassword)
        return res.status(400).json("password incorrect please check again ");

      //hashed the password
      const hashedpassword = await bcrypt.hash(req.body.password, 12);

      //create a new user
      const newUser = new User({
        //...req.body,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedpassword,
      });
      await newUser.save();
      return res.status(200).json("user added");
    } catch (err) {
      res.status(400).json(err + "something went wrong");
    }
  }
);

// router.route("/add/super-admin").post(async (req, res) => {
//   await UserRegister(req.body, "SuperAdmin", res);
// });
module.exports = router;
