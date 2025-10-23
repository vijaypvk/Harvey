import { Send, Bot, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { ScrollArea } from "../components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI legal assistant. I can help you understand which legal section applies to your issue, guide you on where to approach for legal matters, and answer general law-related questions. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
  if (!input.trim()) return;

  const userMessage = {
    id: Date.now().toString(),
    role: "user",
    content: input,
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  setInput("");

  // Add a temporary assistant "thinking" message
  const thinkingId = `thinking-${Date.now()}`;
  const thinkingMessage = {
    id: thinkingId,
    role: "assistant",
    content: "Thinking...",
    timestamp: new Date(),
  };
  setMessages((prev) => [...prev, thinkingMessage]);
  setLoading(true);

  const chatUrl = "http://127.0.0.1:8000/api/chat";
  const payloadText = userMessage.content;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      message: payloadText,
      query: payloadText,
      input: payloadText,
      text: payloadText,
    }),
  };

  fetch(chatUrl, requestOptions)
    .then(async (res) => {
      if (!res.ok) throw new Error(res.statusText || res.status);
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await res.json();
        return data.reply ?? data.answer ?? JSON.stringify(data);
      } else {
        return await res.text();
      }
    })
    .then((chatText) => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: chatText || "(no chat response)",
        timestamp: new Date(),
      };
      setMessages((prev) =>
        prev.map((m) => (m.id === thinkingId ? assistantMessage : m))
      );
    })
    .catch((err) => {
      const errorMessage = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content: "Error: Unexpected failure contacting endpoint. " + (err.message || ""),
        timestamp: new Date(),
      };
      setMessages((prev) =>
        prev.map((m) => (m.id === thinkingId ? errorMessage : m))
      );
    })
    .finally(() => setLoading(false));
};


  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">AI Legal Assistant</h1>
        <p className="text-muted-foreground">
          Ask me anything about your legal concerns
        </p>
      </div>

      {/* Chat Interface */}
      <Card className="card-glow bg-card border-border">
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            LegalBot
          </CardTitle>
          <CardDescription>
            AI-powered legal guidance at your fingertips
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {/* Messages */}
          <ScrollArea className="h-[500px] p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse text-right" : "flex-row"}`}
                >
                  <div
                    className={`p-2 rounded-lg ${message.role === "user"
                        ? "bg-primary/10"
                        : "bg-accent/10"
                      }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-5 w-5 text-primary" />
                    ) : (
                      <Bot className="h-5 w-5 text-accent" />
                    )}
                  </div>
                  <div
                    className={`flex-1 rounded-lg p-4 ${message.role === "user"
                        ? "bg-primary/10 border border-primary/20"
                        : "bg-accent/10 border border-accent/20"
                      }`}
                  >
                    {message.role === "assistant" ? (
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    ) : (
                      <p className="text-sm">{message.content}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything about your legal concern..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 bg-background border-border"
              />
              <Button
                onClick={handleSend}
                className="bg-gradient-primary shadow-glow"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Questions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="card-glow bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Common Legal Queries</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              "Where should I file a consumer complaint?",
              "What is Section 498A IPC?",
              "How to register an FIR online?",
              "What are tenant rights in India?",
            ].map((question) => (
              <Button
                key={question}
                variant="outline"
                className="w-full justify-start text-left border-border hover:bg-muted"
                onClick={() => setInput(question)}
              >
                {question}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card className="card-glow bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Legal Procedures</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              "How to file for divorce in India?",
              "Steps to register a property?",
              "What is the bail procedure?",
              "How to file a civil suit?",
            ].map((question) => (
              <Button
                key={question}
                variant="outline"
                className="w-full justify-start text-left border-border hover:bg-muted"
                onClick={() => setInput(question)}
              >
                {question}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
