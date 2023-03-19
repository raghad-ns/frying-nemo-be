import express from "express";

export namespace MenuItem {
  export interface Item {
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    category: string;
    ingredients: string[];
  }

  export interface ItemQuery {
    categories?: string[];
    searchTerms?: string;
    page?: number;
    maxPrice?: number;
  }

  // with generic types
  export interface ItemRequest extends express.Request<{}, {}, MenuItem.Item, ItemQuery> { }

  // without generic types
  // export interface ItemRequest extends express.Request {
  //   body: Item
  // }
}

export namespace User {
  export interface IUser {
    email: string;
    password: string;
    role: string;
    fullName: string;
    imageUrl: string;
    authToken: string;
  }
}