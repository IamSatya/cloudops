import Image from 'next/image'

export default function InteriorPage() {
  const products = [
    {
      name: 'Premium Leather Seat Covers',
      description: 'Luxury leather seat covers with superior comfort and durability',
      price: '$149.99',
      rating: '⭐⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop'
    },
    {
      name: 'All-Weather Floor Mats',
      description: 'Heavy-duty floor mats for maximum protection in all conditions',
      price: '$79.99',
      rating: '⭐⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop'
    },
    {
      name: 'Carbon Fiber Steering Wheel Cover',
      description: 'Sporty carbon fiber pattern with enhanced grip',
      price: '$34.99',
      rating: '⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=400&h=300&fit=crop'
    },
    {
      name: 'Dashboard Organizer',
      description: 'Multi-compartment organizer for phones, coins, and accessories',
      price: '$24.99',
      rating: '⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=400&h=300&fit=crop'
    },
    {
      name: 'Memory Foam Seat Cushion',
      description: 'Ergonomic support for long drives with cooling gel',
      price: '$44.99',
      rating: '⭐⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1583468991740-f8c90e1de64e?w=400&h=300&fit=crop'
    },
    {
      name: 'LED Interior Lights Kit',
      description: 'RGB ambient lighting with remote control',
      price: '$39.99',
      rating: '⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?w=400&h=300&fit=crop'
    },
    {
      name: 'Sun Visor Organizer',
      description: 'Multi-pocket storage for documents and cards',
      price: '$19.99',
      rating: '⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1614963366795-e9c7f60e1e8f?w=400&h=300&fit=crop'
    },
    {
      name: 'Center Console Armrest Pad',
      description: 'Extra cushioning for armrest comfort',
      price: '$29.99',
      rating: '⭐⭐⭐⭐',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop'
    }
  ]

  return (
    <main className="container">
      <div className="page-header">
        <h1>Interior Accessories</h1>
        <p>Transform your car's interior with premium accessories for comfort and style</p>
      </div>

      <div className="product-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-image-wrapper">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-badge">New</div>
            </div>
            <div className="product-content">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-rating">{product.rating} <span className="review-count">(120+ reviews)</span></div>
              <div className="product-price">{product.price}</div>
              <button className="btn">🛒 Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
