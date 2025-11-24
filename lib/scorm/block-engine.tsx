import { useState } from 'react';
import { EditorBlock, TextBlock, ImageBlock, VideoBlock, QuizBlock, InteractiveBlock } from './types'
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

interface BlockRendererProps {
  block: EditorBlock;
  onClick: (block: EditorBlock) => void;
}

export function BlockRenderer({ block, onClick }: BlockRendererProps) {
  const props = { block, onClick, key: block.id };

  switch (block.type) {
    case 'text':
      return <TextBlockRenderer {...props} />
    case 'image':
      return <ImageBlockRenderer {...props} />
    case 'video':
      return <VideoBlockRenderer {...props} />
    case 'quiz':
      return <QuizBlockRenderer {...props} />
    case 'interactive':
      return <InteractiveBlockRenderer {...props} />
    default:
      return <p>Unsupported block type</p>
  }
}

function TextBlockRenderer({ block, onClick }: { block: TextBlock; onClick: (block: EditorBlock) => void }) {
  return <div onClick={() => onClick(block)} className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: block.html }} />
}

function ImageBlockRenderer({ block, onClick }: { block: ImageBlock; onClick: (block: EditorBlock) => void }) {
  return (
    <figure onClick={() => onClick(block)} className="my-4">
      <img src={block.src} alt={block.alt || ''} className="max-w-full h-auto rounded-lg shadow-md border border-border" />
      {block.alt && <figcaption className="text-center text-sm text-muted-foreground mt-2">{block.alt}</figcaption>}
    </figure>
  );
}

function VideoBlockRenderer({ block, onClick }: { block: VideoBlock; onClick: (block: EditorBlock) => void }) {
  return <video src={block.src} controls onClick={() => onClick(block)} className="max-w-full rounded-lg shadow-md border border-border w-full" />
}

function QuizBlockRenderer({ block, onClick }: { block: QuizBlock, onClick: (block: EditorBlock) => void }) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const selectedOption = submitted ? block.options.find(opt => opt.id === selectedOptionId) : null;
  const isCorrect = selectedOption?.correct;

  const handleSubmit = () => {
    if (selectedOptionId) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSelectedOptionId(null);
    setSubmitted(false);
  }

  const getOptionClass = (option: typeof block.options[0]) => {
    if (!submitted) return 'border-border bg-card hover:bg-muted/50';
    if (option.correct) return 'border-green-500 bg-green-50/50 dark:bg-green-900/30 text-green-900 dark:text-green-200';
    if (option.id === selectedOptionId && !option.correct) return 'border-red-500 bg-red-50/50 dark:bg-red-900/30 text-red-900 dark:text-red-200';
    return 'border-border bg-card';
  }
  
  const getIcon = (option: typeof block.options[0]) => {
    if (!submitted) return <div className="h-5 w-5" />; // placeholder for alignment
    if (option.correct) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (option.id === selectedOptionId && !option.correct) return <XCircle className="h-5 w-5 text-red-600" />;
    return <div className="h-5 w-5" />; // placeholder for alignment
  }

  return (
    <div onClick={() => onClick(block)} className="p-4 sm:p-6 border rounded-xl bg-card shadow-sm transition-all my-4">
      <p className="font-semibold mb-4 text-foreground text-base sm:text-lg">{block.question}</p>
      <div className="space-y-3">
        {block.options.map((option) => (
          <label 
            key={option.id} 
            htmlFor={option.id}
            className={`flex items-center p-3 border-2 rounded-lg transition-all duration-200 ${getOptionClass(option)} ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
          >
            <input
              type="radio"
              name={block.id}
              id={option.id}
              className="h-4 w-4 text-primary focus:ring-primary border-muted-foreground"
              onChange={(e) => setSelectedOptionId(e.target.id)}
              checked={selectedOptionId === option.id}
              disabled={submitted}
            />
            <span className="flex-1 text-sm sm:text-base text-foreground ml-3">{option.label}</span>
            {getIcon(option)}
          </label>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between min-h-[40px]">
        {!submitted ? (
          <Button onClick={handleSubmit} disabled={!selectedOptionId}>
            Check Answer
          </Button>
        ) : (
          <div className="flex flex-col">
             <div className={`flex items-center font-semibold text-base ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {isCorrect ? (
                    <CheckCircle className="mr-2 h-5 w-5" />
                ) : (
                    <XCircle className="mr-2 h-5 w-5" />
                )}
                <span>{isCorrect ? 'Correct!' : 'Incorrect'}</span>
             </div>
             {!isCorrect && (
                <p className="text-xs text-muted-foreground mt-1 pl-7">
                    The correct answer is highlighted in green.
                </p>
             )}
          </div>
        )}

        {submitted && (
            <Button variant="outline" onClick={handleReset}>
                Try Again
            </Button>
        )}
      </div>
    </div>
  );
}


function InteractiveBlockRenderer({ block, onClick }: { block: InteractiveBlock, onClick: (block: EditorBlock) => void }) {
  return (
    <div onClick={() => onClick(block)} className="p-4 border rounded-lg bg-blue-50 my-4 dark:bg-blue-900/20 dark:border-blue-700">
      <p className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Interactive Element</p>
      <p className="text-sm text-blue-700 dark:text-blue-300">{block.description || 'Interact with the content below.'}</p>
      <div className="mt-2 p-4 bg-white dark:bg-black/20 border rounded-md">
        <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(block.config, null, 2)}</pre>
      </div>
    </div>
  )
}
