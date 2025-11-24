'use client'

import { EditorBlock, TextBlock, ImageBlock, VideoBlock, QuizBlock } from '@/lib/scorm/types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

interface PropertiesPanelProps {
  selectedBlock: EditorBlock | null;
  onBlockChange: (block: EditorBlock) => void;
}

export function PropertiesPanel({ selectedBlock, onBlockChange }: PropertiesPanelProps) {
  if (!selectedBlock) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        <p>Select a block to edit its properties.</p>
      </div>
    );
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBlock = { ...selectedBlock, html: e.target.value } as TextBlock;
    onBlockChange(newBlock);
  }

  const handleImageSrcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBlock = { ...selectedBlock, src: e.target.value } as ImageBlock;
    onBlockChange(newBlock);
  }

  const handleImageAltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBlock = { ...selectedBlock, alt: e.target.value } as ImageBlock;
    onBlockChange(newBlock);
  }

  const handleVideoSrcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBlock = { ...selectedBlock, src: e.target.value } as VideoBlock;
    onBlockChange(newBlock);
  }

  const handleQuizQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBlock = { ...selectedBlock, question: e.target.value } as QuizBlock;
    onBlockChange(newBlock);
  }

  const handleQuizOptionChange = (index: number, value: string) => {
    const newOptions = [...(selectedBlock as QuizBlock).options];
    newOptions[index].label = value;
    const newBlock = { ...selectedBlock, options: newOptions } as QuizBlock;
    onBlockChange(newBlock);
  }

  const handleQuizCorrectChange = (index: number, checked: boolean) => {
    const newOptions = [...(selectedBlock as QuizBlock).options];
    newOptions[index].correct = checked;
    const newBlock = { ...selectedBlock, options: newOptions } as QuizBlock;
    onBlockChange(newBlock);
  }

  const addQuizOption = () => {
    const newOptions = [...(selectedBlock as QuizBlock).options, { id: `opt-${Date.now()}`, label: 'New Option', correct: false }];
    const newBlock = { ...selectedBlock, options: newOptions } as QuizBlock;
    onBlockChange(newBlock);
  }

  const renderControls = () => {
    switch (selectedBlock.type) {
      case 'text':
        return (
          <div>
            <Label htmlFor="text-input">Text</Label>
            <Input id="text-input" value={(selectedBlock as TextBlock).html} onChange={handleTextChange} />
          </div>
        );
      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-src-input">Image URL</Label>
              <Input id="image-src-input" value={(selectedBlock as ImageBlock).src} onChange={handleImageSrcChange} />
            </div>
            <div>
              <Label htmlFor="image-alt-input">Alt Text</Label>
              <Input id="image-alt-input" value={(selectedBlock as ImageBlock).alt} onChange={handleImageAltChange} />
            </div>
          </div>
        );
      case 'video':
        return (
          <div>
            <Label htmlFor="video-src-input">Video URL</Label>
            <Input id="video-src-input" value={(selectedBlock as VideoBlock).src} onChange={handleVideoSrcChange} />
          </div>
        );
      case 'quiz':
        const quizBlock = selectedBlock as QuizBlock;
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="quiz-question-input">Question</Label>
              <Input id="quiz-question-input" value={quizBlock.question} onChange={handleQuizQuestionChange} />
            </div>
            <div>
              <Label>Options</Label>
              {quizBlock.options.map((option, index) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Input value={option.label} onChange={(e) => handleQuizOptionChange(index, e.target.value)} />
                  <Checkbox checked={option.correct} onCheckedChange={(checked) => handleQuizCorrectChange(index, checked as boolean)} />
                </div>
              ))}
              <Button onClick={addQuizOption}>Add Option</Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Properties</h3>
      {renderControls()}
    </div>
  );
}
