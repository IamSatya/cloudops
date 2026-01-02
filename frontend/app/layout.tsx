export const metadata = {
  title: 'CloudOps Academy',
  description: 'AWS Native CI/CD with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
