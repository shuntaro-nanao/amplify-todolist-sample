import { Todo } from '@/models/todo'
import { useMemo, useState } from 'react'
import { Card } from '../Card'
import { Modal } from '../Modal'
import { TodoForm } from '../TodoForm'
import styles from './TodoCard.module.scss'

type TodoCardProps = {
  todo: Todo
}

export const TodoCard = ({ todo }: TodoCardProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const card = useMemo(
    () => (
      <div className={styles['todo-card']} onClick={() => setIsOpen(true)}>
        <div className={styles['todo-card__title']}>{todo.name}</div>
        <div className={styles['todo-card__sub-title']}>
          <span className={styles['todo-card__sub-title__owner']}>
            {todo.owner}
          </span>
          <span className={styles['todo-card__sub-title__time']}>
            {todo.createdAt.toLocaleString()}
          </span>
        </div>
        <div className={styles['todo-card__text']}>{todo.description}</div>
      </div>
    ),
    [todo]
  )
  return (
    <Modal
      activator={card}
      isOpen={isOpen}
      clickOutSide={() => setIsOpen(false)}
    >
      <Card>
        <TodoForm defaultValues={todo} postSubmit={() => setIsOpen(false)} />
      </Card>
    </Modal>
  )
}