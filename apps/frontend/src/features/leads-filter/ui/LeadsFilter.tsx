'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

export const LeadsFilter = () => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString())
			if (value) {
				params.set(name, value)
			} else {
				params.delete(name)
			}
			params.set('page', '1')
			return params.toString()
		},
		[searchParams],
	)

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		router.push(pathname + '?' + createQueryString('status', e.target.value))
	}

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault()
		router.push(pathname + '?' + createQueryString('q', searchQuery))
	}

	return (
		<form
			onSubmit={handleSearch}
			className='flex flex-col sm:flex-row gap-4 w-full'
		>
			<div className='flex-1'>
				<label htmlFor='search' className='sr-only'>
					Поиск
				</label>
				<div className='relative'>
					<div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
						<svg
							className='h-5 w-5 text-gray-400'
							viewBox='0 0 20 20'
							fill='currentColor'
						>
							<path
								fillRule='evenodd'
								d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z'
								clipRule='evenodd'
							/>
						</svg>
					</div>
					<input
						id='search'
						type='text'
						className='block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
						placeholder='Пошук за іменем, електронною адресою або назвою компанії...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>

			<div className='sm:w-48'>
				<label htmlFor='status' className='sr-only'>
					Статус
				</label>
				<select
					id='status'
					className='block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
					onChange={handleStatusChange}
					defaultValue={searchParams.get('status') || ''}
				>
					<option value=''>Усі статуси</option>
					<option value='NEW'>New</option>
					<option value='CONTACTED'>Contacted</option>
					<option value='IN_PROGRESS'>In Progress</option>
					<option value='WON'>Won</option>
					<option value='LOST'>Lost</option>
				</select>
			</div>

			<button
				type='submit'
				className='hidden sm:block rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer'
			>
				Шукати
			</button>
		</form>
	)
}
