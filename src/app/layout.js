export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}
 
export default function RootLayout({ children }) {
  const style = {
    margin: "0px"
  }
 return (
    <html lang="en">
      <body style={style}>{children}</body>
    </html>
  )
}
