const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");

 
router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;

  console.log("POST /tasks body:", req.body);
  console.log("req.user:", req.user);

  if (!title) return res.status(400).json({ msg: "Title is required" });

  try {
    const task = await Task.create({
      user: req.user,  
      title,
      description,
    });
    console.log("Task created:", task);
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});

 
router.get("/", auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Task.countDocuments({ user: req.user });
    const tasks = await Task.find({ user: req.user })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      tasks,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update task
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user },  
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

 
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, user: req.user }); // ✅ use req.user
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

 
router.get("/search", auth, async (req, res) => {
  const { query } = req.query;

  try {
    const tasks = await Task.find({
      user: req.user, // ✅ use req.user
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
