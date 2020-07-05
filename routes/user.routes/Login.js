const router = require("express").Router();
let User = require("../../models/model.admin/admin.model");

const { UserLogin } = require("../../Functions/Function.admin/LoginFunction");

router.route("/login/admin").post(async (req, res) => {
  await UserLogin(req.body, res);
});

router.route("/login/super-admin").post(async (req, res) => {
  await UserLogin(req.body, res);
});
module.exports = router;
