const express = require("express");
const router = express.Router();
const {
  getItems,
  addItem,
  updateItem,
  deleteItem,
  getItem,
} = require("../Controllers/ItemController");

router.get("/items", getItems);
router.get("/item/:id", getItem);
router.post("/item", addItem);
router.put("/item/:id", updateItem);
router.delete("/item/:id", deleteItem);

module.exports = router;
