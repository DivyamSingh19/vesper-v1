"use client";
import axios from "axios";
import { useEffect, useRef, useCallback, useTransition } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Image,
  FileUp,
  Figma,
  Monitor,
  CircleUserRound,
  ArrowUp,
  Paperclip,
  Plus,
  Send,
  X,
  Loader,
  Sparkles,
  Command,
  User,
  Bot,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";
import { log } from "console";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface UseAutoResizeTextareaProps {
  minHeight: number;
  maxHeight?: number;
}

function useAutoResizeTextarea({
  minHeight,
  maxHeight,
}: UseAutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = `${minHeight}px`;
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
      );

      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${minHeight}px`;
    }
  }, [minHeight]);

  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [adjustHeight]);

  return { textareaRef, adjustHeight };
}

interface CommandSuggestion {
  icon: React.ReactNode;
  label: string;
  description: string;
  prefix: string;
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string;
  showRing?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, containerClassName, showRing = true, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <div className={cn("relative", containerClassName)}>
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
            "transition-all duration-200 ease-in-out",
            "placeholder:text-muted-foreground",
            "disabled:cursor-not-allowed disabled:opacity-50",
            showRing
              ? "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              : "",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {showRing && isFocused && (
          <motion.span
            className="absolute inset-0 rounded-md pointer-events-none ring-2 ring-offset-0 ring-orange-500/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export function AnimatedAIChat() {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [recentCommand, setRecentCommand] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200,
  });
  const [inputFocused, setInputFocused] = useState(false);
  const commandPaletteRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // PDF-related state
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isProcessingPdf, setIsProcessingPdf] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const commandSuggestions: CommandSuggestion[] = [
    {
      icon: <Image className="w-4 h-4" />,
      label: "Clone UI",
      description: "Generate a UI from a screenshot",
      prefix: "/clone",
    },
    {
      icon: <Figma className="w-4 h-4" />,
      label: "Import Figma",
      description: "Import a design from Figma",
      prefix: "/figma",
    },
    {
      icon: <Monitor className="w-4 h-4" />,
      label: "Create Page",
      description: "Generate a new web page",
      prefix: "/page",
    },
    {
      icon: <Sparkles className="w-4 h-4" />,
      label: "Improve",
      description: "Improve existing UI design",
      prefix: "/improve",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (value.startsWith("/") && !value.includes(" ")) {
      setShowCommandPalette(true);

      const matchingSuggestionIndex = commandSuggestions.findIndex((cmd) =>
        cmd.prefix.startsWith(value)
      );

      if (matchingSuggestionIndex >= 0) {
        setActiveSuggestion(matchingSuggestionIndex);
      } else {
        setActiveSuggestion(-1);
      }
    } else {
      setShowCommandPalette(false);
    }
  }, [value]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showCommandPalette) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveSuggestion((prev) =>
          prev < commandSuggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveSuggestion((prev) =>
          prev > 0 ? prev - 1 : commandSuggestions.length - 1
        );
      } else if (e.key === "Tab" || e.key === "Enter") {
        e.preventDefault();
        if (activeSuggestion >= 0) {
          const selectedCommand = commandSuggestions[activeSuggestion];
          setValue(selectedCommand.prefix + " ");
          setShowCommandPalette(false);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setShowCommandPalette(false);
      }
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() || pdfFile) {
        pdfFile ? handleSummarizePdf() : handleSendMessage();
      }
    }
  };

  const handleSendMessage = async () => {
    if (!value.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: value,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setValue("");
    adjustHeight(true);
    setIsTyping(true);

    try {
      const response = await axios.post(
        "https://model.morpheus4077.workers.dev/api/v1/chat",
        { text: value }
      );

      const result = await response.data;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: result.response || "Sorry, I couldn't process your request.",
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, there was an error processing your request.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleAttachFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setAttachments([file.name]);
    } else if (file) {
      alert("Please select a PDF file");
    }
  };

  const handleSummarizePdf = async () => {
    if (!pdfFile) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: `📄 Uploaded: ${pdfFile.name}`,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsProcessingPdf(true);
    setIsTyping(true);

    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      const response = await fetch(
        "https://model.morpheus4077.workers.dev/api/v1/summarize-pdf",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      let aiContent = "";
      if (response.ok) {
        aiContent = `${result.summary}`;
      } else {
        aiContent = "Error processing PDF: " + result.error;
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiContent,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Upload error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Error uploading PDF. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessingPdf(false);
      setIsTyping(false);
      setPdfFile(null);
      setAttachments([]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
    setPdfFile(null);
  };

  const selectCommandSuggestion = (index: number) => {
    const selectedCommand = commandSuggestions[index];
    setValue(selectedCommand.prefix + " ");
    setShowCommandPalette(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-transparent text-white relative overflow-hidden">
      {/* Reduced orange background circles */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/15 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-amber-500/4 rounded-full mix-blend-normal filter blur-[96px] animate-pulse delay-1000" />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Messages Area - Made much wider */}
      <div className="flex-1 overflow-y-auto p-6 w-full">
        <div className="max-w-7xl mx-auto">
          {messages.length === 0 && (
            <motion.div
              className="flex items-center justify-center h-[60vh] text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="space-y-4">
                <h1 className="text-4xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/40">
                  How can I help today?
                </h1>
                <p className="text-white/40">Upload a PDF or ask me anything</p>
              </div>
            </motion.div>
          )}

          <div className="space-y-6 pb-6">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-4",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.sender === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-orange-400" />
                  </div>
                )}

                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-5 py-4 text-sm whitespace-pre-wrap leading-relaxed",
                    message.sender === "user"
                      ? "bg-white/[0.05] text-white border border-white/[0.05] ml-auto"
                      : "bg-white/[0.05] text-white border border-white/[0.05]"
                  )}
                >
                  {message.content && message.content.includes("**") ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: message.content
                          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                          .replace(/\n\n/g, "<br><br>")
                          .replace(/\n/g, "<br>"),
                      }}
                    />
                  ) : (
                    message.content || "No content"
                  )}
                </div>

                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 justify-start"
              >
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-orange-400" />
                </div>
                <div className="bg-white/[0.05] rounded-2xl px-5 py-4 border border-white/[0.05]">
                  <TypingDots />
                </div>
              </motion.div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Also wider to match */}
      <div className="border-t border-white/[0.05] bg-transparent backdrop-blur-xl p-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="relative backdrop-blur-2xl bg-white/[0.02] rounded-2xl border border-white/[0.05] shadow-2xl"
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
          >
            <AnimatePresence>
              {showCommandPalette && (
                <motion.div
                  ref={commandPaletteRef}
                  className="absolute left-4 right-4 bottom-full mb-2 backdrop-blur-xl bg-black/90 rounded-lg z-50 shadow-lg border border-white/10 overflow-hidden"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                >
                  <div className="py-1">
                    {commandSuggestions.map((suggestion, index) => (
                      <div
                        key={suggestion.prefix}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 text-xs cursor-pointer",
                          activeSuggestion === index
                            ? "bg-orange-500/20 text-white"
                            : "text-white/70 hover:bg-white/5"
                        )}
                        onClick={() => selectCommandSuggestion(index)}
                      >
                        {suggestion.icon}
                        <span className="font-medium">{suggestion.label}</span>
                        <span className="text-white/40 text-xs ml-1">
                          {suggestion.prefix}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-4">
              <Textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  adjustHeight();
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                placeholder="Message Vesper-AI to answer your legal queries"
                containerClassName="w-full"
                className={cn(
                  "w-full px-4 py-3 resize-none bg-transparent border-none",
                  "text-white/90 text-sm focus:outline-none placeholder:text-white/20 min-h-[60px]"
                )}
                showRing={false}
              />
            </div>

            <AnimatePresence>
              {attachments.length > 0 && (
                <motion.div
                  className="px-4 pb-3 flex gap-2 flex-wrap"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {attachments.map((file, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 text-xs bg-orange-500/10 py-1.5 px-3 rounded-lg text-white/70 border border-orange-500/20"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <FileUp className="w-3 h-3" />
                      <span>{file}</span>
                      <button
                        onClick={() => removeAttachment(index)}
                        className="text-white/40 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-4 border-t border-white/[0.05] flex items-center justify-between gap-4">
              <motion.button
                type="button"
                onClick={handleAttachFile}
                whileTap={{ scale: 0.94 }}
                className="p-2 text-white/40 hover:text-white/90 rounded-lg transition-colors"
              >
                <Paperclip className="w-4 h-4" />
              </motion.button>

              <motion.button
                type="button"
                onClick={pdfFile ? handleSummarizePdf : handleSendMessage}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={
                  isTyping || isProcessingPdf || (!value.trim() && !pdfFile)
                }
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                  value.trim() || pdfFile
                    ? "bg-white text-[#0A0A0B] shadow-lg"
                    : "bg-white/[0.05] text-white/40"
                )}
              >
                {isTyping || isProcessingPdf ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>Send</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center">
      {[1, 2, 3].map((dot) => (
        <motion.div
          key={dot}
          className="w-2 h-2 bg-white/70 rounded-full mx-1"
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: dot * 0.2,
          }}
        />
      ))}
    </div>
  );
}
