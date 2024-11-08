import mongoose from "mongoose";
import { Item, User } from "../models/index";
import { MenuItem } from '../types/index';

const getItems = async (params: MenuItem.ItemQuery) => {
  const query: mongoose.FilterQuery<MenuItem.Item> = {};
  if (params.maxPrice !== undefined) {
    query.price = { $lte: params.maxPrice }
  }

  const categories = JSON.parse(params.categories || '[]');
  if (categories.length) {
    query.category = { $in: categories }
  }

  if (params.searchTerms) {
    const qReg = new RegExp(params.searchTerms, 'i');

    query.$or = [
      { name: qReg },
      { description: qReg },
      { category: qReg },
      { ingredients: qReg }
    ]
  }

  const items = await Item.find(query, null, { sort: { '_id': -1 } })
    .populate({
      path: 'addedBy',
      select: ['fullName', 'email', 'imageUrl']
    });

  // If you want edit the data before sending them to client
  // const parsedItem = items.map(itm => (
  //   {
  //     ...itm.toJSON(),
  //     addedBy: { ...itm.addedBy?.toJSON() as any, password: '****' }
  //   })
  // )
  // return parsedItem;

  return items;
}

const getItemById = async (itemId: string) => {
  const itemDoc = await Item.findById(itemId)
    .populate({
      path: 'addedBy',
      select: ['fullName', 'email', 'imageUrl']
    });

  if (itemDoc) {
    const item: MenuItem.Item = {
      name: itemDoc.name,
      category: itemDoc.category,
      description: itemDoc.description || '',
      imageUrl: itemDoc.imageUrl || '',
      ingredients: itemDoc.ingredients,
      price: itemDoc.price || 0,
      addedBy: itemDoc.addedBy
    }

    return item;
  }
  return null;
}

const createItem = (req: MenuItem.ItemRequest) => {
  const newItem = new Item({
    name: req.body.name,
    category: req.body.category,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    ingredients: req.body.ingredients,
    description: req.body.description,
    addedBy: req.body.addedBy
  });

  // if (req.body.price === null || req.body.price === undefined) {
  //   newItem.price = 10;
  // }

  newItem.price = req.body.price ?? 10;

  return newItem.save()
    .then(async () => {
      // To store what items each user created!
      await User.findByIdAndUpdate(req.body.addedBy, { $push: { items: newItem._id } })
      return true; // created successfully      
    });
}

export default {
  getItems,
  getItemById,
  createItem
}
