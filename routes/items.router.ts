import express from 'express';
import mongoose from 'mongoose';
import Item from '../models/item.model';
import { IItemRequest } from '../types/index';
import itemController from '../controllers/item.controller';

const router = express.Router();

router.get('/', async (req: IItemRequest, res) => {
  const items = await itemController.getItems(req.query);
  res.status(200).send(items);
});

router.post('/', async (req: IItemRequest, res) => {
  if (!req.body.name || !req.body.category) {
    return res.status(400).send("Name and category are required!");
  }
  if (req.body.price && typeof req.body.price !== 'number') {
    return res.status(400).send("Price Must be number!");
  }

  const newItem = new Item({
    name: req.body.name,
    category: req.body.category,
    ingredients: req.body.ingredients,
    description: req.body.description
  });

  newItem.price = req.body.price || 10;

  newItem.save()
    .then(() => {
      res.status(201).send();
    })
    .catch((err: mongoose.Error) => {
      console.error(err.message);
      res.status(500).send("Failed to add item!");
    });
});

export default router;