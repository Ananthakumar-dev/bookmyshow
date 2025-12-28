import { SeatLayout, SeatCell } from "@/lib/types/seat-layout.types";
import { SeatCellView } from "./SeatCellView";

type Props = {
  layout: SeatLayout;
  onCellClick?: (row: number, col: number) => void;
};

export default function SeatLayoutPreview({
  layout,
  onCellClick,
}: Props) {
  console.log(layout);
  return (
    <div className="space-y-2">
      {layout.grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onCellClick?.(rowIndex, colIndex)}
              className="cursor-pointer"
            >
              <SeatCellView
                cell={cell}
                seatTypes={layout.seatTypes}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
