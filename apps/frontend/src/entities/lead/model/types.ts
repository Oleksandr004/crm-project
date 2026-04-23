import type { LeadComment } from '@/src/entities/comment/model/types'
export type LeadStatus = 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'WON' | 'LOST'

export interface Lead {
	id: string
	name: string
	email?: string
	company?: string
	status: LeadStatus
	value?: number
	notes?: string
	createdAt: string
	updatedAt: string
	comments?: LeadComment[]
}
