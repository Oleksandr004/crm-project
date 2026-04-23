import { notFound } from 'next/navigation'
import Link from 'next/link'
import { LeadProfileWidget } from '@/src/widgets/lead-profile'
import { CommentsSectionWidget } from '@/src/widgets/comments-section'
import { apiClient } from '@/src/shared/api/base'

// Типизация лида (согласно ТЗ)
interface Lead {
	id: string
	name: string
	email?: string
	company?: string
	status: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'WON' | 'LOST'
	value?: number
	notes?: string
}

interface LeadDetailsViewProps {
	id: string
}

export async function LeadDetailsView({ id }: LeadDetailsViewProps) {
	let lead: Lead | null = null
	let isError = false

	try {
		// Запрос данных на сервере
		lead = await apiClient<Lead>(`/leads/${id}`, {
			cache: 'no-store',
		})
	} catch (error) {
		console.error('Fetch lead error:', error)
		isError = true
	}

	if (!lead && !isError) {
		notFound()
	}

	return (
		<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			<div className='mb-6'>
				<Link
					href='/leads'
					className='inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors'
				>
					<span>&larr;</span> Вернуться к списку
				</Link>
			</div>

			{isError ? (
				<div className='p-4 border border-red-200 bg-red-50 rounded-lg text-red-700'>
					Ошибка при загрузке данных лида.
				</div>
			) : (
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Основная инфомация */}
					<div className='lg:col-span-2'>
						<LeadProfileWidget leadId={id} initialData={lead} />
					</div>

					{/* Сайдбар с комментариями */}
					<div className='lg:col-span-1'>
						<CommentsSectionWidget leadId={id} />
					</div>
				</div>
			)}
		</main>
	)
}
