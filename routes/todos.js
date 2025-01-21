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

router.delete("/deleteTodo/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const deleteSql = "DELETE FROM todos WHERE id = ?";
  connection.query(deleteSql, [id], (err, result) => {
    if (err) throw err;
    res.status(200).json({ message: "Todo supprimée" });
  });
});

router.patch("/toggleTodo", (req, res) => {
  const { id } = req.body;
  const selectSql = "SELECT * FROM todos WHERE id = ?";
  connection.query(selectSql, [id], (err, result) => {
    if (err) throw err;
    let done = result[0].done; //on récupère 0 ou 1
    let toggleSql = "UPDATE todos SET done = ? WHERE id = ?";
    connection.query(toggleSql, [done === 0 ? 1 : 0, id], (err, result) => {
      if (err) throw err;
      res.status(200).json({ message: "Todo modifiée" });
    });
  });
});

module.exports = router;
