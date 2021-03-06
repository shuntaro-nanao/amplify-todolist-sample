import {
  CreateTodoMutation,
  CreateTodoMutationVariables,
  DeleteTodoMutation,
  DeleteTodoMutationVariables,
  TodoStatus,
  UpdateTodoMutation,
  UpdateTodoMutationVariables,
} from '@/API'
import { createTodo, deleteTodo, updateTodo } from '@/graphql/mutations'
import { mutate } from '@/lib/graphql'
import { AmplifyUserContext } from '@/store/user'
import { useContext, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import styles from './TodoForm.module.scss'

type TodoFormType = {
  id?: string
  name?: string
  status?: TodoStatus
  description?: string | null
  owner?: string | null
}

type TodoFormProps = {
  defaultValues?: TodoFormType
  postSubmit?: () => void
}

export const TodoForm = ({ defaultValues, postSubmit }: TodoFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    getValues,
  } = useForm<TodoFormType>({
    defaultValues: {
      ...defaultValues,
      status: defaultValues?.status || TodoStatus.NONE,
    },
  })
  const user = useContext(AmplifyUserContext)
  const isOwner = useMemo(() => {
    return !defaultValues?.owner || defaultValues.owner === user?.getUsername()
  }, [user, defaultValues?.owner])

  useEffect(() => {
    if (getValues('name') !== defaultValues?.name) {
      setValue('name', defaultValues?.name)
    }
    if (getValues('description') !== defaultValues?.description) {
      setValue('description', defaultValues?.description)
    }
    if (getValues('status') !== defaultValues?.status) {
      setValue('status', defaultValues?.status)
    }
  }, [defaultValues])

  const onSubmit = async ({ id, ...input }: Required<TodoFormType>) => {
    if (!id) {
      await mutate<CreateTodoMutation, CreateTodoMutationVariables>(
        createTodo,
        { input }
      )
      reset()
    } else {
      await mutate<UpdateTodoMutation, UpdateTodoMutationVariables>(
        updateTodo,
        { input: { ...input, id } }
      )
    }
    if (postSubmit) {
      postSubmit()
    }
  }

  const onDeleteTodo = async () => {
    const id = getValues('id')
    if (!id) return
    await mutate<DeleteTodoMutation, DeleteTodoMutationVariables>(deleteTodo, {
      input: { id: id },
    })
    if (postSubmit) {
      postSubmit()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
      <input type="hidden" name="id"/>
      <div className={styles['field']}>
        <label className={styles['field-label']} htmlFor="name_input">
          ??????
        </label>
        <input
          className={styles['field-input']}
          id="name_input"
          name="name"
          readOnly={!isOwner}
        />
      </div>
      <div className={styles['field']}>
        <label className={styles['field-label']} htmlFor="status_input">
          ???????????????
        </label>
        <select
          className={styles['field-select']}
          id="status_input"
          name="status"
        >
          <option className={styles['field-select-option']} value="NONE">
            ??????
          </option>
          <option className={styles['field-select-option']} value="BACKLOG">
            ???????????????
          </option>
          <option className={styles['field-select-option']} value="DOING">
            ?????????
          </option>
          <option className={styles['field-select-option']} value="REVIEW">
            ???????????????
          </option>
          <option className={styles['field-select-option']} value="DONE">
            ??????
          </option>
        </select>
      </div>
      <div className={styles['field']}>
        <label className={styles['field-label']} htmlFor="description_input">
          ??????
        </label>
        <input
          className={styles['field-input']}
          id="description_input"
          name="description"
          readOnly={!isOwner}
        />
      </div>
      <div className={styles['button-field']}>
        <button className={styles['button']} type="submit">
          ??????
        </button>
        {isOwner ? (
          <button
            className={styles['button']}
            data-danger
            onClick={onDeleteTodo}
            type="button"
          >
            ??????
          </button>
        ) : null}
      </div>
    </form>
  )
}