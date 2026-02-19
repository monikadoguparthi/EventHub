import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { ArrowLeft, ArrowRight, Check, Upload } from 'lucide-react';
import { mockEvents } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Progress } from '../components/ui/progress';
import { toast } from 'sonner';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal'
];

export function RegistrationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = mockEvents.find(e => e.id === id);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@gmail.com',
    college: '',
    course: '',
    year: '',
    phone: '',
    city: '',
    state: '',
    transactionId: '',
    paymentScreenshot: null as File | null,
  });

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1F2937] mb-4">Event Not Found</h2>
          <Link to="/events">
            <Button className="bg-[#2563EB] hover:bg-[#1E40AF]">Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalSteps = event.price > 0 ? 3 : 2;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step === 1) {
      if (!formData.college || !formData.course || !formData.year || !formData.phone || !formData.city || !formData.state) {
        toast.error('Please fill in all required fields');
        return;
      }
    }
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    if (event.price > 0 && (!formData.transactionId || !formData.paymentScreenshot)) {
      toast.error('Please upload payment proof and enter transaction ID');
      return;
    }
    toast.success('Registration submitted successfully!');
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, paymentScreenshot: e.target.files[0] });
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link to={`/events/${event.id}`} className="inline-flex items-center gap-2 text-[#6B7280] hover:text-[#1F2937] mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Event Details
        </Link>

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white p-6">
            <h1 className="text-2xl font-bold mb-2">Event Registration</h1>
            <p className="text-blue-100">{event.name}</p>
          </div>

          {/* Progress Bar */}
          <div className="px-6 pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-[#1F2937]">
                Step {step} of {totalSteps}
              </span>
              <span className="text-sm text-[#6B7280]">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="mb-6" />
          </div>

          {/* Form Steps */}
          <div className="p-6">
            {/* Step 1: Personal Details */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#1F2937] mb-4">Personal Details</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      disabled
                      className="bg-[#F8FAFC]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      disabled
                      className="bg-[#F8FAFC]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="college">College / University *</Label>
                    <Input
                      id="college"
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      placeholder="Enter your college name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="course">Course *</Label>
                    <Input
                      id="course"
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      placeholder="e.g., B.Tech CSE"
                    />
                  </div>

                  <div>
                    <Label htmlFor="year">Year *</Label>
                    <Select value={formData.year} onValueChange={(value) => setFormData({ ...formData, year: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1st Year</SelectItem>
                        <SelectItem value="2">2nd Year</SelectItem>
                        <SelectItem value="3">3rd Year</SelectItem>
                        <SelectItem value="4">4th Year</SelectItem>
                        <SelectItem value="pg">Post Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Enter your city"
                    />
                  </div>

                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDIAN_STATES.map(state => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Event-specific questions (can be customized) */}
            {step === 2 && event.price === 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#1F2937] mb-4">Additional Information</h2>
                
                <div className="bg-[#DBEAFE] border border-[#2563EB] rounded-xl p-6 text-center">
                  <Check className="w-16 h-16 text-[#2563EB] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#1F2937] mb-2">Almost Done!</h3>
                  <p className="text-[#6B7280]">
                    Click submit to complete your free registration for {event.name}
                  </p>
                </div>
              </div>
            )}

            {/* Step 2 for paid events: Event-specific questions */}
            {step === 2 && event.price > 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#1F2937] mb-4">Additional Information</h2>
                
                <div className="bg-[#F8FAFC] rounded-xl p-6">
                  <p className="text-[#6B7280] text-center">
                    No additional questions for this event. Click next to proceed to payment.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Payment (only for paid events) */}
            {step === 3 && event.price > 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#1F2937] mb-4">Payment Details</h2>
                
                <div className="bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-xl p-6 text-white text-center mb-6">
                  <p className="text-sm text-blue-100 mb-2">Registration Fee</p>
                  <p className="text-4xl font-bold">₹{event.price}</p>
                </div>

                {/* UPI QR Code Placeholder */}
                <div className="bg-white border-2 border-[#2563EB] rounded-xl p-8">
                  <p className="text-center text-sm font-semibold text-[#1F2937] mb-4">
                    Scan QR Code to Pay via UPI
                  </p>
                  <div className="w-64 h-64 bg-gradient-to-br from-[#DBEAFE] to-white rounded-xl flex items-center justify-center mx-auto border-2 border-dashed border-[#2563EB]">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-[#2563EB] rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">QR</span>
                      </div>
                      <p className="text-[#6B7280] text-sm">UPI QR Code</p>
                    </div>
                  </div>
                  <p className="text-center text-xs text-[#6B7280] mt-4">
                    UPI ID: eventhub@paytm
                  </p>
                </div>

                {/* Payment Proof Upload */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="transaction">Transaction ID *</Label>
                    <Input
                      id="transaction"
                      value={formData.transactionId}
                      onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                      placeholder="Enter UPI transaction ID"
                    />
                  </div>

                  <div>
                    <Label htmlFor="screenshot">Upload Payment Screenshot *</Label>
                    <div className="mt-2">
                      <label
                        htmlFor="screenshot"
                        className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-[#F8FAFC] transition-colors"
                      >
                        <Upload className="w-5 h-5 text-[#6B7280]" />
                        <span className="text-sm text-[#6B7280]">
                          {formData.paymentScreenshot ? formData.paymentScreenshot.name : 'Click to upload screenshot'}
                        </span>
                      </label>
                      <input
                        id="screenshot"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-sm text-amber-800">
                    ⚠️ Your registration will be confirmed after payment verification (usually within 24 hours)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="px-6 pb-6 flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={step === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            {step < totalSteps ? (
              <Button
                onClick={handleNext}
                className="bg-[#2563EB] hover:bg-[#1E40AF] flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Submit Registration
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
