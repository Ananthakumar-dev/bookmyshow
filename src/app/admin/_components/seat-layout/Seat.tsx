type Props = {
  label: string;
  price: number;
};

export default function Seat({ label, price }: Props) {
  return (
    <div
      className="w-8 h-8 rounded bg-blue-600 text-white text-xs flex items-center justify-center cursor-default"
      title={`₹${price}`}
    >
      {label}
    </div>
  );
}
