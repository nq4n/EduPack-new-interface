'use client'

import type React from 'react'
import { useState, type FormEvent, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useLocale } from '@/hooks/use-locale'
import { t } from '@/lib/translations'
import { EditorBlock, EditorPage, EditorProject } from '@/lib/scorm/types'
import { BlockRenderer } from '@/lib/scorm/block-engine'
import { useLocalStorage } from '@/hooks/use-local-storage';
import {
  Save,
  Eye,
  Download,
  Type,
  ImageIcon,
  Video,
  FileQuestion,
  MousePointerClick,
  Upload,
  MessageCircle,
} from 'lucide-react'

type Status = 'draft' | 'published'

type ChatMessage = {
  id: number
  role: 'assistant' | 'user' | 'system'
  content: string
}

const initialProject: EditorProject = {
    id: `proj-${Date.now()}`,
    title: 'Untitled Project',
    language: 'en',
    version: '1.0',
    pages: [
        {
            id: 'page-1',
            title: 'Introduction',
            blocks: [],
        }
    ]
};


export default function ScormAIPage() {
  const { locale } = useLocale()
  const [project, setProject] = useLocalStorage<EditorProject>('scorm-project', initialProject);
  const [activePage, setActivePage] = useState<EditorPage>(project.pages[0]);

  const [status, setStatus] = useState<Status>('draft')

  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: 'assistant',
      content: t(locale, 'scorm.ai.welcome'),
    },
    {
      id: 2,
      role: 'system',
      content: `You are a SCORM authoring assistant. Your responses should be in the form of JSON that conforms to the EditorBlock types. For example, to create a text block, you would respond with: {"type":"text","html":"<p>Hello world</p>"}. To create a quiz, you would respond with: {"type":"quiz","question":"What is 2+2?","options":[{"id":"1","label":"3","correct":false},{"id":"2","label":"4","correct":true}]}`,
    },
  ])

  useEffect(() => {
    // Keep active page in sync with project updates
    const currentPage = project.pages.find(p => p.id === activePage.id);
    if (currentPage) {
      setActivePage(currentPage);
    }
  }, [project, activePage.id]);


  const handleSend = async (e: FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const newMessages: ChatMessage[] = [
      ...messages,
      { id: Date.now(), role: 'user', content: chatInput.trim() },
    ]
    setMessages(newMessages)
    setChatInput('')

    try {
      const response = await fetch('/api/scorm/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages.map(({ id, ...rest }) => rest) }),
      })

      if (!response.ok) {
        throw new Error('API error')
      }

      const aiResponse = await response.json()

      try {
        const block = JSON.parse(aiResponse.content) as EditorBlock
        block.id = `block-${Date.now()}`
        
        setProject(prevProject => {
            const updatedPages = prevProject.pages.map(p => {
                if (p.id === activePage.id) {
                    return { ...p, blocks: [...p.blocks, block] };
                }
                return p;
            });
            return { ...prevProject, pages: updatedPages };
        });

        setMessages((prev) => [
          ...prev,
          { id: Date.now(), role: 'assistant', content: `Added a new ${block.type} block.` },
        ])
      } catch (e) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), role: 'assistant', content: aiResponse.content },
        ])
      }
    } catch (error) {
      console.error('Failed to get AI response:', error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: 'assistant',
          content: 'Sorry, I had trouble connecting to the AI. Please check your setup and try again.',
        },
      ])
    }
  }

  const handleSave = () => {
      // The useLocalStorage hook already saves on change, but we can have an explicit save button for user assurance
      console.log('Project saved!', project);
      // You can add a toast notification here to give feedback to the user
  }

  const handleExport = async () => {
      try {
        const response = await fetch('/api/scorm/export', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        });

        if (!response.ok) {
            throw new Error('Export failed');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${project.title || 'scorm-package'}.zip`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error('Failed to export project:', error);
         // You can add a toast notification here to give feedback to the user
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top editor bar */}
      <header className="sticky top-16 z-40 bg-card border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Input value={project.title} onChange={(e) => setProject({...project, title: e.target.value})} className="max-w-xs" />
            <Badge variant={status === 'draft' ? 'secondary' : 'default'}>
              {status === 'draft' ? t(locale, 'scorm.topbar.status.draft') : t(locale, 'scorm.topbar.status.published')}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              {t(locale, 'scorm.topbar.preview')}
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              {t(locale, 'scorm.topbar.save')}
            </Button>
            <Button size="sm" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              {t(locale, 'scorm.topbar.export')}
            </Button>
          </div>
        </div>
      </header>

      {/* Full-screen editor */}
      <main className="h-[calc(100vh-4rem-4rem)] flex flex-col gap-3 px-2 sm:px-4 pb-3 pt-2">
        <section className="bg-card border border-border rounded-xl p-3 sm:p-4">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="min-w-0">
              <h2 className="text-sm font-semibold truncate">{t(locale, 'scorm.preview.title')}</h2>
              <p className="text-xs text-muted-foreground">{t(locale, 'scorm.preview.desc')}</p>
            </div>
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              {t(locale, 'scorm.preview.open')}
            </Button>
          </div>
          <div className="h-40 sm:h-52 lg:h-60 rounded-lg border border-dashed border-accent/60 bg-accent/30 flex items-center justify-center">
            <span className="text-xs sm:text-sm text-muted-foreground">{t(locale, 'scorm.preview.player')}</span>
          </div>
        </section>

        <section className="flex-1 bg-gradient-to-br from-primary/5 via-primary/10 to-accent/20 border border-primary/20 rounded-2xl p-2 sm:p-3">
          <div className="h-full bg-card/80 backdrop-blur rounded-xl border border-border/70 flex flex-col">
            <div className="border-b border-border/60 p-3 space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{t(locale, 'scorm.ai.title')}</h3>
                  <p className="text-xs text-muted-foreground">{t(locale, 'scorm.ai.desc')}</p>
                </div>
              </div>
              <div className="h-32 sm:h-40 overflow-y-auto rounded-lg border border-border/60 bg-background/70 p-2 space-y-2 text-xs sm:text-sm">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-2xl ${
                        m.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-sm'
                          : m.role === 'system'
                          ? 'hidden'
                          : 'bg-accent/40 text-foreground rounded-bl-sm'
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSend} className="flex gap-2 pt-1">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={t(locale, 'scorm.ai.placeholder')}
                  className="text-xs sm:text-sm"
                />
                <Button type="submit" size="sm">
                  {t(locale, 'scorm.ai.send')}
                </Button>
              </form>
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-auto px-4 py-4">
                <div className="max-w-3xl mx-auto space-y-4">
                  {activePage.blocks.length > 0 ? (
                    activePage.blocks.map((block) => <BlockRenderer key={block.id} block={block} />)
                  ) : (
                    <div className="text-center space-y-3 py-12">
                      <h2 className="text-base sm:text-lg font-semibold">{t(locale, 'scorm.canvas.title')}</h2>
                      <p className="text-xs sm:text-sm text-muted-foreground">{t(locale, 'scorm.canvas.desc')}</p>
                      <Button variant="outline" size="sm" type="button">
                        <MousePointerClick className="mr-2 h-4 w-4" />
                        {t(locale, 'scorm.canvas.start')}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-border/60 bg-card/90 px-3 py-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                  {t(locale, 'scorm.tools.title')}
                </span>
                <span className="hidden sm:inline text-[11px] text-muted-foreground">
                  {t(locale, 'scorm.tools.desc')}
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                <ToolButton icon={<Type className="h-4 w-4" />} label={t(locale, 'scorm.tools.text')} />
                <ToolButton icon={<ImageIcon className="h-4 w-4" />} label={t(locale, 'scorm.tools.image')} />
                <ToolButton icon={<Video className="h-4 w-4" />} label={t(locale, 'scorm.tools.video')} />
                <ToolButton icon={<FileQuestion className="h-4 w-4" />} label={t(locale, 'scorm.tools.quiz')} />
                <ToolButton
                  icon={<MousePointerClick className="h-4 w-4" />}
                  label={t(locale, 'scorm.tools.interactive')}
                />
                <ToolButton icon={<Upload className="h-4 w-4" />} label={t(locale, 'scorm.tools.upload')} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function ToolButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-1 rounded-lg border border-accent/50 bg-accent/20 hover:bg-accent/30 px-2 py-2 text-[11px] sm:text-xs font-medium text-foreground transition-colors"
    >
      <span className="text-primary">{icon}</span>
      <span>{label}</span>
    </button>
  )
}
