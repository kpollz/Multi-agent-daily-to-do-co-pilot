export interface Task {
  id: string
  title: string
  description: string
  startTime: string
  endTime: string
  note?: string
  completed?: boolean
  reasonForChange?: string
}

export interface User {
  id: string
  email: string
  name: string
}

export interface Session {
  user: User
  token: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  email: string
  password: string
  name: string
}

export interface PlanResponse {
  tasks: Task[]
  summary: string
}

export type AppPhase = 'intention' | 'schedule' | 'execution'
