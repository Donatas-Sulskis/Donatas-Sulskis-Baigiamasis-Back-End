const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const mysql = require("mysql2/promise");

const { mysqlConfig } = require("../config");

module.exports = router;
