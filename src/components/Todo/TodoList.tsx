import { TodoStatus } from '@/API'
import { Todo } from '@/models/todo'
import { useMemo, useState } from 'react'
import { Card } from '../Card'
import { Modal } from '../Modal'
import { TodoForm } from '../TodoForm'
import { TodoCard } from './TodoCard'
import styles from './TodoList.module.scss'

type TodoListProps = {
  status: TodoStatus
  todos: Todo[]
}

export const TodoList = ({ status, todos }: TodoListProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const statusLabel = useMemo(
    () =>
      status === TodoStatus.NONE
        ? `未分類`
        : status === TodoStatus.BACKLOG
        ? 'バックログ'
        : status === TodoStatus.DOING
        ? '作業中'
        : status === TodoStatus.REVIEW
        ? 'レビュー中'
        : status === TodoStatus.DONE
        ? '完了'
        : '',
    [status]
  )
  return (
    <div className={styles['todo-list']}>
      <div className={styles['todo-list__title']}>
        <span className={styles['todo-list__title__count']}>
          {todos.length}
        </span>
        <div className={styles['todo-list__title__status']}>{statusLabel}</div>
        <Modal
          isOpen={isOpen}
          activator={
            <div
              className={styles['todo-list__title__add']}
              onClick={() => setIsOpen(true)}
            />
          }
          clickOutSide={() => setIsOpen(false)}
        >
          <Card>
            <TodoForm defaultValues={{ status }} />
          </Card>
        </Modal>
      </div>
      <div className={styles['todo-list__todos']}>
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  )
}