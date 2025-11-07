import fs from "fs"
import { v4 as uuid } from 'uuid'

const DB_FILE_PATH = './core/db'

interface Todo {
  id: string
  date: string
  content: string
  done: boolean
}

function create(content: string): Todo {
  const todo: Todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content: content,
    done: false
  }

  const todos: Array<Todo> = [
    ...read(),
    todo,
  ];

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
    todos
  }, null, 2))
  return todo
}

function read(): Array<Todo> {
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8")
  const db = JSON.parse(dbString || "{}")

  if (!db.todos) {
    return []
  }

  return db.todos
}

function update(id: string, partialTodo: Partial<Todo>) {
  let updatedTodo;

  const todos = read()
  todos.forEach((currentTodo) => {
    const isToUpdate = currentTodo.id === id

    if (isToUpdate) {
      updatedTodo = Object.assign(currentTodo, partialTodo)
    }
  })

  if (!updatedTodo) throw new Error("Please, provide another ID.")

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2))
}

function updateContentById(id: string, content: string) {
  return update(
    id, {
    content
  }
  )
}

function CLEAR_DB() {
  fs.writeFileSync(DB_FILE_PATH, "")
}

CLEAR_DB()
create('Primeira TODO')
create('Segunda TODO')
const terceiraTodo = create('Terceira TODO')

update(terceiraTodo.id, {
  content: "novo content da terceira todo",
  done: true
})

updateContentById(terceiraTodo.id, 'Atualizando o content novamente')
console.log(read())

