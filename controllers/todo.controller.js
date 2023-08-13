const todoService = require(__services+ '/todo.services');

async function index(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.per_page) || 10;

  try {
    const { todos, totalPages, totalItems } = await todoService.getAllTodos(page, perPage);

    return res.json({
      message: "List of paginated TODO items",
      data: todos,
      page,
      perPage,
      totalPages,
      totalItems,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function store(req, res) {
  const todoItem = {
    name: req.body.name,
    done: req.body.done,
  };

  try {
    const result = await todoService.createTodo(todoItem);
    res.status(201).json({
      message: "Todo item created successfully!",
      todo: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
      error: error,
    });
  }
}

async function show(req, res) {
  try {
    const id = req.params.id;
    const result = await todoService.getTodoById(id);

    if (result) {
      res.status(200).json({
        message: `Show todo item ${id}`,
        data: result,
      });
    } else {
      res.status(404).json({
        message: `Todo item ${id} not found.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
      error: error,
    });
  }
}

async function update(req, res) {
  const todoId = req.params.id;
  const updateData = {
    name: req.body.name,
    done: req.body.done,
  };

  try {
    const updatedTodo = await todoService.updateTodoById(todoId, updateData);

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    return res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteTodo(req, res) {
  const todoId = req.params.id;

  try {
    const isDeleted = await todoService.deleteTodoById(todoId);

    if (!isDeleted) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    return res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  index,
  store,
  show,
  update,
  deleteTodo,
};