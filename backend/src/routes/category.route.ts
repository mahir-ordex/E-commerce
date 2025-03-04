import {Router} from 'express';
import {getAllCategories} from '../controller/category.controller'

const categoryRouter = Router();

categoryRouter.get('/categories',getAllCategories)

export default categoryRouter;