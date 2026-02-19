export type EventCategory = 'Tech' | 'Cultural' | 'Workshop' | 'Hackathon' | 'Seminar' | 'Sports';

export interface Event {
  id: string;
  name: string;
  collegeName: string;
  date: string;
  distance: number;
  price: number;
  category: EventCategory;
  image: string;
  description: string;
  location: string;
  state: string;
  time: string;
}

export interface Registration {
  eventId: string;
  event: Event;
  status: 'pending' | 'verified' | 'rejected';
  registeredAt: string;
  paymentScreenshot?: string;
  transactionId?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  college: string;
  course: string;
  year: string;
  phone: string;
  city: string;
  state: string;
}
