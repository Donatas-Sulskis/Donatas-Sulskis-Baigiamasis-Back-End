const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const mysql = require("mysql2/promise");

const { mysqlConfig } = require("../config");

router.get("/dashboard", middleware.loggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const [data] = await con.execute(
      `SELECT * FROM sugars 
      WHERE user_id = ${req.userData.id}`
    );

    con.end();

    return res.status(200).send(data);
  } catch (e) {
    console.log(e);

    return res.status(500).send({ error: "DB error" });
  }
});

router.post("/dashboard", middleware.loggedIn, async (req, res) => {
  if (!req.body.sugar || !req.userData.id) {
    return res.status(400).send({ error: "Insufficient data provided" });
  }

  try {
    const con = await mysql.createConnection(mysqlConfig);
    const [data] = await con.execute(
      `INSERT INTO sugars (user_id, sugar,timestamp) 
      VALUES (${req.userData.id} , ${mysql.escape(req.body.sugar)}, NOW())`
    );

    con.end();

    return res.send({ msg: "Successfully added sugar!" });
  } catch (e) {
    console.log(e);

    return res.status(500).send({ error: "DB error" });
  }
});

module.exports = router;
