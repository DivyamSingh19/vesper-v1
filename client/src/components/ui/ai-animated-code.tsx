import { useEffect, useRef, useCallback, useTransition } from "react";
import { useState } from "react";
import {
  Image,
  FileUp,
  Figma,
  Monitor,
  Paperclip,
  Send,
  X,
  Loader,
  Sparkles,
  User,
  Bot,
} from "lucide-react";
import * as React from "react";

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
      <div className={`relative ${containerClassName || ""}`}>
        <textarea
          className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-all duration-200 ease-in-out placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 ${showRing ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-0" : ""} ${className || ""}`}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {showRing && isFocused && (
          <span
            className="absolute inset-0 rounded-md pointer-events-none ring-2 ring-offset-0 ring-main-blue opacity-100 transition-opacity duration-200"
            style={{ animation: "fadeIn 0.2s ease-in-out" }}
          />
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export default function AnimatedAIChat() {
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

    // Simulate AI response for demo
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "This is a demo response. Your message has been received and processed successfully!",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
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

    // Simulate PDF processing for demo
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "PDF uploaded successfully! This is a demo - the file would be processed by your backend service.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsProcessingPdf(false);
      setIsTyping(false);
      setPdfFile(null);
      setAttachments([]);
    }, 3000);
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
    <div className="h-screen w-full flex flex-col bg-gray-50 text-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-main-blue rounded-full mix-blend-normal filter blur-[128px]"
          style={{ animation: "pulse 2s infinite" }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-main-blue rounded-full mix-blend-normal filter blur-[128px]"
          style={{ animation: "pulse 2s infinite", animationDelay: "0.7s" }}
        />
        <div 
          className="absolute top-1/4 right-1/3 w-64 h-64 bg-main-blue rounded-full mix-blend-normal filter blur-[96px]"
          style={{ animation: "pulse 2s infinite", animationDelay: "1s" }}
        />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Messages Area - Fixed height with independent scrolling */}
      <div className="flex-1 overflow-y-auto p-6 w-full pb-48" style={{ height: "calc(100vh - 200px)" }}>
        <div className="max-w-7xl mx-auto h-full">
          {messages.length === 0 && (
            <div 
              className="flex items-center justify-center h-[60vh] text-center opacity-0"
              style={{ 
                animation: "fadeInUp 0.5s ease-out forwards",
                animationDelay: "0.1s"
              }}
            >
              <div className="space-y-4">
                <h1 className="text-4xl font-medium text-gray-800">
                  How can I assist you today?
                </h1>
                <p className="text-gray-600">Upload a PDF or ask me anything</p>
              </div>
            </div>
          )}

          <div className="space-y-6 pb-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex gap-4 opacity-0 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
                style={{
                  animation: "fadeInUp 0.3s ease-out forwards",
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {message.sender === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-gray-800" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] flex flex-col gap-3 ${
                    message.sender === "user" ? "ml-auto" : ""
                  }`}
                >
                  <div
                    className={`rounded-2xl px-5 py-4 text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${
                      message.sender === "user"
                        ? "bg-blue-400 text-white"
                        : "bg-white text-gray-900 border border-gray-200"
                    }`}
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
                </div>

                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-blue-200" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div
                className="flex gap-4 justify-start opacity-0"
                style={{
                  animation: "fadeInUp 0.3s ease-out forwards"
                }}
              >
                <div className="w-8 h-8 rounded-full bg-main-blue flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-blue-200" />
                </div>
                <div className="bg-white rounded-2xl px-5 py-4 border border-gray-200 shadow-sm">
                  <TypingDots />
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white/95 backdrop-blur-xl p-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative backdrop-blur-sm bg-white rounded-2xl border border-gray-200 shadow-lg transform scale-98 transition-transform duration-200 hover:scale-100"
          >
            {showCommandPalette && (
              <div
                ref={commandPaletteRef}
                className={`absolute left-4 right-4 bottom-full mb-2 backdrop-blur-xl bg-white rounded-lg z-50 shadow-lg border border-gray-200 overflow-hidden transition-all duration-200 ${
                  showCommandPalette ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                }`}
              >
                <div className="py-1">
                  {commandSuggestions.map((suggestion, index) => (
                    <div
                      key={suggestion.prefix}
                      className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer transition-colors ${
                        activeSuggestion === index
                          ? "bg-orange-500/10 text-main-blue"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                      onClick={() => selectCommandSuggestion(index)}
                    >
                      {suggestion.icon}
                      <span className="font-medium">{suggestion.label}</span>
                      <span className="text-gray-400 text-xs ml-1">
                        {suggestion.prefix}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                className="w-full px-4 py-3 resize-none bg-transparent border-none text-gray-900 text-sm focus:outline-none placeholder:text-gray-500 min-h-[60px]"
                showRing={false}
              />
            </div>

            {attachments.length > 0 && (
              <div
                className={`px-4 pb-3 flex gap-2 flex-wrap transition-all duration-300 ${
                  attachments.length > 0 ? "opacity-100 max-h-20" : "opacity-0 max-h-0"
                }`}
              >
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-xs bg-white py-1.5 px-3 rounded-lg text-blue-900 border border-blue-200 transform scale-90 transition-transform duration-200 hover:scale-100"
                  >
                    <FileUp className="w-3 h-3" />
                    <span>{file}</span>
                    <button
                      onClick={() => removeAttachment(index)}
                      className="text-blue-200 hover:text-blue-900 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="p-4 border-t border-gray-100 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleAttachFile}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition-all duration-200 hover:bg-gray-100 transform hover:scale-105"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={pdfFile ? handleSummarizePdf : handleSendMessage}
                disabled={
                  isTyping || isProcessingPdf || (!value.trim() && !pdfFile)
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 transform hover:scale-105 ${
                  value.trim() || pdfFile
                    ? "bg-blue-500 text-white shadow-lg hover:bg-blue-600 hover:shadow-xl"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isTyping || isProcessingPdf ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center">
      {[1, 2, 3].map((dot) => (
        <div
          key={dot}
          className="w-2 h-2 bg-gray-400 rounded-full mx-1"
          style={{
            animation: `typingDot 1.5s infinite`,
            animationDelay: `${dot * 0.2}s`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes typingDot {
          0%, 60%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          30% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}