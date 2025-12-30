import { Brain, Database, Layers, GraduationCap } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Data Scientist • Geospatial Data Engineer  
            </h3>

            <p className="text-muted-foreground">
              I'm a data scientist and geospatial data engineer with 3+ years of experience building
              end-to-end systems that transform spatial data into production-ready insights. I design
              scalable pipelines, optimize geospatial workflows, and deploy models that support practical,
              data-driven decision-making.
            </p>

            <p className="text-muted-foreground">
              My work spans remote sensing, GIS, agriculture and economic modelling,
              including change detection, time-series analysis, forecasting, and environmental monitoring.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>

              <a
                href="https://docs.google.com/document/d/1zPsDLY0VoslNheGPMdXWrtzwjO-aQPtGXtWU7_l0yEo/edit?usp=sharing"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
                target="_blank"
                rel="noreferrer"
              >
                General Resume
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Geospatial Data Engineering</h4>
                  <p className="text-muted-foreground">
                    Building robust geospatial pipelines to ingest, clean and validate data
                    for fast and reproducible analysis at scale.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Remote Sensing & Machine Learning</h4>
                  <p className="text-muted-foreground">
                    Applying deep learning to identify patterns in satellite imagery via classification, change detection, and 
                    time-series feature engineering, delivering validated and measurable outcomes.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Agriculture & Economic Modelling</h4>
                  <p className="text-muted-foreground">
                    Applying econometric methods and scenario modelling with spatial context to quantify
                    tradeoffs, forecast outcomes, and support planning and policy decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h3 className="text-2xl md:text-3xl font-bold text-center">
              Education
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* San Diego State University */}
            <div className="gradient-border p-6 card-hover bg-card">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-foreground leading-tight">
                      M.S. in Geography
                    </h4>
                    <p className="text-sm text-primary font-medium mt-1">
                      (Geographical Information Science)
                    </p>
                  </div>
                </div>
                
                <div className="pl-11 space-y-1">
                  <p className="text-foreground font-medium">
                    San Diego State University
                  </p>
                  <p className="text-sm text-muted-foreground">
                    San Diego, California
                  </p>
                  <p className="text-sm text-muted-foreground font-semibold pt-1">
                    August 2024 – Present
                  </p>
                </div>
              </div>
            </div>

            {/* KNUST */}
            <div className="gradient-border p-6 card-hover bg-card">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-foreground leading-tight">
                      B.Sc. in Geomatic Engineering
                    </h4>
                  </div>
                </div>
                
                <div className="pl-11 space-y-1">
                  <p className="text-foreground font-medium">
                    Kwame Nkrumah University of Science and Technology
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Kumasi, Ghana
                  </p>
                  <p className="text-sm text-muted-foreground font-semibold pt-1">
                    September 2016 – July 2020
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};