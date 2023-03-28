import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  imageUrl: 'String',
  description: String,
  price: {
    type: 'Number'
  },
  category: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    default: []
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    // type: 'ObjectId',
    ref: 'User'
  }
});

const Item = mongoose.model("Item", ItemSchema);

export default Item;