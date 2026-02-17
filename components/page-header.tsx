export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div
      className="container mx-auto mt-20 px-6
      py-20 rounded-3xl text-white mb-16
      bg-linear-to-r from-violet-500 via-purple-500 to-purple-700
      dark:from-[#140f2d] dark:via-[#1f1147] dark:to-[#0c0820]"
    >
      <h1 className="text-3xl md:text-5xl font-semibold text-center">
        {title}
      </h1>
      <h2 className="text-center mt-5 text-md hidden md:block">{subtitle}</h2>
    </div>
  );
}
