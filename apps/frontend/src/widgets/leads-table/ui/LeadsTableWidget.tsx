import { Badge } from '@/src/shared/ui/Badge'
import Link from 'next/link'
import type { Lead } from '@/src/entities/lead/model/types'

interface LeadsTableProps {
	leads: Lead[]
	isLoading: boolean
	isError: boolean
}

export const LeadsTableWidget = ({
	leads,
	isLoading,
	isError,
}: LeadsTableProps) => {
	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-64 border rounded-lg bg-gray-50'>
				<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600'></div>
				<span className='ml-3 text-gray-500'>Загрузка лидов...</span>
			</div>
		)
	}

	if (isError) {
		return (
			<div className='p-4 rounded-md bg-red-50 border border-red-200 text-red-700'>
				<h3 className='text-sm font-medium'>Ошибка загрузки данных</h3>
				<p className='mt-1 text-sm'>
					Не удалось получить список лидов. Попробуйте обновить страницу.
				</p>
			</div>
		)
	}

	if (!leads.length) {
		return (
			<div className='text-center py-16 px-4 sm:px-6 lg:px-8 border rounded-lg bg-gray-50 border-dashed border-gray-300'>
				<svg
					className='mx-auto h-12 w-12 text-gray-400'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={1}
						d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
					/>
				</svg>
				<h3 className='mt-2 text-sm font-semibold text-gray-900'>Нет лидов</h3>
				<p className='mt-1 text-sm text-gray-500'>
					Измените параметры фильтрации или создайте нового лида.
				</p>
			</div>
		)
	}

	return (
		<div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg'>
			<table className='min-w-full divide-y divide-gray-300'>
				<thead className='bg-gray-50'>
					<tr>
						<th className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'>
							Ім&apos;я
						</th>
						<th className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
							Компанія
						</th>
						<th className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
							Статус
						</th>
						<th className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
							Сума ($)
						</th>
						<th className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
							<span className='sr-only'>Действия</span>
						</th>
					</tr>
				</thead>
				<tbody className='divide-y divide-gray-200 bg-white'>
					{leads.map((lead) => (
						<tr key={lead.id} className='hover:bg-gray-50 transition-colors'>
							<td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
								<div className='font-medium text-gray-900'>{lead.name}</div>
								<div className='text-gray-500'>{lead.email}</div>
							</td>
							<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
								{lead.company || '—'}
							</td>
							<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
								<Badge status={lead.status}>{lead.status}</Badge>
							</td>
							<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
								{lead.value || 0}
							</td>
							<td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
								<Link
									href={`/leads/${lead.id}`}
									className='text-indigo-600 hover:text-indigo-900'
								>
									Открыть<span className='sr-only'>, {lead.name}</span>
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
