import { Item } from "../models/index";
import { IItemQuery } from '../types/index';


const getItems = async (params: IItemQuery) => {
  const items = await Item.find();
  return items;
}

const createItem = (data: any) => {

}

export default {
  getItems,
  createItem
}