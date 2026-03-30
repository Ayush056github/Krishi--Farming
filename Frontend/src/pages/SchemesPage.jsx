import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SchemesPage() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const schemes = [
    {
      name: "PM-KISAN Samman Nidhi",
      desc: "All superannuated/retired pensioners whose monthly pension is Rs.10,000/-or more",
      link: "https://pmkisan.gov.in/",
      
    },
    {
      name: "Kisan Credit Card (KCC)",
      desc: "Provides timely credit support to farmers for crop production & other needs.",
      link: "https://www.mygov.in/",
      
    },
    {
      name: "Pradhan Mantri Fasal Bima Yojana",
      desc: "Insurance cover to protect farmers against crop loss due to natural calamities.",
      link: "https://pmfby.gov.in/",
      
    },
    {
      name: "Soil Health Card Scheme",
      desc: "Provides soil nutrient information to improve productivity and reduce waste.",
      link: "https://soilhealth.dac.gov.in/",
      
    },
    {
      name: "Sub-Mission on Agricultural Mechanization",
      desc: "Helps farmers buy machinery with subsidy support to modernize agriculture.",
      link: "https://agricoop.gov.in/",
      
    },
  ];

  const filteredSchemes = schemes.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="page">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="dh-left">
            <span className="dh-icon"></span>
            <div>
              <h1 className="dh-title">Government Schemes</h1>
              <p className="dh-subtitle">
                Explore latest central and state schemes for farmers
              </p>
            </div>
          </div>
          <div className="dh-right">
            
          </div>
        </div>

       

        {/* Schemes List */}
        <div className="schemes-grid">
          {filteredSchemes.length > 0 ? (
            filteredSchemes.map((scheme, index) => (
              <div key={index} className="scheme-card">
                <div className="scheme-header">
                  <h3 className="scheme-name">{scheme.name}</h3>
                  <span className="scheme-tag">{scheme.tag}</span>
                </div>
                <p className="scheme-desc">{scheme.desc}</p>
                <a
                  href={scheme.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="scheme-link"
                >
                  🌐 Visit Official Site
                </a>
              </div>
            ))
          ) : (
            <p className="no-results">No schemes found for “{searchTerm}”</p>
          )}
        </div>
      </div>
    </main>
  );
}
