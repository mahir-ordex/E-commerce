import { Router } from 'express';
import { signUp, signIn, signOut } from "../controller/user.controller";

const userRouter = Router();

userRouter.post('/signup', signUp);
userRouter.post('/signin', signIn);
userRouter.post('/signout', signOut);

export default userRouter;
