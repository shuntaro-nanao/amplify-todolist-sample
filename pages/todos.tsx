import { ListTodosQuery } from '@/API'
import { LoginRequired } from '@/components/auth'
import { listTodos } from '@/graphql/queries'
import { nonNull } from '@/lib/filter'
import { query } from '@/lib/graphql'
import { configure } from '@/my-aws-exports'
import { onAuthUIStateChange } from '@aws-amplify/ui-components'
import { useEffect, useState } from 'react'

type Todo = {
  id: string
  name: string
}

configure()

const TodoPage = () => {
  const [user, setUser] = useState<object>()
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    return onAuthUIStateChange((_, data) => {
      setUser(data)
    })
  }, [])

  useEffect(() => {
    if (todos.length > 0) return
    if (!user) return
    const fetch = async () => {
      const res = await query<ListTodosQuery>(listTodos)
      if (res?.data?.listTodos?.items) {
        const items = res?.data?.listTodos?.items.filter(nonNull)
        setTodos(items)
      }
    }
    fetch()
  }, [user])

  return (
    <LoginRequired>
      <h1>Todo一覧</h1>
      <ul>
        {todos.map((todo) => ( // --- 13
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </LoginRequired>
  )
}

export default TodoPage