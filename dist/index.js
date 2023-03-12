import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Item } from './models/index.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
app.get('/', (req, res) => {
    res.send('Your Server is working fine!');
});
app.get('/createItemTmp', (req, res) => {
    const newItem = new Item({
        name: 'Qidra',
        category: 'Main Dish',
        ingredients: ['rice', 'water', 'salt', 'chicken'],
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam architecto illo facere, officiis ab, vitae itaque voluptatem repudiandae perspiciatis',
        price: 20.5
    });
    newItem.save()
        .then(() => {
        res.send("Item is added :/");
    })
        .catch((err) => {
        res.status(500).send("Failed to add :( " + err.message);
    });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://127.0.0.1:${port}`);
    dbConnect();
});
const dbConnect = () => {
    console.log("connecting to db...");
    mongoose.connect("mongodb://127.0.0.1:27017/frying-nemo")
        .then(() => {
        console.log(`🤗 [server]: Connected to MongoDB`);
    })
        .catch((err) => {
        console.log(`🤨 [server]: Failed to connect to mongodb ${err}`);
    });
};
