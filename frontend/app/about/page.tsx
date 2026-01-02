export default function AboutPage() {
  return (
    <main className="container">
      <div className="page-header">
        <h1>About AutoParts Pro</h1>
        <p>Your trusted partner for premium car accessories and performance parts</p>
      </div>

      <section style={{ background: 'white', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
        <h2 style={{ color: '#1e3c72', marginBottom: '1rem' }}>Our Story</h2>
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          Founded in 2020, AutoParts Pro has quickly become a leading provider of quality car accessories 
          and performance parts. We're passionate about helping car enthusiasts and everyday drivers alike 
          transform their vehicles with the best products on the market.
        </p>
        <p style={{ color: '#666' }}>
          Our extensive catalog includes everything from interior comfort accessories to high-performance 
          engine upgrades, all carefully selected from trusted manufacturers worldwide.
        </p>
      </section>

      <section style={{ background: 'white', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
        <h2 style={{ color: '#1e3c72', marginBottom: '1rem' }}>Our Values</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>Quality First</h3>
            <p>We only stock products that meet our rigorous quality standards</p>
          </div>
          <div className="feature">
            <h3>Customer Focused</h3>
            <p>Your satisfaction is our top priority in everything we do</p>
          </div>
          <div className="feature">
            <h3>Expert Knowledge</h3>
            <p>Our team has decades of combined automotive experience</p>
          </div>
          <div className="feature">
            <h3>Fair Pricing</h3>
            <p>Competitive prices without compromising on quality</p>
          </div>
        </div>
      </section>

      <section style={{ background: 'white', padding: '2rem', borderRadius: '12px' }}>
        <h2 style={{ color: '#1e3c72', marginBottom: '1rem' }}>Contact Us</h2>
        <p style={{ marginBottom: '0.5rem', color: '#666' }}>📧 Email: support@autopartspro.com</p>
        <p style={{ marginBottom: '0.5rem', color: '#666' }}>📞 Phone: 1-800-AUTO-PART</p>
        <p style={{ marginBottom: '0.5rem', color: '#666' }}>📍 Address: 123 Auto Street, Car City, AC 12345</p>
        <p style={{ color: '#666' }}>🕐 Hours: Monday-Friday 9AM-6PM, Saturday 10AM-4PM</p>
      </section>
    </main>
  )
}
