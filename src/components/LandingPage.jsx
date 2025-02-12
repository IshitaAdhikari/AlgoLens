import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <section className="hero">
        <h1>Track Your Competitive Programming Journey</h1>
        <p>Monitor progress across CodeForces, LeetCode, and CodeChef</p>
        <button className="cta-button">Get Started</button>
      </section>
      
      <section className="features">
        <div className="feature-card">
          <h3>Track Progress</h3>
          <p>Monitor your performance across platforms</p>
        </div>
        <div className="feature-card">
          <h3>Visualize Growth</h3>
          <p>Beautiful charts and analytics</p>
        </div>
        <div className="feature-card">
          <h3>Set Goals</h3>
          <p>Define and achieve your objectives</p>
        </div>
      </section>
    </div>
  );
}

export default LandingPage; 