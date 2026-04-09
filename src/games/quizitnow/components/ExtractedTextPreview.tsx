import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Eye, Edit3, Check, X, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ExtractedTextPreviewProps {
  fileId: string;
  fileName: string;
  extractedText: string;
  onGenerated: () => void;
  onDismiss: () => void;
}

const ExtractedTextPreview: React.FC<ExtractedTextPreviewProps> = ({
  fileId,
  fileName,
  extractedText,
  onGenerated,
  onDismiss,
}) => {
  const [text, setText] = useState(extractedText);
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast.error('No text to generate questions from');
      return;
    }

    setIsGenerating(true);
    try {
      // Save any edits back to the file record
      await supabase.from('files').update({ extracted_text: text, status: 'processing' }).eq('id', fileId);

      const { error } = await supabase.functions.invoke('generate-questions', {
        body: { fileId, extractedText: text },
      });

      if (error) {
        console.error('Generation error:', error);
        toast.error('Failed to generate questions');
      } else {
        toast.success(`Questions generated for ${fileName}!`);
        onGenerated();
      }
    } catch (err: any) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="glass-card border-primary/30 rounded-2xl overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              Review Extracted Text
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                <FileText className="w-3.5 h-3.5 inline mr-1" />
                {fileName}
              </span>
              <Button variant="ghost" size="icon" className="rounded-xl h-8 w-8" onClick={onDismiss}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Verify the extracted text below. You can edit it before generating questions.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[200px] max-h-[400px] rounded-xl text-sm font-mono bg-muted/50 border-border"
              placeholder="Extracted text..."
            />
          ) : (
            <div className="max-h-[300px] overflow-y-auto rounded-xl bg-muted/50 border border-border p-4 text-sm whitespace-pre-wrap leading-relaxed">
              {text || <span className="text-muted-foreground italic">No text extracted</span>}
            </div>
          )}

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <><Check className="w-4 h-4 mr-1.5" /> Done Editing</>
              ) : (
                <><Edit3 className="w-4 h-4 mr-1.5" /> Edit Text</>
              )}
            </Button>

            <Button
              className="rounded-xl gradient-hero font-bold"
              onClick={handleGenerate}
              disabled={isGenerating || !text.trim()}
            >
              {isGenerating ? (
                <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> Generating...</>
              ) : (
                <><Sparkles className="w-4 h-4 mr-1.5" /> Generate Questions</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExtractedTextPreview;
