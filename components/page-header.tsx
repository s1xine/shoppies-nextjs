export default function PageHeader({ title }: { title: string }) {
  return (
    <div
      className="container mx-auto mt-20 px-6
      py-20 rounded-3xl text-white mb-16
      bg-gradient-to-r from-violet-500 via-purple-500 to-purple-700
      dark:from-[#140f2d] dark:via-[#1f1147] dark:to-[#0c0820]"
    >
      <h1 className="text-5xl md:text-6xl font-semibold text-center">
        {title}
      </h1>
    </div>
  );
}
