const router = require("express").Router();

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Please provide required credentials" });
  }
});

router.post("/login", (req, res) => {
  // implement login
});

module.exports = router;
