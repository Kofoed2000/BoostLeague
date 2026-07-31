type ServiceCardProps = {
  title: string;
  description: string;
};

export default function ServiceCard({
  title,
  description,
}: ServiceCardProps) {
  return (
    <div className="rounded-2xl bg-zinc-900 p-8 transition hover:bg-zinc-800">
      <h3 className="text-2xl font-bold">
        {title}
      </h3>

      <p className="mt-4 text-gray-400">
        {description}
      </p>
    </div>
  );
}