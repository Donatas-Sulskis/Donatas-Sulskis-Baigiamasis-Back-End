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

module.exports = router;
