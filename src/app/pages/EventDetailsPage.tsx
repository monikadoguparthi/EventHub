import { useParams, Link } from 'react-router';
import { Calendar, MapPin, Clock, IndianRupee, ArrowLeft, Building2 } from 'lucide-react';
import { mockEvents } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function EventDetailsPage() {
  const { id } = useParams();
  const event = mockEvents.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1F2937] mb-4">Event Not Found</h2>
          <Link to="/events">
            <Button className="bg-[#2563EB] hover:bg-[#1E40AF]">
              Back to Events
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryColors: Record<string, string> = {
    Tech: 'bg-[#2563EB] text-white',
    Cultural: 'bg-purple-500 text-white',
    Workshop: 'bg-green-500 text-white',
    Hackathon: 'bg-orange-500 text-white',
    Seminar: 'bg-blue-400 text-white',
    Sports: 'bg-red-500 text-white',
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Back Button */}
      <div className="bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/events" className="inline-flex items-center gap-2 text-[#6B7280] hover:text-[#1F2937]">
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Event Banner */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg mb-8">
          <div className="h-96 bg-gradient-to-br from-[#2563EB] to-[#DBEAFE] relative">
            <ImageWithFallback
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover"
            />
            <Badge className={`absolute top-6 right-6 ${categoryColors[event.category]} text-lg px-4 py-2`}>
              {event.category}
            </Badge>
          </div>

          <div className="p-8">
            {/* Event Title & College */}
            <h1 className="text-4xl font-bold text-[#1F2937] mb-4">
              {event.name}
            </h1>
            
            <div className="flex items-center gap-2 text-[#6B7280] mb-8">
              <Building2 className="w-5 h-5" />
              <span className="text-lg">{event.collegeName}</span>
            </div>

            {/* Event Info Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-xl">
                <div className="w-10 h-10 bg-[#2563EB] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Date</p>
                  <p className="font-semibold text-[#1F2937]">
                    {new Date(event.date).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-xl">
                <div className="w-10 h-10 bg-[#2563EB] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Time</p>
                  <p className="font-semibold text-[#1F2937]">{event.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-xl">
                <div className="w-10 h-10 bg-[#2563EB] rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Location</p>
                  <p className="font-semibold text-[#1F2937]">{event.location}</p>
                  <p className="text-sm text-[#6B7280] mt-1">{event.distance.toFixed(1)} km away</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-xl">
                <div className="w-10 h-10 bg-[#2563EB] rounded-lg flex items-center justify-center flex-shrink-0">
                  <IndianRupee className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Registration Fee</p>
                  {event.price === 0 ? (
                    <p className="font-semibold text-green-600 text-lg">FREE</p>
                  ) : (
                    <p className="font-semibold text-[#2563EB] text-lg">₹{event.price}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#1F2937] mb-4">About This Event</h2>
              <p className="text-[#6B7280] text-lg leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Map Preview Placeholder */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#1F2937] mb-4">Location Map</h2>
              <div className="w-full h-64 bg-gradient-to-br from-[#DBEAFE] to-[#F8FAFC] rounded-xl flex items-center justify-center border border-border">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-[#2563EB] mx-auto mb-2" />
                  <p className="text-[#6B7280]">Map preview would appear here</p>
                </div>
              </div>
            </div>

            {/* Register Button */}
            <div className="flex justify-center">
              <Link to={`/register/${event.id}`} className="w-full md:w-auto">
                <Button
                  size="lg"
                  className="w-full md:min-w-[300px] bg-[#2563EB] hover:bg-[#1E40AF] text-lg py-6 rounded-xl"
                >
                  Register Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
