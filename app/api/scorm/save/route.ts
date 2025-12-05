import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.delete({ name, ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return new NextResponse(
      JSON.stringify({ error: 'You must be logged in to save a project.' }),
      { status: 401 }
    )
  }

  // Now that the user is authenticated, we can safely get the request body.
  const project = await request.json()

  if (!project || !project.id) {
    return new NextResponse(
      JSON.stringify({ error: 'Invalid project data.' }),
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('packages')
    .upsert({
      id: project.id,
      user_id: user.id,
      content: project,
      title: project.title,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error('Error saving project to Supabase:', error.message)
    return new NextResponse(
      JSON.stringify({ error: 'Failed to save project.', details: error.message }),
      { status: 500 }
    )
  }

  return NextResponse.json({ message: 'Project saved successfully', data })
}
