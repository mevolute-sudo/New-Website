import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Lightbulb, Users, Rocket } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'We focus on measurable outcomes that drive real business growth.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'Constantly pushing boundaries with cutting-edge strategies.',
  },
  {
    icon: Users,
    title: 'Client-Centric',
    description: 'Your success is our priority. We treat your brand like our own.',
  },
  {
    icon: Rocket,
    title: 'Agile Approach',
    description: 'Fast, flexible, and adaptive to market changes.',
  },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 overflow-hidden"
      data-testid="about-section"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(circle at 70% 50%, #8B5CF6 0%, transparent 50%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left - Title */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass"
            >
              <span className="text-sm text-slate-300 tracking-wider uppercase">About Us</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              We're Not Just
              <br />
              <span className="text-gradient">Marketers</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-400 leading-relaxed max-w-lg"
            >
              We're growth architects. Evolute Marketing was founded with a singular 
              mission: to help businesses evolve and thrive in the digital landscape. 
              We blend creativity with data to craft strategies that don't just look 
              good—they perform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex gap-8 pt-4"
            >
              <div>
                <div className="text-4xl font-heading font-bold text-primary">98%</div>
                <div className="text-sm text-slate-500">Client Retention</div>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold text-accent">3.5x</div>
                <div className="text-sm text-slate-500">Avg. ROI</div>
              </div>
            </motion.div>
          </div>

          {/* Right - Values grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group p-6 rounded-2xl bg-surface border border-white/5 hover:border-primary/30 transition-all duration-500"
                data-testid={`value-card-${index}`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Story section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-32 relative"
        >
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Image */}
            <div className="lg:col-span-1">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1676119633019-be66d5c4bc4c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTYxNzh8MHwxfHNlYXJjaHw0fHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwbWVldGluZ3xlbnwwfHx8fDE3NzEzMTEyODB8MA&ixlib=rb-4.1.0&q=85"
                  alt="Team meeting"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-2 space-y-8">
              <h3 className="font-heading text-3xl md:text-4xl font-bold text-white">
                Our Story
              </h3>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  Founded in 2016, Evolute Marketing emerged from a simple observation: 
                  most marketing agencies were stuck in the past. They relied on outdated 
                  methods, generic strategies, and a one-size-fits-all approach.
                </p>
                <p>
                  We decided to do things differently. By combining deep technical expertise 
                  with creative thinking and genuine passion for our clients' success, we've 
                  helped over 50 businesses transform their digital presence.
                </p>
                <p>
                  Today, we're a team of strategists, designers, developers, and data 
                  scientists united by one goal: helping brands evolve and dominate their 
                  markets.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
