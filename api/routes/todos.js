const express = require('express');
const TodoController = require(__controllers + '/todo.controller');
const { validateTodo, validateUpdateTodo } = require(__validators + '/todo.validators');
const router = express.Router();

router.get('/', TodoController.index);
router.post('/', validateTodo, TodoController.store);
router.get('/:id', TodoController.show);
router.patch('/:id', validateUpdateTodo, TodoController.update);
router.delete('/:id', TodoController.deleteTodo);

module.exports = router;