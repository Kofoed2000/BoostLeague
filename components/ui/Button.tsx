type ButtonProps = {
  text: string;
};

export default function Button({ text }: ButtonProps) {
  return (
    <button className="
bg-blue-600
hover:bg-blue-500
transition-all
duration-300
rounded-xl
px-6
py-3
font-semibold
hover:scale-105
">
      {text}
    </button>
  );
}