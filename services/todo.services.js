const todoRepository = require(__repositories + '/todo.repository');

async function getAllTodos(page, perPage) {
  const offset = (page - 1) * perPage;
  const { rows: todos, count } = await todoRepository.getAllTodos(offset, perPage);
  const totalPages = Math.ceil(count / perPage);
  return { todos, totalPages, totalItems: count };
}

async function createTodo(todoItem) {
  return todoRepository.createTodo(todoItem);
}

async function getTodoById(id) {
  return todoRepository.getTodoById(id);
}

async function updateTodoById(id, updateData) {
  const todo = await todoRepository.getTodoById(id);
  if (!todo) {
    return null;
  }
  return todoRepository.updateTodo(todo, updateData);
}

async function deleteTodoById(id) {
  const todo = await todoRepository.getTodoById(id);
  if (!todo) {
    return false;
  }
  await todoRepository.deleteTodo(todo);
  return true;
}

module.exports = {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodoById,
  deleteTodoById,
};