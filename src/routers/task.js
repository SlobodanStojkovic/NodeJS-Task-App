const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();

//CREATE TASKS
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//READ TASKS at /tasks    // at /tasks?completed= true get only completed tasks
// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
  // Basics of the needed options for populate
  const populateOptions = {
    path: "tasks",
    options: { sort: { createdAt: 1 } },
  };

  // Only add match criteria if supplied
  if (req.query.completed) {
    populateOptions.match = {};
    populateOptions.match.completed = req.query.completed === "true";
  }

  // Only add the sort data if it is supplied
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    populateOptions.options.sort = {};
    populateOptions.options.sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  // Only add the limit if a value is provided
  if (req.query.limit) {
    populateOptions.options.limit === parseInt(req.query.limit, 10);
  }

  // Only add the skip if a value is provided
  if (req.query.skip) {
    populateOptions.options.skip = parseInt(req.query.skip, 10);
  }

  try {
    await req.user.populate([populateOptions]);
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send();
  }
});

//READ TASK
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

//UPDATE TASK
router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body); //returns array of properties
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//DELETE TASK
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
