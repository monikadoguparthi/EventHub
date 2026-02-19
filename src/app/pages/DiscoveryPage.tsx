import { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { EventCard } from '../components/EventCard';
import { mockEvents } from '../data/mockData';
import { EventCategory } from '../types';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Checkbox } from '../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';

const categories: EventCategory[] = ['Tech', 'Cultural', 'Workshop', 'Hackathon', 'Seminar', 'Sports'];
const states = ['All States', 'Maharashtra', 'Delhi', 'Gujarat', 'Tamil Nadu', 'Rajasthan', 'West Bengal'];

export function DiscoveryPage() {
  const [radius, setRadius] = useState([20]);
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>([]);
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');

  const toggleCategory = (category: EventCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      // Radius filter
      if (event.distance > radius[0]) return false;

      // State filter
      if (selectedState !== 'All States' && event.state !== selectedState) return false;

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(event.category)) return false;

      // Price filter
      if (priceFilter === 'free' && event.price > 0) return false;
      if (priceFilter === 'paid' && event.price === 0) return false;

      return true;
    });
  }, [radius, selectedState, selectedCategories, priceFilter]);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Radius Slider */}
      <div>
        <label className="block text-sm font-semibold text-[#1F2937] mb-3">
          Radius: {radius[0]} km
        </label>
        <Slider
          value={radius}
          onValueChange={setRadius}
          min={5}
          max={50}
          step={5}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-[#6B7280] mt-2">
          <span>5 km</span>
          <span>50 km</span>
        </div>
      </div>

      {/* State Dropdown */}
      <div>
        <label className="block text-sm font-semibold text-[#1F2937] mb-3">
          State
        </label>
        <Select value={selectedState} onValueChange={setSelectedState}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {states.map(state => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category Checkboxes */}
      <div>
        <label className="block text-sm font-semibold text-[#1F2937] mb-3">
          Categories
        </label>
        <div className="space-y-3">
          {categories.map(category => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <label htmlFor={category} className="text-sm text-[#1F2937] cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <label className="block text-sm font-semibold text-[#1F2937] mb-3">
          Price
        </label>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="all-price"
              checked={priceFilter === 'all'}
              onCheckedChange={() => setPriceFilter('all')}
            />
            <label htmlFor="all-price" className="text-sm text-[#1F2937] cursor-pointer">
              All Events
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="free"
              checked={priceFilter === 'free'}
              onCheckedChange={() => setPriceFilter('free')}
            />
            <label htmlFor="free" className="text-sm text-[#1F2937] cursor-pointer">
              Free Only
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="paid"
              checked={priceFilter === 'paid'}
              onCheckedChange={() => setPriceFilter('paid')}
            />
            <label htmlFor="paid" className="text-sm text-[#1F2937] cursor-pointer">
              Paid Only
            </label>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setRadius([20]);
          setSelectedState('All States');
          setSelectedCategories([]);
          setPriceFilter('all');
        }}
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1F2937] mb-2">
            Discover Events
          </h1>
          <p className="text-[#6B7280]">
            Found {filteredEvents.length} events matching your criteria
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="w-5 h-5 text-[#2563EB]" />
                <h2 className="text-lg font-bold text-[#1F2937]">Filters</h2>
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="bg-[#2563EB] hover:bg-[#1E40AF] shadow-lg px-6">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[85vh]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6 overflow-y-auto h-[calc(85vh-80px)] pb-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Events Grid */}
          <main className="flex-1">
            {filteredEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-[#DBEAFE] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-10 h-10 text-[#2563EB]" />
                </div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-2">
                  No events found
                </h3>
                <p className="text-[#6B7280]">
                  Try adjusting your filters to see more results
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
