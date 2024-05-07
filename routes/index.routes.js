const router = require("express").Router();

router.get("/register", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;
