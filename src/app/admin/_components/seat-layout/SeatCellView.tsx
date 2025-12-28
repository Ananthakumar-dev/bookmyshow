import { SeatCell, SeatLayout } from "@/lib/types/seat-layout.types";

type Props = {
  cell: SeatCell;
  seatTypes: SeatLayout["seatTypes"];
};

export function SeatCellView({ cell, seatTypes }: Props) {
  if (cell.type === "EMPTY") {
    return <div className="w-8 h-8" />;
  }

  if (cell.type === "DISABLED") {
    return (
      <div className="w-8 h-8 rounded bg-gray-300 opacity-50" />
    );
  }

  // SEAT
  const seatType = seatTypes[cell.seatType];

  return (
    <div
      className="w-8 h-8 rounded flex items-center justify-center text-xs font-medium text-white"
      style={{ backgroundColor: seatType.color }}
      title={`${seatType.label} - ${cell.label}`}
    >
      {cell.label}
    </div>
  );
}
