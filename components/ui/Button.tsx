type ButtonProps = {
  text: string;
};

export default function Button({ text }: ButtonProps) {
  return (
    <button className="mt-10 rounded-xl bg-blue-600 px-8 py-4 text-xl font-semibold transition hover:bg-blue-700">
      {text}
    </button>
  );
}