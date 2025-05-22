import { Router } from 'express';
import { getInventory } from '../inventoryController';

const router = Router();

router.post('/inventory', getInventory);

export default router;
