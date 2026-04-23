import { NextRequest, NextResponse } from 'next/server'

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string[] }> },
) {
	const { slug } = await params
	const slugPath = slug.join('/')
	const backendUrl = `http://backend:5000/api/${slugPath}`

	const url = new URL(request.url)
	const searchParams = url.searchParams.toString()
	const fullUrl = searchParams ? `${backendUrl}?${searchParams}` : backendUrl

	try {
		const response = await fetch(fullUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const data = await response.json()
		return NextResponse.json(data, { status: response.status })
	} catch (error) {
		return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
	}
}

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string[] }> },
) {
	const { slug } = await params
	const slugPath = slug.join('/')
	const backendUrl = `http://backend:5000/api/${slugPath}`

	try {
		const body = await request.json()
		const response = await fetch(backendUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})

		const data = await response.json()
		return NextResponse.json(data, { status: response.status })
	} catch (error) {
		return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
	}
}

export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string[] }> },
) {
	const { slug } = await params
	const slugPath = slug.join('/')
	const backendUrl = `http://backend:5000/api/${slugPath}`

	try {
		const body = await request.json()
		const response = await fetch(backendUrl, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})

		const data = await response.json()
		return NextResponse.json(data, { status: response.status })
	} catch (error) {
		return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string[] }> },
) {
	const { slug } = await params
	const slugPath = slug.join('/')
	const backendUrl = `http://backend:5000/api/${slugPath}`

	try {
		const response = await fetch(backendUrl, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (response.status === 204) {
			return new NextResponse(null, { status: 204 })
		}

		const data = await response.json()
		return NextResponse.json(data, { status: response.status })
	} catch (error) {
		return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
	}
}
