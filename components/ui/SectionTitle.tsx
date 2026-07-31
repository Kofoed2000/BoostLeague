type SectionTitleProps = {
  text: string;
};

export default function SectionTitle({ text }: SectionTitleProps) {
  return (
    <h2 className="text-4xl font-bold">
      {text}
    </h2>
  );
}