import { SeatLayoutForm } from "@/lib/types/seat-layout.types";

type Props = {
  layout: SeatLayoutForm;
};

export default function SeatLayoutPreview({ layout }: Props) {
  return (
    <div className="h-full p-4 space-y-6 overflow-auto">
      <h2 className="font-semibold">Seat Layout Preview</h2>

      {layout.sections.length === 0 && (
        <p className="text-sm text-muted-foreground">No sections added yet</p>
      )}

      {layout.sections.map((section) => {
        const verticalGapCount =
          Number.isFinite(section.rowGapAfter) && section.rowGapAfter! > 0
            ? section.rowGapAfter!
            : 0;

        return (
          <div key={section.id} className="space-y-2">
            {/* Section header */}
            <div className="text-sm font-semibold">
              {section.name || "Unnamed Section"} – ₹{section.price}
            </div>

            {/* Rows */}
            {section.rows.map((row) => (
              <div key={row.id} className="flex items-center gap-2">
                <div className="w-6 text-sm text-muted-foreground">
                  {row.name || "?"}
                </div>

                <div className="flex gap-2">
                  {Array.from({ length: row.seatCount }, (_, i) => {
                    const seatNo = i + 1;
                    const isGapAfter = row.gaps?.includes(seatNo);

                    return (
                      <div key={seatNo} className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded bg-blue-600 text-white text-xs flex items-center justify-center"
                          title={`₹${section.price}`}
                        >
                          {`${row.name}${seatNo}`}
                        </div>

                        {isGapAfter && <div className="w-6" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* 🔽 Vertical gap after section */}
            {Array.from({ length: verticalGapCount }).map((_, i) => (
              <div key={i} className="h-6" />
            ))}
          </div>
        );
      })}
    </div>
  );
}
