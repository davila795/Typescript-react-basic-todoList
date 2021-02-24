import React, { Fragment, useState } from 'react'

type FormElement = React.FormEvent<HTMLFormElement>

interface ITodo {
  todo: string
  complete: boolean
}

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState<ITodo[]>([])

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault()
    addTodo(todo)
    setTodo('')
  }

  const addTodo = (todo: string): void => {
    const newTodos: ITodo[] = [...todos, { todo, complete: false }]
    setTodos(newTodos)
  }

  const completeTodo = (idx: number): void => {
    const newTodos: ITodo[] = [...todos]
    let isCompleted: boolean = newTodos[idx].complete
    newTodos[idx].complete = !isCompleted
    setTodos(newTodos)
  }

  const removeTodo = (idx: number): void => {
    const newTodos: ITodo[] = [...todos]
    newTodos.splice(idx, 1)
    setTodos(newTodos)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>ToDo List</h1>
        <input type="text" value={todo} onChange={e => setTodo(e.target.value)} />
        <button type='submit'>Add ToDo</button>
      </form>
      <section>
        {todos.map((todo: ITodo, idx: number) => (
          <Fragment key={idx}>
            <div style={{ textDecoration: todo.complete ? 'line-through' : '' }}>{todo.todo}</div>
            <button type='button' onClick={() => completeTodo(idx)}>{todo.complete ? "Incomplete" : "Complete"}</button>
            <button type='button' onClick={() => removeTodo(idx)}>&times;</button>
          </Fragment>
        ))}
      </section>
    </>
  )
}

export default App
