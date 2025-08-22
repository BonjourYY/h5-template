export interface Feedback {
  id: number
  content: string
  createdAt: string
  updatedAt: string
}

export interface Demand {
  id: number
  contact_person: string
  contact_phone: string
  content: string
  feedbackId: number | null
  feedback: Feedback | null
  openId: string
  createdAt: string
  updatedAt: string
}

export interface CreateDemandDto {
  content: string
  contact_person: string
  contact_phone: string
}
