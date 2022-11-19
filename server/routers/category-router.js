const { Router } = require('express');
const categoryController = require('../controllers/category-controller');

const router = new Router();

router.post('/categories', categoryController.createCategory);
router.get('/categories', categoryController.getCategories);
router.get('/categories/:id', categoryController.getSpecificCategory);
router.get('/categories/:id/events', categoryController.getCategoryEvents);
router.patch('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;