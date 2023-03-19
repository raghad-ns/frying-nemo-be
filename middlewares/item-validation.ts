import express from 'express';
import { MenuItem } from '../types/index';

export const validateItem = (req: MenuItem.ItemRequest, res: express.Response, next: express.NextFunction) => {
  if (!req.body.name || !req.body.category) {
    return res.status(400).send("Name and category are required!");
  }
  if (req.body.price && typeof req.body.price !== 'number') {
    return res.status(400).send("Price must be number!");
  }
  next();
}