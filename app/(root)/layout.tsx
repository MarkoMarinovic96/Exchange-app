import NavBar from "@/components/NavBar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col h-screen w-full font-inter lg:flex-row">
      <NavBar />
      {children}
    </main>
  );
}
