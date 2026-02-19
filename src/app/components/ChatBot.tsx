import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { mockEvents } from '../data/mockData';
import { EventCategory } from '../types';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! I'm your EventHub assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const detectIntent = (message: string): { category?: EventCategory; priceFilter?: 'free' | 'paid'; dateFilter?: 'upcoming' } => {
    const lowerMsg = message.toLowerCase();
    
    // Detect category intent
    let category: EventCategory | undefined;
    if (lowerMsg.includes('tech') || lowerMsg.includes('coding') || lowerMsg.includes('ai') || 
        lowerMsg.includes('ml') || lowerMsg.includes('developer') || lowerMsg.includes('programming')) {
      category = 'Tech';
    } else if (lowerMsg.includes('hackathon')) {
      category = 'Hackathon';
    } else if (lowerMsg.includes('workshop')) {
      category = 'Workshop';
    } else if (lowerMsg.includes('cultural') || lowerMsg.includes('fest') || lowerMsg.includes('music') || lowerMsg.includes('dance')) {
      category = 'Cultural';
    } else if (lowerMsg.includes('seminar') || lowerMsg.includes('talk') || lowerMsg.includes('conference')) {
      category = 'Seminar';
    } else if (lowerMsg.includes('sport')) {
      category = 'Sports';
    }

    // Detect price filter
    let priceFilter: 'free' | 'paid' | undefined;
    if (lowerMsg.includes('free')) {
      priceFilter = 'free';
    } else if (lowerMsg.includes('paid')) {
      priceFilter = 'paid';
    }

    // Detect date filter
    let dateFilter: 'upcoming' | undefined;
    if (lowerMsg.includes('upcoming') || lowerMsg.includes('soon') || lowerMsg.includes('next')) {
      dateFilter = 'upcoming';
    }

    return { category, priceFilter, dateFilter };
  };

  const getFilteredEvents = (intent: ReturnType<typeof detectIntent>) => {
    let filtered = [...mockEvents];

    // Filter by category
    if (intent.category) {
      filtered = filtered.filter(e => e.category === intent.category);
    }

    // Filter by price
    if (intent.priceFilter === 'free') {
      filtered = filtered.filter(e => e.price === 0);
    } else if (intent.priceFilter === 'paid') {
      filtered = filtered.filter(e => e.price > 0);
    }

    // Filter by date (upcoming = next 30 days)
    if (intent.dateFilter === 'upcoming') {
      const today = new Date();
      const next30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(e => {
        const eventDate = new Date(e.date);
        return eventDate >= today && eventDate <= next30Days;
      });
    }

    // Sort by date (nearest first) and popularity
    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });

    return filtered.slice(0, 3); // Return top 3 results
  };

  const formatEventResponse = (events: typeof mockEvents, category?: EventCategory) => {
    if (events.length === 0) {
      return "I couldn't find any matching events near you right now. Would you like to explore upcoming events in other categories?";
    }

    const categoryName = category || 'matching';
    let response = `Here are some ${categoryName === 'matching' ? '' : categoryName.toLowerCase()} events near you:\n\n`;
    
    events.forEach((event, index) => {
      response += `${index + 1}. ${event.name}\n`;
      response += `📍 ${event.location}\n`;
      response += `📅 ${new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}\n`;
      response += `💰 ${event.price === 0 ? 'Free' : `₹${event.price}`}\n`;
      response += `🏫 ${event.collegeName}\n`;
      response += `🔗 Registration Open\n`;
      if (index < events.length - 1) response += '\n';
    });

    return response;
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase();

    // Greeting detection
    if (lowerMsg.match(/^(hi|hello|hey|hola)/)) {
      return "Hello! 👋 I can help you discover college events near you. Try asking me about:\n• Tech events\n• Hackathons\n• Cultural fests\n• Free events\n• Upcoming workshops";
    }

    // Help detection
    if (lowerMsg.includes('help')) {
      return "I can help you find events! Just ask me about:\n✨ Event categories (tech, cultural, sports, etc.)\n✨ Free or paid events\n✨ Upcoming events\n✨ Specific types like hackathons or workshops\n\nExample: 'Show me upcoming tech events'";
    }

    // Detect intent and get matching events
    const intent = detectIntent(userMessage);
    
    // Check if user is asking about events
    if (lowerMsg.includes('event') || lowerMsg.includes('show') || intent.category || intent.priceFilter) {
      const filteredEvents = getFilteredEvents(intent);
      return formatEventResponse(filteredEvents, intent.category);
    }

    // If asking about specific event details
    if (lowerMsg.includes('detail') || lowerMsg.includes('more info') || lowerMsg.includes('tell me about')) {
      return "I'd love to help! Which event would you like to know more about? You can ask me to 'show tech events' or 'show hackathons' to see available events.";
    }

    // If asking about registration
    if (lowerMsg.includes('register') || lowerMsg.includes('sign up') || lowerMsg.includes('how to join')) {
      return "To register for an event:\n1. Browse events on our Events page\n2. Click on any event to see details\n3. Click 'Register Now'\n4. Fill in your details\n5. Complete payment (if required)\n\nWould you like me to show you some events?";
    }

    // Default intelligent response
    return "I'm here to help you discover college events! You can ask me about:\n• 'Tech events near me'\n• 'Free hackathons'\n• 'Upcoming cultural fests'\n• 'Workshop events'\n\nWhat are you looking for?";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    // Generate intelligent bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: generateBotResponse(inputValue),
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 800);

    setInputValue('');
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#2563EB] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#1E40AF] transition-colors z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-border"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white p-4 rounded-t-2xl">
              <h3 className="font-semibold">EventHub Assistant</h3>
              <p className="text-sm text-blue-100">AI-powered event discovery</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 whitespace-pre-line ${
                      message.sender === 'user'
                        ? 'bg-[#DBEAFE] text-[#1F2937]'
                        : 'bg-white border border-[#2563EB] text-[#1F2937]'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me about events..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  className="bg-[#2563EB] hover:bg-[#1E40AF]"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}