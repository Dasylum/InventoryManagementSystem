const express = require("express");

const router = express.Router();

const ItemController = require("./item.controller");

router.get("/", async (req, res, next) => {
  try {
    const item = await ItemController.getAllItems();

    res.json(item);
  } catch (error) {
    next(error);
  }
});

router.get("/category/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await ItemController.getItemByCategoryId(id);

    res.json(item);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await ItemController.getItemById(id);

    res.json(item);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = req.body.Item;
    const item = await ItemController.newItem(data);

    res.json(item);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
