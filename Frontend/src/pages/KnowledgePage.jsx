import React from "react";

export default function KnowledgePage() {
  const knowledgeData = [
    {
      title: "Drip Irrigation System",
      description: [
        "Delivers water directly to the root zone of plants through small emitters.",
        "Reduces water wastage by up to 60% compared to traditional irrigation.",
        "Minimizes evaporation and runoff, improving water efficiency.",
        "Allows fertilizers and nutrients to be delivered with irrigation water (fertigation).",
        "Promotes better crop yield and uniform plant growth.",
        "Suitable for all soil types, especially areas with limited water.",
        "Reduces weed growth as only the target area is watered.",
        "Can be automated for time-saving and precise control."
      ],
      category: "Water Conservation",
    },
    {
      title: " Drip Irrigation System",
      description:" Delivers water directly to the root zone of each plant through small emitters.\tReduces water wastage by up to 60% compared to traditional irrigation methods.\tMinimizes evaporation and runoff, ensuring efficient water use.\tAllows simultaneous delivery of fertilizers and nutrients with irrigation water (fertigation).\tPromotes better crop yield and uniform plant growth.",
      category: "Water Conservation",
    },
    {
      title: " Organic Composting",
      description:
        "Composting converts farm waste into valuable organic fertilizer — improving soil structure and fertility naturally.",
      category: "Organic Farming",
    },
    {
      title: " Weather-Based Farming",
      description:
        "Monitor local weather to plan sowing, irrigation, and fertilizer schedules efficiently.",
      category: "Smart Farming",
    },
    {
      title: " Soil pH Testing",
      description:
        "Maintain soil pH between 6.0–7.5 for most crops. Test soil annually for best results.",
      category: "Soil Science",
    },
  ];

  return (
    <main className="page">
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">📚 Knowledge Hub</h1>
          <p className="page-subtitle">
            Learn modern farming practices, techniques, and tips.
          </p>
        </header>

        <div className="knowledge-grid">
          {knowledgeData.map((item, index) => (
            <div key={index} className="knowledge-card">
              <div className="kc-header">
                <h3 className="kc-title">{item.title}</h3>
                <span className="kc-category">{item.category}</span>
              </div>
              <p className="kc-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
