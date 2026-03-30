import React from 'react';

const analyticsData = [
    { icon: '🗓️', number: '15+', unit: 'Years', description: 'Deeply rooted in traditional and modern farming.', title: 'Experience' },
    { icon: '🌱', number: '95%', unit: 'Organic', description: 'Committed to practices that enrich the soil and protect the environment.', title: 'Sustainability' },
    { icon: '🗺️', number: '12', unit: 'Acres', description: 'Dedicated area cultivated with high-yield, healthy crops.', title: 'Managed Land' },
    { icon: '🧑‍🌾', number: '500+', unit: 'Farmers', description: 'Fellow farmers mentored and assisted through the platform and local outreach.', title: 'Mentorship' },
];


const philosophyData = [
    { icon: '🌿', title: 'Sustain the Earth', subtitle: 'Soil Health First', description: 'Focus on natural methods and crop rotation to maintain soil fertility and minimize environmental impact.', },
    { icon: '💡', title: 'Embrace Modern Tech', subtitle: 'Data-Driven Farming', description: 'Utilizing the latest tools—from sensor data to our Smart Engine—to optimize resource use and improve efficiency.', },
    { icon: '🤝', title: 'Nourish the Community', subtitle: 'Knowledge Sharing', description: 'Dedicated to building a resilient network, sharing successful strategies, and helping every farmer thrive.', },
];

export default function About() {
    return (
        <main className="page about-page">
            <div className="container">
           
                <header className="about-header">
                    <h1>Krishi Kisan </h1>
                    <h2>Growing Healthy Crops, Cultivating Knowledge.</h2>
                </header>

                
                <section className="about-story card">
                    <h3>The Farmer's Pledge</h3>
                    
                    <p>
                        <strong>Namaste!</strong> My journey as a farmer is not just a profession; it’s my way of life. I work hard every day to ensure the land is fertile, the crops are healthy, and the community is nourished.
                    </p>
                    
                    <p>
                        I believe in a balanced approach that respects the wisdom passed down through generations while also embracing the powerful potential of modern techniques. My passion is to constantly explore new methods to improve productivity, protect the environment, and secure a sustainable future for agriculture.
                    </p>

                    <p>
                        Through this platform—Krishi Kisan—I aim to share my farming experiences, learn new methods from others, and help fellow farmers grow better crops and thrive in their ventures.
                    </p>
                </section>
                
                <hr className="about-divider" />

            
                <section className="about-section">
                    <h3 className="section-title">Krishi Kisan: Performance Analytics</h3>
                    
                    <div className="about-grid analytics-grid">
                        {analyticsData.map((stat, index) => (
                            <div key={index} className="analytics-card card">
                                <span className="analytics-icon">{stat.icon}</span>
                                <p className="analytics-title">{stat.title}</p>
                                <p className="analytics-number">{stat.number}</p>
                                <p className="analytics-unit">{stat.unit}</p>
                                <p className="analytics-desc">{stat.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
                
                <hr className="about-divider" />

              
                <section className="about-section">
                    <h3 className="section-title">Our Guiding Philosophy</h3>
                    
                    <div className="about-grid philosophy-grid">
                        {philosophyData.map((item, index) => (
                            <div key={index} className="philosophy-card card">
                                <span className="philosophy-icon">{item.icon}</span>
                                <h4>{item.title}</h4>
                                <p className="philosophy-subtitle">{item.subtitle}</p>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
             
        </main>
    );
}

