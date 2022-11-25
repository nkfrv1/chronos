const { Router } = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const categoryController = require('../controllers/category-controller');

const router = new Router();

router.post('/categories', authMiddleware, categoryController.createCategory);
router.get('/categories', authMiddleware, categoryController.getCategories);
router.get('/categories/:id', authMiddleware, categoryController.getSpecificCategory);
router.get('/categories/:id/events', authMiddleware, categoryController.getCategoryEvents);
router.patch('/categories/:id', authMiddleware, categoryController.updateCategory);
router.delete('/categories/:id', authMiddleware, categoryController.deleteCategory);

module.exports = router;