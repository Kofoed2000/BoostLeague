import Button from "./Button";

type ServiceCardProps = {
  title: string;
  description: string;
  price: string;
  icon: string;
};

export default function ServiceCard({
  title,
  description,
  price,
  icon,
}: ServiceCardProps) {
  return (
    <div className="
rounded-3xl
bg-zinc-900/70
border
border-zinc-800
p-8
transition-all
duration-300
hover:-translate-y-2
hover:border-blue-500
hover:shadow-[0_0_40px_rgba(59,130,246,0.20)]
backdrop-blur
">

      <div className="text-5xl mb-6">
        {icon}
      </div>

      <h3 className="text-2xl font-bold">
        {title}
      </h3>

      <p className="mt-4 text-gray-400">
        {description}
      </p>

      <p className="mt-6 text-blue-500 font-bold text-xl">
        {price}
      </p>

      <div className="mt-8">
        <Button text="Order Now" />
      </div>

    </div>
  );
}