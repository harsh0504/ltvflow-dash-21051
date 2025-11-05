import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
}

const hardcodedResponses: { [key: string]: string } = {
  hello: "Hello! I'm your LAS assistant. How can I help you today?",
  hi: "Hi there! How can I assist you with your loan portfolio?",
  "loan status": "Your current loan status is Active with an outstanding balance of ₹17,35,000. Next EMI of ₹45,000 is due on Jul 15, 2024.",
  "portfolio": "Your portfolio value is ₹342.5M across all assets. The pledged value is ₹218.6M with an average LTV of 66.4%.",
  "ltv": "Your current LTV (Loan-to-Value) ratio is 66.4%, which is within the safe range. The recommended maximum is 70%.",
  "risk": "There are currently 12 critical events and 28 high-priority alerts in your risk dashboard. Would you like me to provide more details?",
  "help": "I can help you with:\n- Loan status and payment information\n- Portfolio metrics and LTV ratios\n- Risk alerts and events\n- Collateral information\n- EMI schedules\n\nJust ask me anything!",
  "default": "I understand you're asking about that. For detailed information, please check the relevant section in the dashboard or contact our support team."
};

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to LAS Dashboard! I'm your AI assistant. Ask me about your loans, portfolio, or risk alerts.",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);

    // Find matching response
    const inputLower = input.toLowerCase();
    let response = hardcodedResponses.default;

    for (const [key, value] of Object.entries(hardcodedResponses)) {
      if (inputLower.includes(key)) {
        response = value;
        break;
      }
    }

    // Simulate bot thinking delay
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="shadow-medium flex flex-col h-[500px]">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          LAS Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={
                    message.sender === "bot"
                      ? "bg-gradient-primary text-primary-foreground"
                      : "bg-gradient-accent text-accent-foreground"
                  }>
                    {message.sender === "bot" ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`flex flex-col max-w-[80%] ${
                    message.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about your loans, portfolio, or risks..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              className="bg-gradient-primary hover:opacity-90"
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
