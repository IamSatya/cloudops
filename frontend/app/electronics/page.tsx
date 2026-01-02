import Image from 'next/image'

export default function ElectronicsPage() {
  const products = [
    {
      name: 'Premium GPS Navigation System',
      description: '7-inch touchscreen with lifetime map updates and voice guidance',
      price: '$199.99',
      rating: '⭐⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop'
    },
    {
      name: 'Dual Dash Cam 4K',
      description: 'Front and rear 4K recording with night vision',
      price: '$159.99',
      rating: '⭐⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop'
    },
    {
      name: 'Premium Sound System',
      description: 'Complete audio system with subwoofer and amplifier',
      price: '$449.99',
      rating: '⭐⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=300&fit=crop'
    },
    {
      name: 'Wireless Phone Charger Mount',
      description: 'Auto-clamping wireless charging phone holder',
      price: '$39.99',
      rating: '⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=400&h=300&fit=crop'
    },
    {
      name: 'Bluetooth OBD2 Scanner',
      description: 'Diagnostic tool with smartphone app integration',
      price: '$34.99',
      rating: '⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop'
    },
    {
      name: 'Backup Camera System',
      description: 'HD wireless backup camera with parking guidelines',
      price: '$89.99',
      rating: '⭐⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop'
    },
    {
      name: 'Tire Pressure Monitoring System',
      description: 'Real-time tire pressure and temperature monitoring',
      price: '$69.99',
      rating: '⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop'
    },
    {
      name: 'Smart Rearview Mirror',
      description: '10-inch touchscreen mirror with dash cam and GPS',
      price: '$179.99',
      rating: '⭐⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&h=300&fit=crop'
    },
    {
      name: 'FM Transmitter Bluetooth',
      description: 'Wireless music streaming with dual USB charging',
      price: '$24.99',
      rating: '⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop'
    },
    {
      name: 'Parking Sensor System',
      description: '8-sensor kit with LED display and audio alerts',
      price: '$79.99',
      rating: '⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    }
  ]

  return (
    <main className="container">
      <div className="page-header">
        <h1>Electronics & Tech</h1>
        <p>Upgrade your drive with the latest automotive electronics and smart devices</p>
      </div>

      <div className="product-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-image-wrapper">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-badge">Tech</div>
            </div>
            <div className="product-content">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-rating">{product.rating} <span className="review-count">(210+ reviews)</span></div>
              <div className="product-price">{product.price}</div>
              <button className="btn">🛒 Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
