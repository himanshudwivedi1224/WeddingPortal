import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const OurStory: React.FC = () => {
  const Section: React.FC<{ id: string; children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ id, children, className, style }) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <motion.section
        id={id} // Pass the id prop to the motion.section element
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
    <Section id="our-story" className="bg-background-light text-text-dark py-16"> {/* Increased padding */}
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-script font-normal mb-12 text-primary">Our Journey Together</h2>
        <div className="relative overflow-hidden p-10 h-full">
          <div className="absolute border-opacity-20 border-secondary h-full border" style={{ left: '50%' }}></div>
          {/* Timeline Item 1 */}
          <div className="mb-12 flex justify-between items-center w-full"> {/* Increased margin-bottom */}
            <div className="order-1 w-5/12"></div>
            <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full">
              <h1 className="mx-auto font-semibold text-lg text-white">1</h1>
            </div>
            <div className="order-1 bg-white rounded-lg shadow-xl w-5/12 px-6 py-4">
              <h3 className="mb-3 font-script text-primary text-xl">How We Met</h3>
              <p className="text-sm leading-snug tracking-wide text-text-dark text-opacity-100 font-sans">
                It all started with a serendipitous encounter at a mutual friend's party. Little did we know, that evening would change our lives forever.
              </p>
              <img src="https://via.placeholder.com/300x200/b76e79/FFFFFF?text=How+We+Met" alt="How We Met" className="mt-4 rounded-lg shadow-md" />
            </div>
          </div>
          {/* Timeline Item 2 */}
          <div className="mb-12 flex justify-between flex-row-reverse items-center w-full"> {/* Increased margin-bottom */}
            <div className="order-1 w-5/12"></div>
            <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full">
              <h1 className="mx-auto font-semibold text-lg text-white">2</h1>
            </div>
            <div className="order-1 bg-white rounded-lg shadow-xl w-5/12 px-6 py-4">
              <h3 className="mb-3 font-script text-primary text-xl">First Trip Together</h3>
              <p className="text-sm leading-snug tracking-wide text-text-dark text-opacity-100 font-sans">
                Our first adventure to the mountains solidified our bond. We discovered our shared love for travel and breathtaking views.
              </p>
              <img src="https://via.placeholder.com/300x200/b76e79/FFFFFF?text=First+Trip" alt="First Trip" className="mt-4 rounded-lg shadow-md" />
            </div>
          </div>
          {/* Timeline Item 3 */}
          <div className="mb-12 flex justify-between items-center w-full"> {/* Increased margin-bottom */}
            <div className="order-1 w-5/12"></div>
            <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full">
              <h1 className="mx-auto font-semibold text-lg text-white">3</h1>
            </div>
            <div className="order-1 bg-white rounded-lg shadow-xl w-5/12 px-6 py-4">
              <h3 className="mb-3 font-script text-primary text-xl">The Proposal</h3>
              <p className="text-sm leading-snug tracking-wide text-text-dark text-opacity-100 font-sans">
                Under a sky full of stars, the question was popped! A moment we'll cherish forever.
              </p>
              <img src="https://via.placeholder.com/300x200/b76e79/FFFFFF?text=The+Proposal" alt="The Proposal" className="mt-4 rounded-lg shadow-md" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default OurStory;
