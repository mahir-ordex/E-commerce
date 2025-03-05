import {Router} from 'express';
import {getAllCategories} from '../controller/category.controller'

const categoryRoutes = Router();

categoryRoutes.get('/categories',getAllCategories)

export default categoryRoutes;