import './globals.css'

export const metadata = {
  title: 'SynaptiQ — Adaptive Neural Learning Cockpit',
  description: 'AI-driven personalized computer science learning and analytics platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
