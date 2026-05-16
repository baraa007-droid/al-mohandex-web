import { NextResponse } from 'next/server'
import { ProjectSchema } from '@/validators/project.validator'
import { ProjectRepository } from '@/repositories/project.repository'
import { projects as staticProjects } from '@/data/projects'
import { verifyAdminToken } from '@/lib/api/helpers'
import { auditLogEntry } from '@/lib/audit'

function mapStaticProject(p: (typeof staticProjects)[number]) {
  return {
    id: p.id.toString(),
    title: p.titleEn,
    slug: `project-${p.id}`,
    description: p.descEn,
    category: p.category,
    image_url: p.img,
    technologies: p.technologies,
    featured: false,
    created_by: null,
    created_at: new Date().toISOString(),
  }
}

export async function GET() {
  try {
    const repo = new ProjectRepository()
    const data = await repo.findMany({ orderBy: { column: 'created_at', ascending: false } })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(staticProjects.map(mapStaticProject))
  }
}

export async function POST(request: Request) {
  const auth = await verifyAdminToken(request)
  if (auth.error) return auth.error

  try {
    const body = await request.json()
    const parsed = ProjectSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
    }

    const repo = new ProjectRepository()
    const data = await repo.insert(parsed.data)

    auditLogEntry({
      action: 'New project created',
      userId: auth.dbUser?.id,
      email: auth.dbUser?.email,
      details: { title: parsed.data.title, slug: parsed.data.slug },
      severity: 'info',
    })

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
