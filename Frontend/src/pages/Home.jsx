import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function Home() {
    const navigate = useNavigate();
    const typedRef = useRef(null);

    useEffect(() => {
        const options = {
            strings: [
                "Empowering Farmers with Innovation",

"Grow Smarter, Harvest Better",

"Technology Meets Tradition in Farming"
            ],
            typeSpeed: 50,
            backSpeed: 25,
            loop: true,
        };

        const typed = new Typed(typedRef.current, options);

        return () => {
            typed.destroy(); 
        };
    }, []);

    return (
        <main className="hero">
            <div className="container">
                <h1 className="headline">
                    <span ref={typedRef}></span>
                </h1>
                <h2 className="subhead">Welcome to Krishi Kisan</h2>
                <p className="tagline">
                    Modern technology to help you streamline your farming activities and increase your yield.
                </p>

                <div className="hero-grid">
                    <div className="hero-card">
                        <img 
                            src="https://img.freepik.com/premium-photo/indian-farmer-using-smartphone-agriculture-field_75648-6279.jpg" 
                            alt="farmer" 
                        />
                    </div>

                    <div className="hero-actions">
                        <button 
                            className="btn primary" 
                            onClick={() => navigate("/Profile")}
                        >
                            Get Started →
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
