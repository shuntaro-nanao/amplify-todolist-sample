import { GetTodoQuery, TodoStatus } from '@/API'

type TodoApi = Exclude<GetTodoQuery['getTodo'], null>

export class Todo {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly status: TodoStatus,
    public readonly deadline: Date | null,
    public readonly description: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly owner: string | null
  ) {}

  public static fromApi(data: TodoApi) {
    return new Todo(
      data.id,
      data.name,
      data.status,
      data.deadLine ? new Date(data.deadLine) : null,
      data.description,
      new Date(data.createdAt),
      new Date(data.updatedAt),
      data.owner
    )
  }

  public copy() {
    return new Todo(
      this.id,
      this.name,
      this.status,
      this.deadline ? new Date(this.deadline.getTime()) : null,
      this.description,
      new Date(this.createdAt.getTime()),
      new Date(this.updatedAt.getTime()),
      this.owner
    )
  }
}