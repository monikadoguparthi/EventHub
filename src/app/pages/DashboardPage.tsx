import { useState } from 'react';
import { Calendar, Clock, MapPin, IndianRupee, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { mockEvents } from '../data/mockData';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

// Mock registration data
const mockRegistrations = [
  {
    id: '1',
    eventId: '1',
    status: 'verified' as const,
    registeredAt: '2026-02-10',
  },
  {
    id: '2',
    eventId: '2',
    status: 'pending' as const,
    registeredAt: '2026-02-15',
  },
  {
    id: '3',
    eventId: '5',
    status: 'verified' as const,
    registeredAt: '2026-02-12',
  },
];

const mockSavedEvents = ['3', '4', '7'];

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState('registered');

  const registeredEvents = mockRegistrations.map(reg => ({
    ...reg,
    event: mockEvents.find(e => e.id === reg.eventId)!,
  }));

  const upcomingEvents = registeredEvents.filter(
    reg => new Date(reg.event.date) > new Date() && reg.status === 'verified'
  );

  const savedEvents = mockEvents.filter(e => mockSavedEvents.includes(e.id));

  const getStatusBadge = (status: 'verified' | 'pending' | 'rejected') => {
    const configs = {
      verified: {
        icon: <CheckCircle className="w-4 h-4" />,
        className: 'bg-green-100 text-green-700 border-green-200',
        label: 'Verified',
      },
      pending: {
        icon: <AlertCircle className="w-4 h-4" />,
        className: 'bg-amber-100 text-amber-700 border-amber-200',
        label: 'Pending Verification',
      },
      rejected: {
        icon: <XCircle className="w-4 h-4" />,
        className: 'bg-red-100 text-red-700 border-red-200',
        label: 'Rejected',
      },
    };

    const config = configs[status];
    return (
      <Badge variant="outline" className={`flex items-center gap-1 ${config.className}`}>
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const RegistrationCard = ({ registration }: { registration: typeof registeredEvents[0] }) => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all">
      <div className="flex flex-col md:flex-row">
        {/* Event Image */}
        <div className="md:w-48 h-48 md:h-auto bg-gradient-to-br from-[#2563EB] to-[#DBEAFE] flex-shrink-0">
          <ImageWithFallback
            src={registration.event.image}
            alt={registration.event.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Event Details */}
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-lg text-[#1F2937] flex-1">
              {registration.event.name}
            </h3>
            {getStatusBadge(registration.status)}
          </div>

          <p className="text-[#6B7280] text-sm mb-4">{registration.event.collegeName}</p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-[#6B7280]">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(registration.event.date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#6B7280]">
              <Clock className="w-4 h-4" />
              <span>{registration.event.time}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#6B7280]">
              <MapPin className="w-4 h-4" />
              <span>{registration.event.location}</span>
            </div>

            {registration.event.price > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <IndianRupee className="w-4 h-4 text-[#2563EB]" />
                <span className="font-semibold text-[#2563EB]">₹{registration.event.price}</span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-[#6B7280]">
              Registered on {new Date(registration.registeredAt).toLocaleDateString('en-IN')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const SavedEventCard = ({ event }: { event: typeof mockEvents[0] }) => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all">
      <div className="h-40 bg-gradient-to-br from-[#2563EB] to-[#DBEAFE]">
        <ImageWithFallback
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-[#1F2937] mb-2 line-clamp-2">
          {event.name}
        </h3>
        <p className="text-[#6B7280] text-sm mb-3">{event.collegeName}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-[#6B7280]">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(event.date).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
              })}
            </span>
          </div>
          {event.price === 0 ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Free
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-blue-50 text-[#2563EB] border-blue-200">
              ₹{event.price}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1F2937] mb-2">My Dashboard</h1>
          <p className="text-[#6B7280]">Manage your event registrations and saved events</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="registered">All Registrations</TabsTrigger>
            <TabsTrigger value="saved">Saved Events</TabsTrigger>
          </TabsList>

          {/* Upcoming Events Tab */}
          <TabsContent value="upcoming">
            {upcomingEvents.length > 0 ? (
              <div className="space-y-6">
                {upcomingEvents.map(reg => (
                  <RegistrationCard key={reg.id} registration={reg} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center">
                <Calendar className="w-16 h-16 text-[#DBEAFE] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#1F2937] mb-2">
                  No Upcoming Events
                </h3>
                <p className="text-[#6B7280]">
                  You don't have any upcoming verified events. Register for events to see them here.
                </p>
              </div>
            )}
          </TabsContent>

          {/* All Registrations Tab */}
          <TabsContent value="registered">
            {registeredEvents.length > 0 ? (
              <div className="space-y-6">
                {registeredEvents.map(reg => (
                  <RegistrationCard key={reg.id} registration={reg} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center">
                <Calendar className="w-16 h-16 text-[#DBEAFE] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#1F2937] mb-2">
                  No Registrations Yet
                </h3>
                <p className="text-[#6B7280]">
                  You haven't registered for any events. Start exploring events near you!
                </p>
              </div>
            )}
          </TabsContent>

          {/* Saved Events Tab */}
          <TabsContent value="saved">
            {savedEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedEvents.map(event => (
                  <SavedEventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center">
                <Calendar className="w-16 h-16 text-[#DBEAFE] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#1F2937] mb-2">
                  No Saved Events
                </h3>
                <p className="text-[#6B7280]">
                  Save events you're interested in to access them quickly later.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
