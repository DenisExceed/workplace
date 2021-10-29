import Router from 'express';
import itemController from './itemController.js';

const router = new Router();

router.post('/', itemController.create);
router.post('/deleteChecked', itemController.deleteChecked);
router.get('/', itemController.getAllItems);
router.put('/', itemController.updateMany);
router.put('/:id', itemController.updateOne);
router.delete('/:id', itemController.delete);

export default router;
