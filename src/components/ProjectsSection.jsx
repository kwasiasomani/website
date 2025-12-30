import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const projects = [
  {
    id: 1,
    title: "Sectoral Water Consumption",
    description: "Geospatial analysis showing water consumption by industrial sectors in San Diego, Orange County, Riverside",
    image: "/projects/project1.png",
    tags: ["HTML", "CSS", "Javascript", "Leaflet", "Numpy", "Pandas", "Geopandas", "Git"],
    demoUrl: "https://editor.p5js.org/kasomani5567/full/XfYwISorY",
    githubUrl: "https://github.com/kwasiasomani/sectorial_water_consumption",
    category: "Geospatial Analytics",
    icon: "🗺️"
  },
  {
    id: 2,
    title: "Top Industrial Sectors and Their Ripple Effects on the U.S Economy",
    description: "This project provides a practical tool to gauge how industries contribute to the economy, making it valuable for policy analysts and investors who need to know where to direct resources for maximum economic impact",
    image: "/projects/project2.png",
    tags: ["Numpy", "Pandas", "Streamlit", "PostgreSQL", "FASTAPI", "AWS(RDS,EC2,ECR,Cloudformation)", "Docker", "RAG", "Git"],
    demoUrl: "https://www.linkedin.com/posts/kwasi-asomani-61574920b_this-project-represents-a-significant-step-activity-7399701827950112768--poQ?utm_source=share&utm_medium=member_desktop&rcm=ACoAADVTSDEBoENrYaeW9B8-WNNkbVRn65-fmII",
    githubUrl: "https://github.com/kwasiasomani/Economic-Industrial-Sectors-Analytics",
    category: "Data Science & AI",
    icon: "⚡"
  },
  {
    id: 3,
    title: "Grocery Store Sales Time Series Prediction",
    description: "The main aim is to provide a personalized interface that allows users to interact with a machine learning model easily, regardless of their level of machine learning knowledge.",
    image: "/projects/project3.png",
    tags: ["Pandas", "Numpy", "Streamlit", "Scikit-Learn", "Plotly", "Matplotlib"],
    githubUrl: "https://github.com/kwasiasomani/Streamlit-dataset-and-Applications-for-Regression-Analysis",
    category: "Machine Learning",
    icon: "📊"
  },
];

export const ProjectsSection = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [offset, setOffset] = useState(0);
  const [cardPositions, setCardPositions] = useState({});
  const intervalRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Auto-move cards when not hovered
    intervalRef.current = setInterval(() => {
      setCardPositions(prev => {
        const newPositions = {};
        projects.forEach(project => {
          if (hoveredId !== project.id) {
            const time = Date.now() / 2000;
            newPositions[project.id] = {
              x: Math.sin(time + project.id) * 8,
              y: Math.cos(time + project.id) * 4
            };
          } else {
            newPositions[project.id] = { x: 0, y: -8 };
          }
        });
        return newPositions;
      });
    }, 50);

    return () => clearInterval(intervalRef.current);
  }, [hoveredId]);

  return (
    <section id="projects" className="py-24 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div 
          className="absolute w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          style={{
            top: '10%',
            left: '10%',
            transform: `translate(${Math.sin(offset * 0.02) * 50}px, ${Math.cos(offset * 0.02) * 30}px)`
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          style={{
            bottom: '10%',
            right: '10%',
            transform: `translate(${Math.cos(offset * 0.015) * 40}px, ${Math.sin(offset * 0.015) * 40}px)`
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{
            background: 'linear-gradient(to right, #60a5fa, #a78bfa, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Featured Projects
          </h2>
          <div className="max-w-4xl mx-auto border border-border rounded-2xl p-6 bg-card/50 backdrop-blur-sm">
            <p className="text-muted-foreground text-lg">
              A showcase of my technical expertise and problem-solving abilities across Data Science, Machine Learning, AI, and Geospatial Applications
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const position = cardPositions[project.id] || { x: 0, y: 0 };
            return (
              <div
                key={project.id}
                className="group relative"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  transition: hoveredId === project.id ? 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'transform 0.3s ease-out'
                }}
              >
                {/* Card */}
                <div className="bg-card rounded-lg overflow-hidden shadow-lg border border-border h-full hover:border-primary/50 transition-all duration-500">
                  {/* Image Container */}
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Icon Badge */}
                    <div 
                      className="absolute top-4 left-4 w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-xl shadow-lg"
                      style={{
                        transform: hoveredId === project.id ? 'scale(1.1) rotate(6deg)' : 'scale(1) rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      {project.icon}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-background/90 backdrop-blur-sm border border-border rounded-full text-xs text-primary font-medium">
                      {project.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* All Tags - Scrollable */}
                    <div className="mb-6 max-h-20 overflow-y-auto scrollbar-thin">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground hover:border-primary/50 transition-colors duration-300 whitespace-nowrap"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-all duration-300 group/btn"
                        >
                          <ExternalLink 
                            size={16} 
                            style={{
                              transform: hoveredId === project.id ? 'translate(2px, -2px)' : 'translate(0, 0)',
                              transition: 'transform 0.3s ease'
                            }}
                          />
                          Demo
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg font-medium border border-border hover:border-primary/50 transition-all duration-300 group/btn"
                      >
                        <Github 
                          size={16}
                          style={{
                            transform: hoveredId === project.id ? 'rotate(12deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease'
                          }}
                        />
                        Code
                      </a>
                    </div>
                  </div>
                </div>

                {/* Glow effect on hover */}
                {hoveredId === project.id && (
                  <div 
                    className="absolute inset-0 -z-10 bg-primary/20 rounded-lg blur-xl"
                    style={{ 
                      transform: 'scale(1.05)',
                      transition: 'opacity 0.5s ease'
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/kwasiasomani"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};