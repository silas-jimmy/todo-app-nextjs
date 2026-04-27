/**
 * Defines a todo object type
 */
export type Todo = {
    id: number
    title: string
    description: string
    date: Date
    time: Date
    completed: boolean
    created_at: Date
    updated_at: Date
    category: TodoCategory
}

/**
 * Defines a todo category type
 */
export type TodoCategory = {
    id?: number
    label: string
    value: string
    description: string
    created_at?: Date
    updated_at?: Date
}