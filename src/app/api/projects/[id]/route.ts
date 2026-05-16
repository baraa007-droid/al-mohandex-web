import { NextResponse } from 'next/server'
import { getProjectById, updateProject, deleteProject } from '@/services/projects.service'
import { createApiSupabase, verifyAdminToken } from '@/lib/api/helpers'

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = createApiSupabase()
  if (!supabase) return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })

  try {
    const { id } = await params
    const data = await getProjectById(id)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAdminToken(request)
  if (auth.error) return auth.error

  const supabase = createApiSupabase()
  if (!supabase) return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })

  try {
    const { id } = await params
    const body = await request.json()
    const data = await updateProject(id, body)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAdminToken(request)
  if (auth.error) return auth.error

  const supabase = createApiSupabase()
  if (!supabase) return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })

  try {
    const { id } = await params
    await deleteProject(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
