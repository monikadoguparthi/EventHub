import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Calendar, MapPin, Search, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1E40AF] via-[#2563EB] to-[#3B82F6] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Discover College Events
              <br />
              <span className="text-blue-200">Near You</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Find tech workshops, hackathons, cultural fests, and more happening at colleges within your radius. Never miss an opportunity to learn and network!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/events">
                <Button
                  size="lg"
                  className="bg-white text-[#2563EB] hover:bg-blue-50 text-lg px-8 py-6 rounded-xl"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Explore Events
                </Button>
              </Link>
              
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl"
              >
                Login with Google
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#F8FAFC"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#1F2937] mb-4">
              Why Choose EventHub?
            </h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              The smartest way for students to discover and participate in college events
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin className="w-8 h-8" />,
                title: 'Radius-Based Discovery',
                description: 'Find events happening at colleges near you. Filter by distance (5km to 50km) and never miss nearby opportunities.',
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: 'Easy Registration',
                description: 'Simple multi-step registration with Google login. Quick payment verification and instant confirmation.',
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Track Your Events',
                description: 'Dashboard to manage all your registrations, view payment status, and access event updates in one place.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#3B82F6] rounded-xl flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#6B7280]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#2563EB] to-[#1E40AF] py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Exploring?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students discovering amazing events every day
          </p>
          <Link to="/events">
            <Button
              size="lg"
              className="bg-white text-[#2563EB] hover:bg-blue-50 text-lg px-10 py-6 rounded-xl"
            >
              Browse Events Now
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
