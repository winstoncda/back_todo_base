const router = require("express").Router();
const connection = require("../database/configDB");

router.get("/", (req, res) => {
  const sql = "SELECT * FROM todos";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  });
});

router.post("/addTodo", (req, res) => {
  console.log(req.body);
  const { name, done } = req.body;
  const insertSql = "INSERT INTO todos (name, done) VALUES (?, ?)";
  connection.query(insertSql, [name, done], (err, result) => {
    if (err) throw err;
    res.status(200).json({ message: "todo insérée" });
  });
});

module.exports = router;
