import { Router } from 'express';
import { getMonster, getAllMonsters, addMonster, editMonster, removeMonster } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const monstersRouter = Router();

monstersRouter
    .all('/*', authenticateToken)
    .get('/', getAllMonsters)
    .get('/:id', getMonster)
    .delete('/:id', removeMonster)
    .put('/:id', editMonster)
    .post('/', addMonster);

export { monstersRouter };
