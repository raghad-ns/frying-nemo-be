import express from "express";

export namespace MenuItem {
  export interface Item {
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    category: string;
    ingredients: string[];
    addedBy?: string;
  }

  export interface ItemQuery {
    categories?: string;
    searchTerms?: string;
    page?: number;
    maxPrice?: number;
  }

  // with generic types
  export interface ItemRequest extends express.Request<{ id: string }, {}, MenuItem.Item, ItemQuery> { }

  // without generic types
  // export interface ItemRequest extends express.Request {
  //   body: Item
  // }
}

export namespace UserNS {
  export interface IUser {
    email: string;
    password: string;
    role: string;
    fullName: string;
    imageUrl: string;
    authToken: string;
  }

  // with generic types
  export interface UserRequest extends express.Request<{}, {}, UserNS.IUser, {}> { }
}