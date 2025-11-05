import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot, Send } from "lucide-react";
import { useState } from "react";

interface AIAgentProps {
  module?: string;
  placeholder?: string;
}

export const AIAgent = ({ module = "General", placeholder = "Ask me anything..." }: AIAgentProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("AI Query:", query);
    // Add your AI query logic here
    setQuery("");
  };

  return (
    <Card className="shadow-medium">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <CardTitle>AI Assistant - {module}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
