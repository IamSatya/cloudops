import Image from 'next/image'

export default function ExteriorPage() {
  const products = [
    {
      name: 'Waterproof Car Cover',
      description: 'UV-resistant, all-weather protection for your vehicle',
      price: '$89.99',
      rating: '⭐⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop'
    },
    {
      name: 'Carbon Fiber Body Kit',
      description: 'Aerodynamic body kit for enhanced performance and style',
      price: '$599.99',
      rating: '⭐⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop'
    },
    {
      name: 'Rear Spoiler',
      description: 'Sport-style spoiler for improved aerodynamics',
      price: '$199.99',
      rating: '⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop'
    },
    {
      name: 'Heavy-Duty Mud Flaps',
      description: 'Protects paint from road debris and mud',
      price: '$49.99',
      rating: '⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop'
    },
    {
      name: 'Chrome Door Handle Covers',
      description: 'Stylish chrome trim for door handles',
      price: '$34.99',
      rating: '⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1610768764270-790fbec18178?w=400&h=300&fit=crop'
    },
    {
      name: 'LED Fog Lights',
      description: 'High-intensity LED fog lights for better visibility',
      price: '$79.99',
      rating: '⭐⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop'
    },
    {
      name: 'Window Deflectors',
      description: 'Reduces wind noise and allows fresh air circulation',
      price: '$64.99',
      rating: '⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop'
    },
    {
      name: 'Roof Rack System',
      description: 'Heavy-duty roof rack for extra cargo capacity',
      price: '$249.99',
      rating: '⭐⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1562911791-c7a97b729ec5?w=400&h=300&fit=crop'
    },
    {
      name: 'Grille Guard',
      description: 'Front protection against minor impacts',
      price: '$299.99',
      rating: '⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=300&fit=crop'
    },
    {
      name: 'Side Mirror Covers',
      description: 'Aerodynamic carbon fiber mirror covers',
      price: '$54.99',
      rating: '⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop'
    }
  ]

  return (
    <main className="container">
      <div className="page-header">
        <h1>Exterior Accessories</h1>
        <p>Enhance your vehicle's appearance and protection with premium exterior parts</p>
      </div>

      <div className="product-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-image-wrapper">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-badge">Popular</div>
            </div>
            <div className="product-content">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-rating">{product.rating} <span className="review-count">(95+ reviews)</span></div>
              <div className="product-price">{product.price}</div>
              <button className="btn">🛒 Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
