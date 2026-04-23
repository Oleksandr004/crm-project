'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface PaginationProps {
	totalPages: number
	currentPage: number
}

export const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const router = useRouter()

	const createPageURL = (pageNumber: number | string) => {
		const params = new URLSearchParams(searchParams.toString())
		params.set('page', pageNumber.toString())
		return `${pathname}?${params.toString()}`
	}

	if (totalPages <= 1) return null

	return (
		<div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4 rounded-lg shadow-sm'>
			<div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
				<div>
					<p className='text-sm text-gray-700'>
						Сторінка <span className='font-medium'>{currentPage}</span> з{' '}
						<span className='font-medium'>{totalPages}</span>
					</p>
				</div>
				<div>
					<nav
						className='isolate inline-flex -space-x-px rounded-md shadow-sm'
						aria-label='Pagination'
					>
						<button
							onClick={() => router.push(createPageURL(currentPage - 1))}
							disabled={currentPage <= 1}
							className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed'
						>
							<span className='sr-only'>Попередня</span>
							&larr; Назад
						</button>
						<button
							onClick={() => router.push(createPageURL(currentPage + 1))}
							disabled={currentPage >= totalPages}
							className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed'
						>
							<span className='sr-only'>Наступна</span>
							Вперед &rarr;
						</button>
					</nav>
				</div>
			</div>
		</div>
	)
}
