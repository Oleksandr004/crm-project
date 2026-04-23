'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { apiClient } from '@/src/shared/api/base'

const createLeadSchema = z.object({
	name: z.string().min(1, "Ім'я обов'язкове"),
	email: z.string().email('Некоректний email').optional().or(z.literal('')),
	company: z.string().default(''),
	status: z.enum(['NEW', 'CONTACTED', 'IN_PROGRESS', 'WON', 'LOST']),
	value: z.coerce.number().min(0).default(0),
	notes: z.string().default(''),
})

type CreateLeadInputs = z.infer<typeof createLeadSchema>

export const CreateLeadButton = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const form = useForm<CreateLeadInputs>({
		// @ts-ignore
		resolver: zodResolver(createLeadSchema),
		// Все поля из схемы должны быть тут!
		defaultValues: {
			name: '',
			email: '',
			company: '',
			status: 'NEW',
			value: 0,
			notes: '',
		},
	})

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = form

	const handleClose = () => {
		setIsOpen(false)
		reset()
		setIsLoading(false)
	}

	const onSubmit: SubmitHandler<CreateLeadInputs> = async (data) => {
		setIsLoading(true)
		try {
			await apiClient('/leads', {
				method: 'POST',
				body: JSON.stringify(data),
			})
			handleClose()
			router.refresh()
		} catch (error) {
			alert('Помилка: ' + (error as Error).message)
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<>
			<button
				type='button'
				onClick={() => setIsOpen(true)}
				className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 cursor-pointer transition-colors'
			>
				Додати ліда
			</button>

			{isOpen && (
				<div className='relative z-50' role='dialog' aria-modal='true'>
					<div
						className='fixed inset-0 bg-gray-500/75 transition-opacity'
						onClick={handleClose}
					/>

					<div className='fixed inset-0 z-10 overflow-y-auto'>
						<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
							<div className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
								<h3 className='text-lg font-semibold leading-6 text-gray-900 mb-6'>
									Створення нового ліда
								</h3>

								<form
									onSubmit={handleSubmit(onSubmit as any)}
									className='space-y-4'
								>
									<div>
										<label className='block text-sm font-medium text-gray-700'>
											Ім&apos;я *
										</label>
										<input
											{...register('name')}
											type='text'
											className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
										/>
										{errors.name && (
											<p className='mt-1 text-xs text-red-500'>
												{errors.name.message}
											</p>
										)}
									</div>

									<div>
										<label className='block text-sm font-medium text-gray-700'>
											Email
										</label>
										<input
											{...register('email')}
											type='email'
											className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
										/>
										{errors.email && (
											<p className='mt-1 text-xs text-red-500'>
												{errors.email.message}
											</p>
										)}
									</div>

									<div className='grid grid-cols-2 gap-4'>
										<div>
											<label className='block text-sm font-medium text-gray-700'>
												Компанія
											</label>
											<input
												{...register('company')}
												type='text'
												className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
											/>
										</div>
										<div>
											<label className='block text-sm font-medium text-gray-700'>
												Цінність (USD)
											</label>
											<input
												{...register('value')}
												type='number'
												step='0.01'
												className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.value ? 'border-red-500' : ''}`}
											/>
											{errors.value && (
												<p className='mt-1 text-xs text-red-500'>
													{errors.value.message}
												</p>
											)}
										</div>
									</div>

									<div>
										<label className='block text-sm font-medium text-gray-700'>
											Статус
										</label>
										<select
											{...register('status')}
											className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
										>
											<option value='NEW'>New</option>
											<option value='CONTACTED'>Contacted</option>
											<option value='IN_PROGRESS'>In Progress</option>
											<option value='WON'>Won</option>
											<option value='LOST'>Lost</option>
										</select>
									</div>

									<div>
										<label className='block text-sm font-medium text-gray-700'>
											Нотатки
										</label>
										<textarea
											{...register('notes')}
											rows={2}
											className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
										/>
									</div>

									<div className='mt-8 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3'>
										<button
											type='submit'
											disabled={isLoading}
											className='inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 sm:col-start-2 disabled:opacity-50 cursor-pointer'
										>
											{isLoading ? 'Збереження...' : 'Зберегти'}
										</button>
										<button
											type='button'
											onClick={handleClose}
											className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0 cursor-pointer'
										>
											Відміна
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
