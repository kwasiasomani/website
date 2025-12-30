import { useState } from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

// Convert percentage to 5-star rating
const getStarRating = (level) => {
  if (level >= 90) return 5;
  if (level >= 80) return 4;
  if (level >= 70) return 3;
  if (level >= 60) return 2;
  return 1;
};

// Get appropriate logo URL for each skill
const getSkillLogo = (skillName) => {
  const logoMap = {
    // Languages / Core
    Python:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    SQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg",
    JavaScript:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    R: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",

    // Web
    HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg",
    CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg",

    // Geospatial / Remote sensing
    GeoPandas:
      "https://geopandas.org/en/stable/_images/geopandas_icon.png",
    Rasterio:
      "https://rasterio.readthedocs.io/en/stable/_images/rasterio_logo.png",
    ArcGIS:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/ArcGIS_logo.svg/1200px-ArcGIS_logo.svg.png",
    QGIS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/qgis/qgis-original.svg",

    // Data & ML
    Pandas:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
    NumPy:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
    "Scikit-Learn":
      "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
    PyTorch:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
    TensorFlow:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",

    // Visualization
    Matplotlib:
      "https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg",
    Seaborn:
      "https://seaborn.pydata.org/_images/logo-mark-lightbg.svg",
    Plotly:
      "https://images.plot.ly/logo/new-branding/plotly-logomark.png",
    Tableau:
      "https://cdn.worldvectorlogo.com/logos/tableau-software.svg",
    "Power BI":
      "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg",

    // Tools
    Docker:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    PostgreSQL:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    MongoDB:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    Linux:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
  };

  return (
    logoMap[skillName] ||
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/code/code-original.svg"
  );
};

const skills = [
  // Languages
  {
    name: "Python",
    level: 95,
    category: "languages",
    experience: "Data science, geospatial analytics, automation, and ML workflows",
  },
  {
    name: "SQL",
    level: 90,
    category: "languages",
    experience: "Querying, analytics, and building reliable datasets for reporting and modeling",
  },
  {
    name: "JavaScript",
    level: 80,
    category: "languages",
    experience: "Interactive interfaces and lightweight front-end scripting",
  },
  {
    name: "R",
    level: 75,
    category: "languages",
    experience: "Statistical analysis and exploratory modeling",
  },

  // Web
  {
    name: "HTML",
    level: 80,
    category: "web",
    experience: "Structured, accessible layouts for clean user interfaces",
  },
  {
    name: "CSS",
    level: 75,
    category: "web",
    experience: "Styling and responsive design for modern web applications",
  },

  // Geospatial
  {
    name: "GeoPandas",
    level: 90,
    category: "geospatial",
    experience: "Vector processing, spatial joins, feature engineering, and reproducible geo workflows",
  },
  {
    name: "Rasterio",
    level: 85,
    category: "geospatial",
    experience: "Raster preprocessing, windowing/tiling, reprojection, and remote sensing pipelines",
  },
  {
    name: "ArcGIS",
    level: 80,
    category: "geospatial",
    experience: "Enterprise GIS workflows, spatial analysis, and map production",
  },
  {
    name: "QGIS",
    level: 85,
    category: "geospatial",
    experience: "Open-source GIS analysis, cartography, and spatial data processing",
  },

  // Data & ML
  {
    name: "Pandas",
    level: 90,
    category: "data",
    experience: "Data wrangling, feature engineering, and analysis-ready datasets",
  },
  {
    name: "NumPy",
    level: 88,
    category: "data",
    experience: "Numerical computing, array operations, and scientific computing",
  },
  {
    name: "Scikit-Learn",
    level: 85,
    category: "data",
    experience: "Classical ML, model evaluation, and production-friendly baselines",
  },
  {
    name: "PyTorch",
    level: 80,
    category: "data",
    experience: "Deep learning workflows for geospatial and time-series modeling",
  },
  {
    name: "TensorFlow",
    level: 75,
    category: "data",
    experience: "Model training and experimentation for ML tasks",
  },

  // Visualization
  {
    name: "Matplotlib",
    level: 85,
    category: "visualization",
    experience: "Publication-quality plots and custom visualizations",
  },
  {
    name: "Seaborn",
    level: 82,
    category: "visualization",
    experience: "Statistical visualizations and attractive default styles",
  },
  {
    name: "Plotly",
    level: 80,
    category: "visualization",
    experience: "Interactive charts and dashboards for data exploration",
  },
  {
    name: "Tableau",
    level: 75,
    category: "visualization",
    experience: "Business intelligence dashboards and visual analytics",
  },
  {
    name: "Power BI",
    level: 70,
    category: "visualization",
    experience: "Enterprise reporting and data-driven insights",
  },

  // Cloud & Tools
  {
    name: "AWS",
    level: 70,
    category: "cloud",
    experience: "Cloud-based storage and compute for data workloads",
  },
  {
    name: "PostgreSQL",
    level: 85,
    category: "tools",
    experience: "Relational data management and analytics storage",
  },
  {
    name: "Docker",
    level: 80,
    category: "tools",
    experience: "Containerized workflows for reproducible development and deployment",
  },
  {
    name: "Git",
    level: 95,
    category: "tools",
    experience: "Version control, collaboration, and clean project history",
  },
  {
    name: "Linux",
    level: 85,
    category: "tools",
    experience: "CLI workflows, automation, and running data/geo pipelines reliably",
  },
];

const categories = ["all", "languages", "web", "geospatial", "data", "visualization", "cloud", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-16 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          My <span className="text-primary">Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-1.5 rounded-full transition-colors duration-300 capitalize text-sm",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div
          className="h-[500px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white/20 [&::-webkit-scrollbar-thumb]:bg-white/60 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/80"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor:
              "rgba(255, 255, 255, 0.6) rgba(255, 255, 255, 0.2)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pr-2">
            {filteredSkills.map((skill, key) => {
              const isTopRow = key < 3;

              return (
                <div
                  key={key}
                  className="bg-card p-4 rounded-lg shadow-sm card-hover relative group hover:z-50 flex items-center"
                >
                  {/* Content section */}
                  <div className="flex-1 pr-4">
                    <h3 className="font-semibold text-base text-left mb-3">
                      {skill.name}
                    </h3>

                    {/* 5-star rating */}
                    <div className="flex justify-start items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`transition-colors duration-300 ${
                            i < getStarRating(skill.level)
                              ? "text-primary fill-primary"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Logo section */}
                  <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-white/10 rounded-lg p-2">
                    <img
                      src={getSkillLogo(skill.name)}
                      alt={`${skill.name} logo`}
                      className="w-full h-full object-contain"
                      style={{
                        filter:
                          "brightness(1.1) contrast(1.1) drop-shadow(0 0 4px rgba(255,255,255,0.1))",
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>

                  {/* Tooltip */}
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-[9999] w-64 text-center ${
                      isTopRow ? "top-full mt-2" : "bottom-full mb-2"
                    }`}
                  >
                    <div className="font-medium mb-1">Experience:</div>
                    <div>{skill.experience}</div>
                    <div
                      className={`absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-transparent ${
                        isTopRow
                          ? "bottom-full border-b-4 border-b-gray-900"
                          : "top-full border-t-4 border-t-gray-900"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};