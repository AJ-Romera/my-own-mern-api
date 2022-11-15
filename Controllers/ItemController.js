const ItemModel = require("../Models/ItemModel");

// @desc  Get items
// @route  GET /api/items
// @access  Private
const getItems = async (req, res) => {
  const items = await ItemModel.find();

  res.status(200).json(items);
};

// @desc  Get item
// @route  GET /api/item/:id
// @access  Private
const getItem = async (req, res) => {
  const item = await ItemModel.findById(req.params.id);

  res.status(200).json(item);
};

// @desc  Add item
// @route  POST /api/add-item
// @access  Private
const addItem = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.price ||
    !req.body.imageUrl
  ) {
    res
      .status(400)
      .json({ message: "Please add the name, description, price and image" });
  }
  const item = await ItemModel.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
  });

  res.status(200).json(item);
};

// @desc  Update item
// @route  PUT /api/item/:id
// @access  Private
const updateItem = async (req, res) => {
  const itemId = req.params.id;
  const updates = req.body;
  const options = { new: true };
  let item;

  try {
    item = await ItemModel.findByIdAndUpdate(itemId, updates, options);
  } catch (error) {
    console.error(error);
  }

  if (!item) {
    console.log(item);
    return res
      .status(500)
      .json({ message: "Unable to update, maybe you gave the wrong id" });
  }

  return res.status(200).json({ item });
};

// @desc  Delete item
// @route  DELETE /item/:id
// @access  Private
const deleteItem = async (req, res) => {
  const item = await ItemModel.findById(req.params.id);

  if (!item) {
    res.status(400).json({ message: "There's no item with the given id" });
  }

  const response = await ItemModel.findByIdAndDelete(req.params.id);

  res.status(200).json(response);
};

module.exports = {
  getItems,
  addItem,
  updateItem,
  deleteItem,
  getItem,
};
