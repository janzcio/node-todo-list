const { Todo } = require(__models);

async function getAllTodos(offset, limit) {
  return Todo.findAndCountAll({
    offset,
    limit,
  });
}

async function createTodo(todoItem) {
  return Todo.create(todoItem);
}

async function getTodoById(id) {
  return Todo.findByPk(id);
}

async function updateTodo(todo, updateData) {
  return todo.update(updateData);
}

async function deleteTodo(todo) {
  await todo.destroy();
}

module.exports = {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
};