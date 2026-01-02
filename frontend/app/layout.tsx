import Link from 'next/link'
import './globals.css'

export const metadata = {
  title: 'AutoParts Pro - Premium Car Accessories',
  description: 'Quality car accessories for all variants - Interior, Exterior, Electronics & Performance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <div className="nav-container">
            <Link href="/" className="logo">
              🚗 AutoParts Pro
            </Link>
            <ul className="nav-menu">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/interior">Interior</Link></li>
              <li><Link href="/exterior">Exterior</Link></li>
              <li><Link href="/electronics">Electronics</Link></li>
              <li><Link href="/performance">Performance</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>
        </nav>
        {children}
        <footer className="footer">
          <p>&copy; 2026 AutoParts Pro. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}
