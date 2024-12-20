import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import itemsRouter from './routes/items.router';
import userRouter from './routes/users.router';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

app.use('/items', itemsRouter);
app.use('/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Congrats Sajeda & Raghad! Your Server is working fine!');
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
}
