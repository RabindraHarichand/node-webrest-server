import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy Milk", createdAt: new Date() },
  { id: 2, text: "Buy Bread", createdAt: null },
  { id: 3, text: "Buy butter", createdAt: new Date() },
];
export class TodosController {
  //* DI
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      res.status(400).json({ error: " ID argument is not a number" });
    const todo = todos.find((todo) => {
      return todo.id === id;
    });

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `TODO with ${id} not found` });
  };

  public createTodo = (req: Request, res: Response) => {
    const body = req.body;

    res.json(body);
  };
}