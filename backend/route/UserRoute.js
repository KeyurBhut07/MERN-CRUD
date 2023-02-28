const express = require("express");
const router = new express.Router();
const usermodel = require("../model/User");
const jwt = require("jsonwebtoken");
const jwtkey = "ak-ecoomerce keyurbhut";

router.post("/usercreate", async (req, res) => {
  try {
    let user = new usermodel(req.body);
    let createuser = await user.save();
    createuser = createuser.toObject();
    delete createuser.password;
    jwt.sign({ createuser }, jwtkey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res.status(404).send({ result: "Something wrog" });
      }
      res.status(201).send({ createuser, token: token });
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    if (req.body.email && req.body.password) {
      let user = await usermodel.findOne(req.body).select("-password");
      user
        ? jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
            if (err) {
              res.status(404).send({ result: "Something wrog" });
            }
            res.status(200).send({ user, token: token });
          })
        : res.status(404).send({ result: "user not found" });
    } else {
      res.status(400).send({ result: "please provide email and password" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
