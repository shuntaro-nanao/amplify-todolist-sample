import { TodoStatus } from '@/API'
import { useTodos } from '@/store/todos'
import styles from './index.module.scss'
import { TodoList } from './TodoList'

export const Todos = () => {
  const { todosByStatus } = useTodos()

  return (
    <div className={styles['index']}>
      <div className={styles['index__title']}>Todo一覧</div>
      <div className={styles['index__wrapper']}>
        <TodoList
          status={TodoStatus.NONE}
          todos={todosByStatus(TodoStatus.NONE)}
        />
        <TodoList
          status={TodoStatus.BACKLOG}
          todos={todosByStatus(TodoStatus.BACKLOG)}
        />
        <TodoList
          status={TodoStatus.DOING}
          todos={todosByStatus(TodoStatus.DOING)}
        />
        <TodoList
          status={TodoStatus.REVIEW}
          todos={todosByStatus(TodoStatus.REVIEW)}
        />
        <TodoList
          status={TodoStatus.DONE}
          todos={todosByStatus(TodoStatus.DONE)}
        />
      </div>
    </div>
  )
}