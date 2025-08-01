import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const EventSchedule: React.FC = () => {
  const Section: React.FC<{ id: string; children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ id, children, className, style }) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <motion.section
        id={id}
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className={`${className || ''} leading-relaxed`}
        style={style}
      >
        {children}
      </motion.section>
    );
  };

  return (
    <Section id="events" className="bg-background-dark text-text-light py-16"> {/* Increased padding */}
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-script font-normal mb-12 text-rose-gold">Our Wedding Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"> {/* Increased gap */}
          {/* Event Card 1 */}
          <div className="bg-white text-text-dark rounded-lg shadow-xl p-8 transform hover:scale-105 transition-transform duration-300"> {/* Increased padding */}
            <h3 className="text-3xl font-script font-normal mb-2 text-primary">Haldi Ceremony</h3>
            <p className="text-lg mb-2 font-sans"><FaCalendarAlt className="inline-block mr-2 text-rose-gold" />21 January 2026, 10:00 AM</p>
            <p className="text-lg mb-4 font-sans"><FaMapMarkerAlt className="inline-block mr-2 text-rose-gold" /><a href="https://maps.app.goo.gl/your-haldi-venue" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">The Sunshine Resort</a></p>
            <p className="text-md text-gray-700 font-sans">Dress Code: Yellow & White Festive</p>
          </div>
          {/* Event Card 2 */}
          <div className="bg-white text-text-dark rounded-lg shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-3xl font-script font-normal mb-2 text-primary">Sangeet Night</h3>
            <p className="text-lg mb-2 font-sans"><FaCalendarAlt className="inline-block mr-2 text-rose-gold" />21 January 2026, 07:00 PM</p>
            <p className="text-lg mb-4 font-sans"><FaMapMarkerAlt className="inline-block mr-2 text-rose-gold" /><a href="https://maps.app.goo.gl/your-sangeet-venue" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Grand Ballroom, City Palace</a></p>
            <p className="text-md text-gray-700 font-sans">Dress Code: Glamorous Indian Ethnic</p>
          </div>
          {/* Event Card 3 */}
          <div className="bg-white text-text-dark rounded-lg shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-3xl font-script font-normal mb-2 text-primary">Mehndi Ceremony</h3>
            <p className="text-lg mb-2 font-sans"><FaCalendarAlt className="inline-block mr-2 text-rose-gold" />Date & Time: TBD</p>
            <p className="text-lg mb-4 font-sans"><FaMapMarkerAlt className="inline-block mr-2 text-rose-gold" /><a href="https://maps.app.goo.gl/your-mehndi-venue" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">The Garden Villa</a></p>
            <p className="text-md text-gray-700 font-sans">Dress Code: Vibrant Casual</p>
          </div>
          {/* Event Card 4 */}
          <div className="bg-white text-text-dark rounded-lg shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-3xl font-script font-normal mb-2 text-primary">The Grand Wedding</h3>
            <p className="text-lg mb-2 font-sans"><FaCalendarAlt className="inline-block mr-2 text-rose-gold" />23 January 2026, 09:00 AM</p>
            <p className="text-lg mb-4 font-sans"><FaMapMarkerAlt className="inline-block mr-2 text-rose-gold" /><a href="https://maps.app.goo.gl/your-wedding-venue" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">The Royal Palace Grounds</a></p>
            <p className="text-md text-gray-700 font-sans">Dress Code: Traditional Indian Formal</p>
          </div>
          {/* Event Card 5 */}
          <div className="bg-white text-text-dark rounded-lg shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-3xl font-script font-normal mb-2 text-primary">Reception Gala</h3>
            <p className="text-lg mb-2 font-sans"><FaCalendarAlt className="inline-block mr-2 text-rose-gold" />25 January 2026, 07:00 PM</p>
            <p className="text-lg mb-4 font-sans"><FaMapMarkerAlt className="inline-block mr-2 text-rose-gold" /><a href="https://maps.app.goo.gl/your-reception-venue" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">The Starlight Convention Center</a></p>
            <p className="text-md text-gray-700 font-sans">Dress Code: Elegant Western/Indian</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default EventSchedule;
