import {RequestHandler} from 'express';
import { Todo } from '../models/todo';

const TODOS: Todo[] = []

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as {text: string}).text;
  const newTodo = new Todo(text)

  TODOS.push(newTodo);
  res.status(201).json(newTodo)
  // console.log(req.o)
  next();
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({todos: TODOS});
  next();
};

export const updateTodos: RequestHandler<{id: string}> = (req, res, next) => {
  const todoId = +req.params.id;
  const updatedText = (req.body as {text: string}).text;

  const todoIndex = TODOS.findIndex(todo => todoId === todo.id)

  if (todoIndex < 0) {
    throw new Error('Coul not find todo!')
  }

  TODOS[todoIndex].text = updatedText;

  res.status(200).json(TODOS[todoIndex]);

  next();
};

export const deleteTodos: RequestHandler<{id: string}> = (req, res, next) => {
  const todoId = +req.params.id;

  const todoIndex = TODOS.findIndex(todo => todoId === todo.id)

  if (todoIndex < 0) {
    throw new Error('Coul not find todo!')
  }

  TODOS.splice(todoIndex, 1)

  res.status(200).json({message: 'Todo deleted!'});

  next();
};