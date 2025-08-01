import React, { useState, useEffect } from 'react';
import { FaHeart, FaCalendarAlt, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaYoutube, FaEnvelope } from 'react-icons/fa';
import { IoMdDownload } from 'react-icons/io';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

// Helper to format countdown
const calculateTimeLeft = (): TimeLeft => {
  const weddingDate = new Date('2026-01-23T00:00:00');
  const now = new Date();
  const difference = weddingDate.getTime() - now.getTime();

  let timeLeft: TimeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

// Section component for scroll animation
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
      className={`${className || ''}`} /* Removed inline padding, now handled by global section style */
      style={style}
    >
      {children}
    </motion.section>
  );
};

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isNavSticky, setIsNavSticky] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsNavSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const countdownComponents = Object.keys(timeLeft).map((interval) => {
    const value = timeLeft[interval as keyof TimeLeft];
    if (value === undefined) {
      return null;
    }
    return (
      <span key={interval} className="text-4xl md:text-6xl font-bold mx-2 text-gold-600">
        {value} {interval}{" "}
      </span>
    );
  });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-serif text-cream-900 bg-cream-50">
      {/* Sticky Navigation Bar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isNavSticky ? 'bg-maroon-800 shadow-lg py-3' : 'bg-transparent py-5'}`}>
        <ul className="flex justify-center space-x-4 md:space-x-8 text-lg md:text-xl text-cream-100">
          {['home', 'our-story', 'events', 'save-the-date', 'rsvp', 'guestbook', 'gallery', 'checklist', 'contact'].map((section) => (
            <li key={section}>
              <button onClick={() => scrollToSection(section)} className="hover:text-gold-400 transition-colors duration-300 capitalize">
                {section.replace('-', ' ')}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Home Page */}
      <Section id="home" className="relative h-screen bg-cover bg-center flex flex-col items-center justify-center text-center text-cream-100" style={{ backgroundImage: 'url(https://via.placeholder.com/1920x1080/8B0000/FFFFFF?text=Wedding+Background)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-8xl font-bold z-10 mb-4"
        >
          Himanshu <FaHeart className="inline-block text-red-500" /> Ishika
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-2xl md:text-4xl z-10 mb-8"
        >
          Are Getting Married!
        </motion.p>
        <div className="z-10">
          {countdownComponents.length ? countdownComponents : <span className="text-4xl md:text-6xl font-bold text-gold-600">The Big Day is Here!</span>}
        </div>
      </Section>

      {/* Our Story Section */}
      <Section id="our-story" className="bg-cream-100 text-maroon-900">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-12 text-maroon-800">Our Journey Together</h2>
          <div className="relative wrap overflow-hidden p-10 h-full">
            <div className="border-2-2 absolute border-opacity-20 border-maroon-700 h-full border" style={{ left: '50%' }}></div>
            {/* Timeline Item 1 */}
            <div className="mb-8 flex justify-between items-center w-full right-timeline">
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-maroon-800 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto font-semibold text-lg text-white">1</h1>
              </div>
              <div className="order-1 bg-white rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-gold-600 text-xl">How We Met</h3>
                <p className="text-sm leading-snug tracking-wide text-maroon-700 text-opacity-100">
                  It all started with a serendipitous encounter at a mutual friend's party. Little did we know, that evening would change our lives forever.
                </p>
                <img src="https://via.placeholder.com/300x200/D4AF37/FFFFFF?text=How+We+Met" alt="How We Met" className="mt-4 rounded-lg shadow-md" />
              </div>
            </div>
            {/* Timeline Item 2 */}
            <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-maroon-800 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto font-semibold text-lg text-white">2</h1>
              </div>
              <div className="order-1 bg-white rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-gold-600 text-xl">First Trip Together</h3>
                <p className="text-sm leading-snug tracking-wide text-maroon-700 text-opacity-100">
                  Our first adventure to the mountains solidified our bond. We discovered our shared love for travel and breathtaking views.
                </p>
                <img src="https://via.placeholder.com/300x200/D4AF37/FFFFFF?text=First+Trip" alt="First Trip" className="mt-4 rounded-lg shadow-md" />
              </div>
            </div>
            {/* Timeline Item 3 */}
            <div className="mb-8 flex justify-between items-center w-full right-timeline">
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-maroon-800 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto font-semibold text-lg text-white">3</h1>
              </div>
              <div className="order-1 bg-white rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-gold-600 text-xl">The Proposal</h3>
                <p className="text-sm leading-snug tracking-wide text-maroon-700 text-opacity-100">
                  Under a sky full of stars, the question was popped! A moment we'll cherish forever.
                </p>
                <img src="https://via.placeholder.com/300x200/D4AF37/FFFFFF?text=The+Proposal" alt="The Proposal" className="mt-4 rounded-lg shadow-md" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Event Schedule Section */}
      <Section id="events" className="bg-maroon-900 text-cream-100">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-12 text-gold-400">Our Wedding Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Event Card 1 */}
            <div className="bg-white text-maroon-900 rounded-lg shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-3xl font-bold mb-2 text-maroon-800">Haldi Ceremony</h3>
              <p className="text-lg mb-2"><FaCalendarAlt className="inline-block mr-2 text-gold-600" />21 January 2026, 10:00 AM</p>
              <p className="text-lg mb-4"><FaMapMarkerAlt className="inline-block mr-2 text-gold-600" /><a href="https://maps.app.goo.gl/your-haldi-venue" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">The Sunshine Resort</a></p>
              <p className="text-md text-gray-700">Dress Code: Yellow & White Festive</p>
            </div>
            {/* Event Card 2 */}
            <div className="bg-white text-maroon-900 rounded-lg shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-3xl font-bold mb-2 text-maroon-800">Sangeet Night</h3>
              <p className="text-lg mb-2"><FaCalendarAlt className="inline-block mr-2 text-gold-600" />21 January 2026, 07:00 PM</p>
              <p className="text-lg mb-4"><FaMapMarkerAlt className="inline-block mr-2 text-gold-600" /><a href="https://maps.app.goo.gl/your-sangeet-venue" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Grand Ballroom, City Palace</a></p>
              <p className="text-md text-gray-700">Dress Code: Glamorous Indian Ethnic</p>
            </div>
            {/* Event Card 3 */}
            <div className="bg-white text-maroon-900 rounded-lg shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-3xl font-bold mb-2 text-maroon-800">Mehndi Ceremony</h3>
              <p className="text-lg mb-2"><FaCalendarAlt className="inline-block mr-2 text-gold-600" />Date & Time: TBD</p>
              <p className="text-lg mb-4"><FaMapMarkerAlt className="inline-block mr-2 text-gold-600" /><a href="https://maps.app.goo.gl/your-mehndi-venue" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">The Garden Villa</a></p>
              <p className="text-md text-gray-700">Dress Code: Vibrant Casual</p>
            </div>
            {/* Event Card 4 */}
            <div className="bg-white text-maroon-900 rounded-lg shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-3xl font-bold mb-2 text-maroon-800">The Grand Wedding</h3>
              <p className="text-lg mb-2"><FaCalendarAlt className="inline-block mr-2 text-gold-600" />23 January 2026, 09:00 AM</p>
              <p className="text-lg mb-4"><FaMapMarkerAlt className="inline-block mr-2 text-gold-600" /><a href="https://maps.app.goo.gl/your-wedding-venue" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">The Royal Palace Grounds</a></p>
              <p className="text-md text-gray-700">Dress Code: Traditional Indian Formal</p>
            </div>
            {/* Event Card 5 */}
            <div className="bg-white text-maroon-900 rounded-lg shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-3xl font-bold mb-2 text-maroon-800">Reception Gala</h3>
              <p className="text-lg mb-2"><FaCalendarAlt className="inline-block mr-2 text-gold-600" />25 January 2026, 07:00 PM</p>
              <p className="text-lg mb-4"><FaMapMarkerAlt className="inline-block mr-2 text-gold-600" /><a href="https://maps.app.goo.gl/your-reception-venue" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">The Starlight Convention Center</a></p>
              <p className="text-md text-gray-700">Dress Code: Elegant Western/Indian</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Save-the-Date Postcard Section */}
      <Section id="save-the-date" className="bg-cream-100 text-maroon-900">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-12 text-maroon-800">Save The Date!</h2>
          <div className="relative w-80 h-52 mx-auto perspective-1000">
            <motion.div
              className="absolute w-full h-full preserve-3d"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 360 }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
            >
              <div className="absolute w-full h-full backface-hidden bg-gold-400 rounded-lg shadow-xl flex items-center justify-center text-maroon-900 text-3xl font-bold">
                Coming Soon!
              </div>
              <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-maroon-800 rounded-lg shadow-xl flex flex-col items-center justify-center text-cream-100 p-4">
                <p className="text-2xl mb-4">Himanshu & Ishika</p>
                <p className="text-xl mb-4">23 January 2026</p>
                <button
                  onClick={() => window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text=Himanshu+%26+Ishika%27s+Wedding&dates=20260123T000000Z/20260123T000000Z&details=Join+us+to+celebrate+the+wedding+of+Himanshu+and+Ishika!&location=Your+Wedding+Venue', '_blank')}
                  className="btn-secondary flex items-center"
                >
                  <FaCalendarAlt className="mr-2" /> Add to Calendar
                </button>
              </div>
            </motion.div>
          </div>
          <button className="btn-primary flex items-center mx-auto">
            <IoMdDownload className="mr-2" /> Download Postcard
          </button>
        </div>
      </Section>

      {/* Shaadi Checklist Magnet Section */}
      <Section id="checklist" className="bg-maroon-900 text-cream-100">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-12 text-gold-400">Your Shaadi Checklist!</h2>
          <div className="bg-white text-maroon-900 rounded-lg shadow-xl p-8 max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold-100 to-cream-200 opacity-75 rounded-lg"></div>
            <div className="relative z-10">
              <p className="text-2xl font-bold mb-6 text-maroon-800">Don't Forget To:</p>
              <ul className="text-left text-xl space-y-3">
                <li className="flex items-center"><span className="text-gold-600 mr-3">✔</span> Bring your dance moves</li>
                <li className="flex items-center"><span className="text-gold-600 mr-3">✔</span> Steal the groom’s shoes (if you dare!)</li>
                <li className="flex items-center"><span className="text-gold-600 mr-3">✔</span> Cry happy tears (it's okay, we all will!)</li>
                <li className="flex items-center"><span className="text-gold-600 mr-3">✔</span> Take 100+ selfies (and tag us!)</li>
                <li className="flex items-center"><span className="text-gold-600 mr-3">✔</span> Bless the couple with all your heart</li>
              </ul>
              <button className="btn-primary flex items-center mx-auto">
                <IoMdDownload className="mr-2" /> Download Magnet
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* RSVP Section */}
      <Section id="rsvp" className="bg-cream-100 text-maroon-900">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-12 text-maroon-800">RSVP for the Big Day!</h2>
          <form className="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto">
            <div className="mb-6 text-left">
              <label htmlFor="fullName" className="block text-maroon-800 text-xl font-bold mb-2">Full Name</label>
              <input type="text" id="fullName" name="fullName" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Your Full Name" required />
            </div>
            <div className="mb-6 text-left">
              <label htmlFor="numGuests" className="block text-maroon-800 text-xl font-bold mb-2">Number of Guests (including yourself)</label>
              <input type="number" id="numGuests" name="numGuests" min="1" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="e.g., 2" required />
            </div>
            <div className="mb-6 text-left">
              <label htmlFor="emailPhone" className="block text-maroon-800 text-xl font-bold mb-2">Email or Phone</label>
              <input type="text" id="emailPhone" name="emailPhone" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="your@example.com or +91-9876543210" required />
            </div>
            <div className="mb-6 text-left">
              <label htmlFor="message" className="block text-maroon-800 text-xl font-bold mb-2">Personal Message for the Couple</label>
              <textarea id="message" name="message" rows={5} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Share your wishes or a memory!"></textarea>
            </div>
            <div className="mb-6 text-left">
              <label htmlFor="photoUpload" className="block text-maroon-800 text-xl font-bold mb-2">Upload a Selfie or Memory Photo (Optional)</label>
              <input type="file" id="photoUpload" name="photoUpload" accept="image/*" className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold-500 file:text-maroon-900 hover:file:bg-gold-600" />
            </div>
            <button type="submit" className="btn-primary">
              Send RSVP!
            </button>
          </form>
        </div>
      </Section>

      {/* Guestbook Section */}
      <Section id="guestbook" className="bg-maroon-900 text-cream-100">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-12 text-gold-400">Guestbook: Advice for Our Future</h2>
          <form className="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto mb-12">
            <div className="mb-6 text-left">
              <label htmlFor="guestName" className="block text-maroon-800 text-xl font-bold mb-2">Your Name</label>
              <input type="text" id="guestName" name="guestName" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Your Name" required />
            </div>
            <div className="mb-6 text-left">
              <label htmlFor="relation" className="block text-maroon-800 text-xl font-bold mb-2">Your Relation to Us</label>
              <input type="text" id="relation" name="relation" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="e.g., Friend, Family, Colleague" />
            </div>
            <div className="mb-6 text-left">
              <label htmlFor="advice" className="block text-maroon-800 text-xl font-bold mb-2">One Piece of Marriage Advice</label>
              <textarea id="advice" name="advice" rows={5} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Share your wisdom for a happy married life!"></textarea>
            </div>
            <button type="submit" className="btn-primary">
              Submit Advice
            </button>
          </form>

          {/* Displayed Advice (Optional) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white text-maroon-900 rounded-lg shadow-md p-6">
              <p className="italic mb-3">"Always keep the humor alive, even on tough days!"</p>
              <p className="font-semibold">- Auntie Meena</p>
            </div>
            <div className="bg-white text-maroon-900 rounded-lg shadow-md p-6">
              <p className="italic mb-3">"Communication is key. Talk about everything, big or small."</p>
              <p className="font-semibold">- Uncle Raj</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Gallery Section */}
      <Section id="gallery" className="bg-cream-100 text-maroon-900">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-12 text-maroon-800">Our Cherished Moments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Image Placeholders */}
            <img src="https://via.placeholder.com/400x300/D4AF37/FFFFFF?text=Pre-Wedding+1" alt="Pre-Wedding" className="w-full h-auto rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-300" />
            <img src="https://via.placeholder.com/400x300/D4AF37/FFFFFF?text=Haldi+1" alt="Haldi" className="w-full h-auto rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-300" />
            <img src="https://via.placeholder.com/400x300/D4AF37/FFFFFF?text=Wedding+1" alt="Wedding" className="w-full h-auto rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-300" />
            <img src="https://via.placeholder.com/400x300/D4AF37/FFFFFF?text=Pre-Wedding+2" alt="Pre-Wedding" className="w-full h-auto rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-300" />
            <img src="https://via.placeholder.com/400x300/D4AF37/FFFFFF?text=Haldi+2" alt="Haldi" className="w-full h-auto rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-300" />
            <img src="https://via.placeholder.com/400x300/D4AF37/FFFFFF?text=Wedding+2" alt="Wedding" className="w-full h-auto rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-300" />
          </div>
        </div>
      </Section>

      {/* QR Code Section */}
      <Section id="qr-code" className="bg-maroon-900 text-cream-100">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-12 text-gold-400">Scan Our Wedding Website!</h2>
          <img src="https://via.placeholder.com/300x300/FFFFFF/000000?text=QR+Code+Placeholder" alt="QR Code" className="mx-auto mb-6 rounded-lg shadow-lg" />
          <p className="text-2xl mb-6">Scan this on your wedding card for all the details!</p>
          <button className="btn-secondary flex items-center mx-auto">
            <IoMdDownload className="mr-2" /> Download QR Code
          </button>
        </div>
      </Section>

      {/* Contact / Social Section */}
      <Section id="contact" className="bg-cream-100 text-maroon-900">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-12 text-maroon-800">Get In Touch!</h2>
          <div className="flex justify-center space-x-8 mb-8">
            <a href="https://wa.me/yourwhatsappnumber" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600 transition-colors duration-300">
              <FaWhatsapp className="text-6xl" />
            </a>
            <a href="https://instagram.com/yourinstagram" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600 transition-colors duration-300">
              <FaInstagram className="text-6xl" />
            </a>
            <a href="https://youtube.com/youryoutubechannel" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 transition-colors duration-300">
              <FaYoutube className="text-6xl" />
            </a>
            <a href="mailto:your.email@example.com" className="text-blue-600 hover:text-blue-700 transition-colors duration-300">
              <FaEnvelope className="text-6xl" />
            </a>
          </div>
          <p className="text-xl mb-8">
            <FaMapMarkerAlt className="inline-block mr-2 text-gold-600" />
            <a href="https://maps.app.goo.gl/your-wedding-venue" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Wedding Venue on Map</a>
          </p>
          {/* Optional: Embedded Map */}
          {/* <div className="mt-8 w-full max-w-3xl mx-auto h-96 bg-gray-200 rounded-lg shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1500000000002!2d-73.987654!3d40.758000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQwJzQyLjAiTiA3M8KwNTknMTUuMCJX!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div> */}
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-maroon-900 text-cream-100 py-8 text-center text-lg">
        <p className="mb-2">Made with <FaHeart className="inline-block text-red-500" /> by Himanshu & Ishika</p>
        <p className="mb-2">Wedding of the Decade 2026</p>
        {/* Optional: GitHub Repo Link */}
        <p>
          <a href="https://github.com/himanshudwivedi1224/WeddingPortal" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:underline">
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
