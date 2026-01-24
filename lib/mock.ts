import { Task, User, Session, PlanResponse } from './types'

let currentUser: Session | null = null

export const mockUsers: User[] = [
  { id: '1', email: 'user@example.com', name: 'Demo User' },
]

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Morning Standup',
    description: 'Team standup meeting to discuss daily goals',
    startTime: '09:00',
    endTime: '09:30',
    note: 'Prepare daily updates',
  },
  {
    id: '2',
    title: 'Deep Work Session',
    description: 'Focus on core feature development',
    startTime: '10:00',
    endTime: '12:00',
    note: 'No distractions during this time',
  },
  {
    id: '3',
    title: 'Lunch Break',
    description: 'Take a break and recharge',
    startTime: '12:00',
    endTime: '13:00',
  },
  {
    id: '4',
    title: 'Code Review',
    description: 'Review pull requests from the team',
    startTime: '14:00',
    endTime: '15:00',
  },
  {
    id: '5',
    title: 'Planning Meeting',
    description: 'Plan next sprint with the team',
    startTime: '15:30',
    endTime: '16:30',
  },
  {
    id: '6',
    title: 'Documentation',
    description: 'Update project documentation',
    startTime: '17:00',
    endTime: '18:00',
  },
]

export async function login(credentials: { email: string; password: string }): Promise<Session> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  
  const user = mockUsers.find((u) => u.email === credentials.email)
  
  if (!user) {
    throw new Error('Invalid credentials')
  }
  
  const session: Session = {
    user,
    token: 'mock-token-' + Date.now(),
  }
  
  currentUser = session
  return session
}

export async function signup(credentials: { email: string; password: string; name: string }): Promise<Session> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  
  const newUser: User = {
    id: String(mockUsers.length + 1),
    email: credentials.email,
    name: credentials.name,
  }
  
  mockUsers.push(newUser)
  
  const session: Session = {
    user: newUser,
    token: 'mock-token-' + Date.now(),
  }
  
  currentUser = session
  return session
}

export async function logout(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  currentUser = null
}

export function getCurrentSession(): Session | null {
  return currentUser
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getPlan(_input: string): Promise<PlanResponse> {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  
  return {
    tasks: mockTasks.map((task) => ({ ...task })),
    summary: 'Based on your input, I have created a balanced schedule with focused work sessions, breaks, and collaborative activities. The schedule prioritizes your high-energy hours in the morning.',
  }
}

export function getClientCurrentTime(): string {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}
