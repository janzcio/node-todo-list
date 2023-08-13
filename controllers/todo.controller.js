const { Todo } = require(__models);

const index = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.per_page) || 10;
    const offset = (page - 1) * perPage;

    try {
        const { rows: todos, count } = await Todo.findAndCountAll({
        limit: perPage,
        offset: offset,
        });

        const totalPages = Math.ceil(count / perPage);

        return res.json({
        message:"List of paginated TODO items",
        data: todos,
        page,
        perPage,
        totalPages,
        totalItems: count,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const store = (req, res) => {
    const todoItem = {
        name: req.body.name,
        done: req.body.done,
    };

    // store todo item
    Todo.create(todoItem).then(result => {
        res.status(201).json({
            message : "Todo item created successfully!",
            todo: result
        })
    }).catch(error => {
        res.status(500).json({
            message : "Something went wrong.",
            error: error
        })
    });
}

const show = async (req, res) => {
    try {
      const id = req.params.id;
      
      const result = await Todo.findByPk(id);
  
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
  };

const update = async (req, res) => {
    const todoId = req.params.id;  // Get todo ID from route parameter

    try {
        const todo = await Todo.findByPk(todoId);  // Find the todo by ID

        if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
        }

        // Update todo attributes based on the request body
        await todo.update(req.body);

        return res.json(todo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteTodo = async (req, res) => {
    const todoId = req.params.id;  // Get todo ID from route parameter

    try {
        const todo = await Todo.findByPk(todoId);  // Find the todo by ID

        if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
        }

        // Delete the todo
        await todo.destroy();

        return res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    store: store,
    show: show,
    index: index,
    update: update,
    delete: deleteTodo
};