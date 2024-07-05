export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="container mx-auto">
        <header>Header</header>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  );
}
