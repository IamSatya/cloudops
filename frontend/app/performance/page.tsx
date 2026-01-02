import Image from 'next/image'

export default function PerformancePage() {
  const products = [
    {
      name: 'High-Flow Air Filter',
      description: 'Increase horsepower and acceleration with premium air filtration',
      price: '$59.99',
      rating: '⭐⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop'
    },
    {
      name: 'Performance Exhaust System',
      description: 'Cat-back exhaust for enhanced power and aggressive sound',
      price: '$599.99',
      rating: '⭐⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400&h=300&fit=crop'
    },
    {
      name: 'Turbo Charger Kit',
      description: 'Complete turbo kit for significant power gains',
      price: '$1,299.99',
      rating: '⭐⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?w=400&h=300&fit=crop'
    },
    {
      name: 'Performance Brake Pads',
      description: 'High-performance ceramic brake pads for superior stopping',
      price: '$89.99',
      rating: '⭐⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1614963315071-1b2e0f7ab3dd?w=400&h=300&fit=crop'
    },
    {
      name: 'Cold Air Intake',
      description: 'Increases engine efficiency and throttle response',
      price: '$249.99',
      rating: '⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=400&h=300&fit=crop'
    },
    {
      name: 'Performance Chip Tuner',
      description: 'Engine ECU tuning for increased power and efficiency',
      price: '$199.99',
      rating: '⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop'
    },
    {
      name: 'Sport Suspension Kit',
      description: 'Lowering springs for improved handling and stance',
      price: '$449.99',
      rating: '⭐⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop'
    },
    {
      name: 'Performance Oil Filter',
      description: 'High-efficiency filtration for engine protection',
      price: '$24.99',
      rating: '⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop'
    },
    {
      name: 'Strut Tower Brace',
      description: 'Chassis reinforcement for better cornering stability',
      price: '$129.99',
      rating: '⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1625311678908-e9e155f800a7?w=400&h=300&fit=crop'
    },
    {
      name: 'Performance Spark Plugs',
      description: 'Iridium spark plugs for better ignition and fuel economy',
      price: '$39.99',
      rating: '⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1558585963-8b0ec49e6c8c?w=400&h=300&fit=crop'
    },
    {
      name: 'Upgraded Radiator',
      description: 'Aluminum radiator for superior engine cooling',
      price: '$299.99',
      rating: '⭐⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=400&h=300&fit=crop'
    },
    {
      name: 'Performance Fuel Injectors',
      description: 'High-flow injectors for increased power output',
      price: '$349.99',
      rating: '⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=400&h=300&fit=crop'
    }
  ]

  return (
    <main className="container">
      <div className="page-header">
        <h1>Performance Parts</h1>
        <p>Boost your vehicle's power, handling, and efficiency with premium performance upgrades</p>
      </div>

      <div className="product-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-image-wrapper">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-badge">Pro</div>
            </div>
            <div className="product-content">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-rating">{product.rating} <span className="review-count">(150+ reviews)</span></div>
              <div className="product-price">{product.price}</div>
              <button className="btn">🛒 Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
