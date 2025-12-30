import React from 'react';
import { Award, ExternalLink } from 'lucide-react';

export const CertificationSection = () => {
  const certificates = [
    {
      title: "AWS Certified Solutions Architect Associate",
      issuer: "Amazon Web Services",
      date: "July, 2024",
      url: "https://www.credly.com/badges/75c4da16-4da3-4c81-95d4-614417d5f961/whatsapp",
      gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
    },
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "May, 2024",
      url: "https://www.credly.com/badges/1fc16f5c-0be7-4bde-875f-59c94e403b84/whatsapp",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
    },
    {
      title: "Computer Vision and Image Processing",
      issuer: "Professional Certification",
      date: "August 2023",
      url: "https://www.credly.com/go/rf29B7Rp",
      gradient: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)"
    }
  ];

  return (
    <section id="certifications" className="py-20 px-4 relative z-10">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Professional <span className="text-primary">Certificates</span>
          </h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Industry-recognized certifications and credentials
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl overflow-hidden border border-border shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              style={{
                animation: `fade-in 0.7s ease-out ${index * 0.2}s forwards`,
                opacity: 0
              }}
            >
              {/* Certificate Header with Gradient */}
              <div 
                className="h-36 flex items-center justify-center relative overflow-hidden"
                style={{ background: cert.gradient }}
              >
                <div className="absolute inset-0 opacity-20" 
                     style={{ 
                       backgroundImage: 'radial-gradient(circle at 30% 30%, white 0%, transparent 60%)'
                     }}
                />
                <Award className="w-20 h-20 text-white relative z-10" strokeWidth={1.5} />
              </div>
              
              {/* Certificate Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 leading-tight min-h-[60px]">
                  {cert.title}
                </h3>
                
                <div className="space-y-2 mb-5">
                  <p className="text-sm opacity-70">
                    <span className="font-semibold opacity-100">Issuer:</span> {cert.issuer}
                  </p>
                  <p className="text-sm opacity-70">
                    <span className="font-semibold opacity-100">Date:</span> {cert.date}
                  </p>
                </div>

                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
                >
                  View Credential
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Certificate Count */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-card rounded-xl shadow-md px-8 py-4 border border-border">
            <p className="text-lg opacity-70">
              <span className="font-bold text-3xl text-primary">3</span> Professional Certifications
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};