import express from 'express';
import { UserNS } from '../types/index';
import userController from '../controllers/user.controller';

const router = express.Router();

router.post('/login', async (req: UserNS.LoginRequest, res) => {
  try {
    const user = await userController.login(req);
    if (user) {
      res.status(200).send(user);
    }
    else {
      res.status(403).send("User name or password is invalid!");
    }
  } catch (error) {
    res.status(500).send("Failed to login user!");
  }

});

router.post('/', async (req: UserNS.UserRequest, res) => {
  try {
    await userController.createUser(req);
    res.status(201).send();
  } catch (error) {
    res.status(500).send("Failed to add user!");
  }

});

export default router;