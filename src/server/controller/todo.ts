import { read } from "@db-crud-todo";
import type { NextApiRequest, NextApiResponse } from "next";

function get(_: NextApiRequest, res: NextApiResponse) {
  const allTodos = read()

  res.status(200).json({
    todos: allTodos,
  })
}

export const todoController = {
  get,
}
