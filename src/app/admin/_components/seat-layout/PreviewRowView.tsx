import { PreviewRow } from "@/lib/types/seat-layout.types";
import Seat from "./Seat";

type Props = {
  row: PreviewRow;
  price: number;
};

export default function PreviewRowView({ row, price }: Props) {
  return (
    <div className="flex items-center gap-2">
      {/* Row label */}
      <div className="w-6 text-sm font-medium text-muted-foreground">
        {row.rowName}
      </div>

      {/* Seats */}
      <div className="flex gap-2">
        {row.seats.map((seat, i) =>
          seat.isGap ? (
            <div key={i} className="w-6" />
          ) : (
            <Seat key={i} label={seat.label as string} price={price} />
          )
        )}
      </div>
    </div>
  );
}
