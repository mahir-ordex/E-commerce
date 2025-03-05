import { Router } from 'express';
import { signUp, signIn, signOut } from "../controller/user.controller";

const userRoutes = Router();

userRoutes.post('/signup', signUp);
userRoutes.post('/signin', signIn);
userRoutes.post('/signout', signOut);

export default userRoutes;
