export default function OtherPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="container mx-auto mt-20 px-6">{children}</main>;
}
