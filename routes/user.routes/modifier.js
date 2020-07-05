const router = require("express").Router();
const verify = require("../../VerifyToken");
const verifyRole = require("../../VerifyRole");
const bcrypt = require("bcryptjs");
const validator = require("validator");
let User = require("../../models/model.admin/admin.model");

// Supprimer un user
router.delete(
  "/delete/:id",
  verify,
  verifyRole("SuperAdmin"),
  async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
      .then((user) => res.json("user deleted"))
      .catch((err) => res.status(400).json("Error : " + err));
  }
);

//afficher le user cible
router.get(
  "/show/user/:id",
  verify,
  verifyRole("SuperAdmin"),
  async (req, res) => {
    await User.findById(req.params.id)
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json("Error : " + err));
  }
);

// afficher tous les users
router.get("/show/all", verify, verifyRole("SuperAdmin"), async (req, res) => {
  await User.find()
    .then((admins) => res.json(admins))
    .catch((err) => res.status(400).json("Error : " + err));
});

//modifier un user
router.post(
  "/update/:id",
  // verify,
  // verifyRole("SuperAdmin"),
  async (req, res) => {
    if (validator.isEmpty(req.body.password)) {
      const hashedpassword = await bcrypt.hash(req.body.password, 12);
      await User.findById(req.params.id).then((user) => {
        (user.firstname = req.body.firstname),
          (user.lastname = req.body.lastname),
          (user.email = req.body.email),
          //(user.password = hashedpassword),
          user
            .save()
            .then(() => res.status(200).json("user updated successfuly"))
            .catch((err) => res.status(400).json("Error :" + err));
      });
    } else {
      const hashedpassword = await bcrypt.hash(req.body.password, 12);
      await User.findById(req.params.id).then((user) => {
        (user.firstname = req.body.firstname),
          (user.lastname = req.body.lastname),
          (user.email = req.body.email),
          (user.password = hashedpassword),
          user
            .save()
            .then(() => res.status(200).json("user updated successfuly"))
            .catch((err) => res.status(400).json("Error :" + err));
      });
    }
  }
);

module.exports = router;
