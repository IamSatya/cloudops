import Link from 'next/link'

export default function Home() {
  const categories = [
    {
      name: 'Interior Accessories',
      slug: 'interior',
      description: 'Upgrade your car\'s interior with premium accessories',
      image: '🪑',
      items: ['Seat Covers', 'Floor Mats', 'Steering Wheel Covers', 'Dashboard Accessories']
    },
    {
      name: 'Exterior Accessories',
      slug: 'exterior',
      description: 'Enhance your vehicle\'s exterior appearance and protection',
      image: '🚘',
      items: ['Car Covers', 'Body Kits', 'Spoilers', 'Mud Flaps']
    },
    {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Latest tech upgrades for your vehicle',
      image: '📱',
      items: ['GPS Navigation', 'Dash Cams', 'Sound Systems', 'Phone Mounts']
    },
    {
      name: 'Performance Parts',
      slug: 'performance',
      description: 'Boost your car\'s performance and efficiency',
      image: '⚡',
      items: ['Air Filters', 'Exhaust Systems', 'Turbo Kits', 'Brake Upgrades']
    }
  ]

  return (
    <main className="container">
      <section className="hero">
        <h1>Premium Car Accessories for All Variants</h1>
        <p>Transform your vehicle with our high-quality accessories and performance parts</p>
      </section>

      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          {categories.map((category) => (
            <Link href={`/${category.slug}`} key={category.slug} className="category-card">
              <div className="category-icon">{category.image}</div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <ul className="category-items">
                {category.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <span className="view-all">View All →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="features">
        <h2>Why Choose AutoParts Pro?</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>✓ Quality Guaranteed</h3>
            <p>Premium products from trusted manufacturers</p>
          </div>
          <div className="feature">
            <h3>✓ Fast Shipping</h3>
            <p>Quick delivery to your doorstep</p>
          </div>
          <div className="feature">
            <h3>✓ Expert Support</h3>
            <p>Professional assistance for all your needs</p>
          </div>
          <div className="feature">
            <h3>✓ Best Prices</h3>
            <p>Competitive pricing on all products</p>
          </div>
        </div>
      </section>
    </main>
  )
}
