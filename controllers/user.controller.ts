import { User } from "../models/index";
import { UserNS } from "../types/index";

const createUser = (req: UserNS.UserRequest) => {
  const newUser = new User(req.body);

  return newUser.save()
    .then(() => {
      return true;
    });
}

export default {
  createUser
}