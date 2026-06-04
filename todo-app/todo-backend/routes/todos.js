const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  const addedTodosString = await redis.get("added_todos");
  const addedTodosNumber = await Number(addedTodosString);
  if (!addedTodosNumber) {
    redis.set("added_todos", 1);
  }
  redis.set("added_todos", addedTodosNumber + 1);

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  console.log('id', id)
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)
  console.log('req.todo', req.todo)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  console.log('yoo help delete');
  await req.todo.deleteOne();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  
  const todo = await req.todo;

  res.send(todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todo = await req.todo;
  const { text, done } = req.body

  if (!todo) {
    res.status(404).end()
  }

  todo.text = text
  todo.done = done
  
  const updatedTodo = await todo.save()

  res.send(updatedTodo)

  // res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
