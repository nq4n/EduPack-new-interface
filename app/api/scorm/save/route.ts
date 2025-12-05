<<<<<<< HEAD
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return new NextResponse(
      JSON.stringify({ error: 'Supabase credentials are not configured.' }),
      { status: 500 }
    )
  }

  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
=======
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // 1. Get user and validate session
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
>>>>>>> 7760c3d (Changes before Firebase Studio auto-run)

  if (!user) {
    return new NextResponse(JSON.stringify({ error: 'User not logged in.' }), { status: 401 });
  }

  // 2. Get and validate the project data from the request body
  const project = await request.json();
  if (!project || !project.id) {
    return new NextResponse(JSON.stringify({ error: 'Invalid project data.' }), { status: 400 });
  }

  const filePath = `${user.id}/${project.id}/project.json`;

  // 3. Upload the project JSON to Supabase Storage
  try {
    const { error: storageError } = await supabase.storage
      .from('packages')
      .upload(filePath, JSON.stringify(project), {
        cacheControl: '3600',
        upsert: true,
      });

    if (storageError) {
      throw new Error(`Supabase Storage Error: ${storageError.message}`);
    }
  } catch (e: any) {
    console.error('--- STORAGE UPLOAD FAILED ---', e.message);
    return new NextResponse(
      JSON.stringify({
        error: '[STORAGE_UPLOAD_FAILED] Failed to save project content.',
        details: e.message,
      }),
      { status: 500 }
    );
  }

  // 4. Save the project metadata to the Supabase database
  try {
    const packageData = {
      package_id: project.id,
      title: project.title,
      description: project.description || null,
      is_listed_in_store: project.isListedInStore || false,
      storage_path: filePath,
      created_by_user_id: user.id,
      updated_at: new Date().toISOString(),
    };

    const { error: dbError } = await supabase
      .from('packages')
      .upsert(packageData, { onConflict: 'package_id' });

    if (dbError) {
      throw new Error(`Supabase DB Error: ${dbError.message}`);
    }

    return NextResponse.json({ message: 'Project saved successfully' });
  } catch (e: any) {
    console.error('--- DATABASE WRITE FAILED (SUPABASE) ---', e.message);
    return new NextResponse(
      JSON.stringify({
        error: '[DATABASE_WRITE_FAILED] Failed to save project metadata.',
        details: e.message,
      }),
      { status: 500 }
    );
  }
}