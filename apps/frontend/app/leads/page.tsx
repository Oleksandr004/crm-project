import { LeadsFilter } from '@/src/features/leads-filter'
import { CreateLeadButton } from '@/src/features/create-lead/ui/CreateLeadButton'
import { LeadsTableWidget } from '@/src/widgets/leads-table/ui/LeadsTableWidget'
import { Pagination } from '@/src/features/leads-pagination/ui/Pagination'
import { apiClient } from '@/src/shared/api/base'
import type { Lead } from '@/src/entities/lead/model/types'

interface LeadsResponse {
	data: Lead[]
	meta: {
		total: number
		page: number
		limit: number
		totalPages: number
	}
}

interface PageProps {
	searchParams: Promise<{ [key: string]: string | undefined }>
}

export default async function LeadsListPage({ searchParams }: PageProps) {
	const params = await searchParams

	let leads: Lead[] = []
	let totalPages = 1
	let currentPage = Number(params.page) || 1
	let isError = false

	try {
		const query = new URLSearchParams()
		if (params.q) query.append('q', params.q)
		if (params.status) query.append('status', params.status)
		if (params.page) query.append('page', params.page)
		query.append('limit', '10')

		const response = await apiClient<LeadsResponse>(
			`/leads?${query.toString()}`,
		)

		leads = response.data
		totalPages = response.meta.totalPages
		currentPage = response.meta.page
	} catch (error) {
		console.error('Fetch error:', error)
		isError = true
	}

	return (
		<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			<div className='sm:flex sm:items-center sm:justify-between mb-8'>
				<div>
					<h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>Ліди</h1>
					<p className='mt-2 text-sm text-gray-500'>
						Управління потенційними клієнтами та їхнім статусом.
					</p>
				</div>
				<div className='mt-4 sm:ml-16 sm:mt-0'>
					<CreateLeadButton />
				</div>
			</div>

			<div className='mb-6'>
				<LeadsFilter />
			</div>

			<LeadsTableWidget leads={leads} isLoading={false} isError={isError} />

			<div className='mt-6'>
				<Pagination totalPages={totalPages} currentPage={currentPage} />
			</div>
		</main>
	)
}
