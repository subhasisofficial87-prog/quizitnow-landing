import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, FileText, Image, LogOut, Moon, Sun, Clock, CheckCircle2, Loader2, AlertCircle, Sparkles, Eye } from 'lucide-react';
import Logo3D from '@/components/Logo3D';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import ExtractedTextPreview from '@/components/ExtractedTextPreview';
import AttemptHistory from '@/components/AttemptHistory';

interface FileRow {
  id: string;
  name: string;
  type: string;
  size: number;
  status: string;
  progress: number;
  created_at: string;
  extracted_text: string | null;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileRow[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [previewFileId, setPreviewFileId] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      const { data, error } = await supabase
        .from('files')
        .select('id, name, type, size, status, progress, created_at, extracted_text')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching files:', error);
        toast.error('Failed to load files');
      } else {
        setFiles((data as FileRow[]) || []);
      }
      setIsLoading(false);
    };
    fetchFiles();

    // Poll every 5s for files stuck in processing (fallback if realtime isn't enabled)
    const pollInterval = setInterval(async () => {
      const { data } = await supabase
        .from('files')
        .select('id, name, type, size, status, progress, created_at, extracted_text')
        .order('created_at', { ascending: false });
      if (data) {
        setFiles(prev => {
          const updated = data as FileRow[];
          // Check if any file transitioned to having extracted_text
          for (const f of updated) {
            const old = prev.find(p => p.id === f.id);
            if (old && !old.extracted_text && f.extracted_text && f.status === 'processing') {
              setPreviewFileId(f.id);
              toast.success(`Text extracted from ${f.name}! Review it below.`);
            }
          }
          return updated;
        });
      }
    }, 5000);

    const channel = supabase
      .channel('files-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'files' }, (payload) => {
        if (payload.eventType === 'UPDATE') {
          const updated = payload.new as FileRow;
          setFiles(prev => prev.map(f => f.id === updated.id ? updated : f));
          if (updated.status === 'processing' && updated.extracted_text) {
            setPreviewFileId(updated.id);
            toast.success(`Text extracted from ${updated.name}! Review it below.`);
          }
        } else if (payload.eventType === 'INSERT') {
          setFiles(prev => [payload.new as FileRow, ...prev]);
        }
      })
      .subscribe();

    return () => {
      clearInterval(pollInterval);
      supabase.removeChannel(channel);
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  }, []);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFiles = async (fileList: File[]) => {
    for (const file of fileList) {
      try {
        const { data: fileRecord, error: insertError } = await supabase
          .from('files')
          .insert({
            user_id: user!.id,
            name: file.name,
            type: file.type,
            size: file.size,
            status: 'uploading',
            progress: 0,
          })
          .select()
          .single();

        if (insertError) throw insertError;

        const filePath = `${user!.id}/${fileRecord.id}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('uploads')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        await supabase.from('files').update({
          file_url: filePath,
          progress: 10,
          status: 'processing',
        }).eq('id', fileRecord.id);

        // Fire extraction asynchronously — don't block the UI.
        // Realtime subscription will update the file status when done.
        const body = { fileId: fileRecord.id, storagePath: filePath };
        supabase.functions.invoke('extract-text', { body }).then(({ error: fnError }) => {
          if (fnError) {
            console.error('Extraction error:', fnError);
            supabase.from('files').update({ status: 'error' }).eq('id', fileRecord.id);
            toast.error(`Failed to extract text from ${file.name}`);
          }
        });

        toast.info(`Processing ${file.name}... You'll be notified when ready.`);
      } catch (err: any) {
        console.error('Upload error:', err);
        toast.error(`Failed to upload ${file.name}: ${err.message}`);
      }
    }
  };

  // Helper: file has extracted text but no questions generated yet (needs review)
  const needsReview = (file: FileRow) => file.status === 'processing' && !!file.extracted_text;

  const statusConfig: Record<string, { icon: any; label: string; color: string; spin: boolean }> = {
    uploading: { icon: Loader2, label: 'Uploading', color: 'bg-sky-light text-sky-dark', spin: true },
    processing: { icon: Loader2, label: 'Processing', color: 'bg-lavender-light text-lavender', spin: true },
    completed: { icon: CheckCircle2, label: 'Ready', color: 'bg-mint-light text-mint', spin: false },
    error: { icon: AlertCircle, label: 'Error', color: 'bg-destructive/10 text-destructive', spin: false },
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  const previewFile = previewFileId ? files.find(f => f.id === previewFileId) : null;
  const userName = user?.email?.split('@')[0] || 'there';

  return (
    <div className="min-h-screen gradient-sky">
      <nav className="glass-card border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo3D size={40} />
            <h1 className="text-xl font-display font-bold text-foreground">Quiz It Now</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleDarkMode} className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
              {darkMode ? <Sun className="w-5 h-5 text-sunshine" /> : <Moon className="w-5 h-5 text-muted-foreground" />}
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted">
              <div className="w-7 h-7 rounded-full gradient-hero flex items-center justify-center text-xs font-bold text-primary-foreground">
                {userName[0]?.toUpperCase() || 'U'}
              </div>
              <span className="text-sm font-semibold text-foreground">{userName}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={async () => { await logout(); navigate('/'); }} className="rounded-xl">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h2 className="text-3xl font-display font-bold text-foreground">Hey {userName}! 👋</h2>
          <p className="text-muted-foreground mt-1">Upload your study material and let AI do the magic ✨</p>
        </motion.div>

        {/* Upload Area */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`relative glass-card rounded-3xl p-8 sm:p-12 text-center border-2 border-dashed transition-all duration-300 cursor-pointer ${
              isDragging ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-border/60 hover:border-primary/50'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
            />
            <div className="flex flex-col items-center gap-4">
              <motion.div
                className="w-20 h-20 rounded-3xl gradient-hero flex items-center justify-center shadow-xl"
                animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
              >
                <Upload className="w-10 h-10 text-primary-foreground" />
              </motion.div>
              <div>
                <h3 className="text-xl font-display font-bold text-foreground">
                  {isDragging ? 'Drop it here! 📥' : 'Upload Study Material'}
                </h3>
                <p className="text-muted-foreground mt-1">Drag & drop or click to upload PDF, JPG, or PNG files</p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center mt-2">
                <Badge variant="secondary" className="rounded-full px-4 py-1.5 font-semibold">
                  <FileText className="w-3.5 h-3.5 mr-1.5" /> PDF
                </Badge>
                <Badge variant="secondary" className="rounded-full px-4 py-1.5 font-semibold">
                  <Image className="w-3.5 h-3.5 mr-1.5" /> JPG / PNG
                </Badge>
                <Badge variant="secondary" className="rounded-full px-4 py-1.5 font-semibold">
                  <Camera className="w-3.5 h-3.5 mr-1.5" /> Camera
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Extracted Text Preview */}
        <AnimatePresence>
          {previewFile && needsReview(previewFile) && (
            <div className="mt-6">
              <ExtractedTextPreview
                fileId={previewFile.id}
                fileName={previewFile.name}
                extractedText={previewFile.extracted_text}
                onGenerated={() => setPreviewFileId(null)}
                onDismiss={() => setPreviewFileId(null)}
              />
            </div>
          )}
        </AnimatePresence>

        {/* Files List */}
        <div className="mt-10">
          <h3 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" /> Your Files
          </h3>
          {isLoading ? (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
              <p className="text-muted-foreground mt-2">Loading files...</p>
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-12 glass-card rounded-2xl">
              <p className="text-muted-foreground">No files uploaded yet. Upload your first study material above! 📚</p>
            </div>
          ) : (
            <div className="grid gap-4">
              <AnimatePresence>
                {files.map((file, i) => {
                  const sc = statusConfig[file.status] || statusConfig.error;
                  return (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.05 }}
                      className="glass-card rounded-2xl p-5 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            file.type.includes('pdf') ? 'bg-pink-light' : 'bg-sky-light'
                          }`}>
                            {file.type.includes('pdf') ? (
                              <FileText className="w-6 h-6 text-pink-dark" />
                            ) : (
                              <Image className="w-6 h-6 text-sky-dark" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-foreground truncate">{file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatSize(file.size)} • {formatDate(file.created_at)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {needsReview(file) ? (
                            <>
                              <Badge className="bg-sunshine/20 text-sunshine-dark rounded-full px-3 py-1 border-0 font-semibold">
                                <Eye className="w-3.5 h-3.5 mr-1.5" /> Review Text
                              </Badge>
                              <Button
                                size="sm"
                                variant="outline"
                                className="rounded-xl font-bold"
                                onClick={() => setPreviewFileId(file.id)}
                              >
                                <Eye className="w-4 h-4 mr-1" /> Review & Generate
                              </Button>
                            </>
                          ) : (
                            <Badge className={`${sc.color} rounded-full px-3 py-1 border-0 font-semibold`}>
                              <sc.icon className={`w-3.5 h-3.5 mr-1.5 ${sc.spin ? 'animate-spin' : ''}`} />
                              {sc.label}
                            </Badge>
                          )}
                          {file.status === 'completed' && (
                            <Button
                              size="sm"
                              className="rounded-xl gradient-hero font-bold"
                              onClick={() => navigate(`/questions/${file.id}`)}
                            >
                              <Sparkles className="w-4 h-4 mr-1" /> View Questions
                            </Button>
                          )}
                        </div>
                      </div>
                      {file.status === 'uploading' && (
                        <div className="mt-3">
                          <Progress value={file.progress} className="h-2 rounded-full" />
                          <p className="text-xs text-muted-foreground mt-1">{file.progress}% uploaded</p>
                        </div>
                      )}
                      {file.status === 'processing' && !file.extracted_text && (
                        <div className="mt-3">
                          <Progress value={file.progress} className="h-2 rounded-full" />
                          <p className="text-xs text-muted-foreground mt-1">Extracting text...</p>
                        </div>
                      )}
                      {file.status === 'processing' && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-lavender font-semibold">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          AI is generating questions from your material...
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Attempt History */}
        <AttemptHistory />
      </main>
    </div>
  );
};

export default Dashboard;
