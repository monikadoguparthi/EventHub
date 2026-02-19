import { Link } from 'react-router';
import { Calendar, MapPin, IndianRupee } from 'lucide-react';
import { Event } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const categoryColors: Record<string, string> = {
    Tech: 'bg-[#2563EB] text-white',
    Cultural: 'bg-purple-500 text-white',
    Workshop: 'bg-green-500 text-white',
    Hackathon: 'bg-orange-500 text-white',
    Seminar: 'bg-blue-400 text-white',
    Sports: 'bg-red-500 text-white',
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Event Image */}
      <div className="h-48 bg-gradient-to-br from-[#2563EB] to-[#DBEAFE] relative overflow-hidden">
        <ImageWithFallback
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <Badge className={`absolute top-3 right-3 ${categoryColors[event.category]}`}>
          {event.category}
        </Badge>
      </div>

      {/* Event Details */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-[#1F2937] mb-2 line-clamp-2">
          {event.name}
        </h3>
        
        <p className="text-[#6B7280] text-sm mb-3">{event.collegeName}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
            <Calendar className="w-4 h-4" />
            <span>{new Date(event.date).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
            <MapPin className="w-4 h-4" />
            <span>{event.distance.toFixed(1)} km away</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {event.price === 0 ? (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Free
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-blue-50 text-[#2563EB] border-blue-200">
                <IndianRupee className="w-3 h-3 inline" />
                {event.price}
              </Badge>
            )}
          </div>

          <Link to={`/events/${event.id}`}>
            <Button className="bg-[#2563EB] hover:bg-[#1E40AF]">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
