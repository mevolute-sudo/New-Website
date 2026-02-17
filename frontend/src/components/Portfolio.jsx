import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'TechFlow SaaS',
    category: 'Web Development',
    description: 'Complete redesign and development of a B2B SaaS platform, resulting in 150% increase in conversions.',
    image: 'https://images.unsplash.com/photo-1636247497842-81ee9c80f9df?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBkYXJrJTIwd2ViJTIwZGVzaWduJTIwcG9ydGZvbGlvJTIwbW9ja3VwfGVufDB8fHx8MTc3MTMxMTI2OHww&ixlib=rb-4.1.0&q=85',
    tags: ['React', 'Node.js', 'UI/UX'],
    stats: '+150% Conversions',
    featured: true,
  },
  {
    id: 2,
    title: 'NeonFit',
    category: 'Brand & Marketing',
    description: 'Full brand identity and digital marketing campaign for a fitness tech startup.',
    image: 'https://images.unsplash.com/photo-1759912301996-3b99deda9996?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxuZW9uJTIwZGF0YSUyMGFuYWx5dGljcyUyMHZpc3VhbGl6YXRpb24lMjBhYnN0cmFjdHxlbnwwfHx8fDE3NzEzMTEyNjh8MA&ixlib=rb-4.1.0&q=85',
    tags: ['Branding', 'Social Media', 'PPC'],
    stats: '+280% Brand Awareness',
    featured: false,
  },
  {
    id: 3,
    title: 'CryptoVault',
    category: 'SEO & Content',
    description: 'Strategic SEO overhaul that drove organic traffic growth from 5K to 50K monthly visitors.',
    image: 'https://images.unsplash.com/photo-1762279389083-abf71f22d338?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxuZW9uJTIwZGF0YSUyMGFuYWx5dGljcyUyMHZpc3VhbGl6YXRpb24lMjBhYnN0cmFjdHxlbnwwfHx8fDE3NzEzMTEyNjh8MA&ixlib=rb-4.1.0&q=85',
    tags: ['SEO', 'Content', 'Analytics'],
    stats: '+900% Organic Traffic',
    featured: false,
  },
  {
    id: 4,
    title: 'Luxe Retail',
    category: 'E-commerce',
    description: 'High-end e-commerce platform with custom checkout and inventory management.',
    image: 'https://images.unsplash.com/photo-1770734360042-676ef707d022?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHw0fHxjb2RpbmclMjB0ZWFtJTIwbmlnaHR8ZW58MHx8fHwxNzcxMzExMjc5fDA&ixlib=rb-4.1.0&q=85',
    tags: ['Shopify', 'Custom Dev', 'UX'],
    stats: '$2M+ Revenue',
    featured: true,
  },
];

const categories = ['All', 'Web Development', 'Brand & Marketing', 'SEO & Content', 'E-commerce'];

export const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section
      id="portfolio"
      ref={ref}
      className="relative py-32 overflow-hidden"
      data-testid="portfolio-section"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass"
            >
              <span className="text-sm text-slate-300 tracking-wider uppercase">Our Work</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              Featured <span className="text-gradient">Projects</span>
            </motion.h2>
          </div>

          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
                data-hover
                data-testid={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                project.featured ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              data-testid={`project-card-${project.id}`}
              data-hover
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                {/* Category badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0.7, y: 0 }}
                  className="mb-4"
                >
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                    {project.category}
                  </span>
                </motion.div>

                {/* Title and description */}
                <h3 className={`font-heading font-bold text-white mb-2 ${
                  project.featured ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
                }`}>
                  {project.title}
                </h3>
                
                <p className={`text-slate-300 mb-4 line-clamp-2 ${
                  project.featured ? 'text-base' : 'text-sm'
                }`}>
                  {project.description}
                </p>

                {/* Stats and tags */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, project.featured ? 3 : 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-md bg-white/10 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 text-secondary font-semibold text-sm">
                    {project.stats}
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Hover overlay line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredProject === project.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: 'left' }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-3 text-lg text-slate-400 hover:text-white transition-colors duration-300"
            data-hover
            data-testid="portfolio-view-all"
          >
            <span>Want to see more? Let's talk about your project</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
