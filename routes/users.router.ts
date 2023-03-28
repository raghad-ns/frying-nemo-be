import express from 'express';
import { UserNS } from '../types/index';
import userController from '../controllers/user.controller';

const router = express.Router();

router.post('/', async (req: UserNS.UserRequest, res) => {
  try {    
    await userController.createUser(req);
    res.status(201).send();
  } catch (error) {
    res.status(500).send("Failed to add user!");
  }

});

export default router;