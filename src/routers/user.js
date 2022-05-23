const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/user");
const auth = require("../middleware/auth");
// const { sendWelcomeEmail, sendCancelationEmail } = require("../emails/account");
const router = new express.Router();

//CREATE USER - SIGN UP
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    //sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error); //chaining, this is same as res.status(400) res.send(e)
  }
});

//USERS LOGIN
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

//LOGOUT USER
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

//LOGOUT ALL SESSIONS
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

//READ OUR OWN USER PROFILE
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

//UPDATE OUR PROFILE
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];

  //every returns true if 4/4 values are true, if 1 is not true it will return false
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  //new to return new updated value, runValidators to do validations for updated values
  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();

    if (!req.user) {
      return res.status(404).send();
    }

    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//DELETE USER
router.delete(
  "/users/me",
  auth,
  async (req, res) => {
    try {
      await req.user.remove();
      //sendCancelationEmail(req.user.email, req.user.name);
      res.send(req.user);
    } catch (error) {
      res.status(500).send();
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// Upload Avatar image
const upload = multer({
  limits: {
    fileSize: 1048576, // value is in bytes = 1 Mb
  },
  //cb callback
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new Error(
          "Image must be of JPG or PNG type and with size lesser than 1 Mb"
        )
      );
    }

    //if there is no error, we will accept upload >> true
    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    // sharp is used to to convert large images in common formats to smaller, web-friendly JPEG, PNG, WebP, GIF and AVIF images of varying dimensions
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;
    await req.user.save();

    res.send();
  },
  //this code runs when error happens
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// Delete avatar
router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();

  res.send();
});

// Read user avatar
router.get("./users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error("No user or user avatar found");
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});

module.exports = router;
