import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoMdDownload } from 'react-icons/io';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SaveTheDate: React.FC = () => {
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
    <Section id="save-the-date" className="bg-background-light text-text-dark py-16"> {/* Increased padding */}
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-script font-normal mb-12 text-primary">Save The Date!</h2>
        <div className="relative w-80 h-52 mx-auto">
          <motion.div
            className="absolute w-full h-full"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 360 }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
          >
            <div className="absolute w-full h-full backface-hidden bg-accent rounded-lg shadow-xl flex items-center justify-center text-text-dark text-3xl font-script font-normal">
              Coming Soon!
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-primary rounded-lg shadow-xl flex flex-col items-center justify-center text-text-light p-4">
              <p className="text-2xl mb-4 font-sans">Himanshu & Ishika</p>
              <p className="text-xl mb-4 font-sans">23 January 2026</p>
              <button
                onClick={() => window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text=Himanshu+%26+Ishika%27s+Wedding&dates=20260123T000000Z/20260123T000000Z&details=Join+us+to+celebrate+the+wedding+of+Himanshu+and+Ishika!&location=Your+Wedding+Venue', '_blank')}
                className="btn-secondary flex items-center"
              >
                <FaCalendarAlt className="mr-2" /> Add to Calendar
              </button>
            </div>
          </motion.div>
        </div>
        <button className="btn-primary flex items-center mx-auto mt-8"> {/* Increased margin-top */}
          <IoMdDownload className="mr-2" /> Download Postcard
        </button>
      </div>
    </Section>
  );
};

export default SaveTheDate;
