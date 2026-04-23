import { LeadDetailsView } from '@/src/views/lead-details/'

interface PageProps {
	params: Promise<{ id: string }>
}

// Next.js ожидает default export для страницы
export default async function LeadPage({ params }: PageProps) {
	const { id } = await params

	return <LeadDetailsView id={id} />
}
