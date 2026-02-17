import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Search, 
  BarChart3, 
  Megaphone, 
  Code2, 
  Palette, 
  PenTool,
  ArrowUpRight
} from 'lucide-react';

const services = [
  {
    icon: Search,
    title: 'SEO Optimization',
    description: 'Dominate search rankings with data-driven SEO strategies that bring organic traffic and qualified leads to your business.',
    features: ['Technical SEO', 'Content Strategy', 'Link Building', 'Local SEO'],
    color: '#8B5CF6',
  },
  {
    icon: BarChart3,
    title: 'PPC Advertising',
    description: 'Maximize your ROI with targeted paid campaigns across Google, Meta, LinkedIn, and more.',
    features: ['Google Ads', 'Meta Ads', 'Retargeting', 'A/B Testing'],
    color: '#10B981',
  },
  {
    icon: Megaphone,
    title: 'Social Media',
    description: 'Build engaged communities and drive brand awareness through strategic social media management.',
    features: ['Content Creation', 'Community Management', 'Influencer Marketing', 'Analytics'],
    color: '#EC4899',
  },
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Custom websites and web applications built for performance, scalability, and conversion.',
    features: ['React & Next.js', 'E-commerce', 'CMS Integration', 'API Development'],
    color: '#F59E0B',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design that delights users and drives engagement across all touchpoints.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    color: '#06B6D4',
  },
  {
    icon: PenTool,
    title: 'Brand Strategy',
    description: 'Define your brand identity and create a cohesive visual language that resonates with your audience.',
    features: ['Brand Identity', 'Logo Design', 'Brand Guidelines', 'Messaging'],
    color: '#F43F5E',
  },
];

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-32 overflow-hidden"
      data-testid="services-section"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-surface" />
      
      {/* Gradient accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] opacity-10 blur-[150px]">
        <div className="w-full h-full bg-gradient-to-r from-primary to-accent rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <span className="text-sm text-slate-300 tracking-wider uppercase">Our Services</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            What We <span className="text-gradient">Do Best</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-400 leading-relaxed"
          >
            End-to-end digital solutions designed to accelerate your growth. 
            From strategy to execution, we've got you covered.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden"
              data-testid={`service-card-${index}`}
              data-hover
            >
              {/* Hover gradient */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 50%, ${service.color}, transparent 70%)` }}
              />

              {/* Icon */}
              <div 
                className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${service.color}15` }}
              >
                <service.icon className="w-7 h-7" style={{ color: service.color }} />
              </div>

              {/* Content */}
              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <ArrowUpRight 
                    className="w-5 h-5 text-slate-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" 
                  />
                </div>
                
                <p className="text-slate-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 text-xs rounded-full bg-white/5 text-slate-400"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-slate-400 mb-6">
            Need something specific? Let's discuss your unique requirements.
          </p>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-primary/50 text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-hover
            data-testid="services-cta"
          >
            Get a Custom Quote
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
