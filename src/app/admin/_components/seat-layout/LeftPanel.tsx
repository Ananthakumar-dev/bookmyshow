import { SeatLayout } from "@/lib/types/seat-layout.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Props = {
  layout: SeatLayout;
  selectedSeatType: string;
  onSeatTypeChange: (type: string) => void;
  onLayoutChange: (updater: (prev: SeatLayout) => SeatLayout) => void;
};

export default function LeftPanel({
  layout,
  selectedSeatType,
  onSeatTypeChange,
}: Props) {
  return (
    <div className="h-full p-4 overflow-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Layout Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label>Name</Label>
            <Input value={layout.meta.name} readOnly />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Rows</Label>
              <Input value={layout.meta.rows} readOnly />
            </div>
            <div>
              <Label>Columns</Label>
              <Input value={layout.meta.columns} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Seat Types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {Object.entries(layout.seatTypes).map(([key, seatType]) => (
            <Button
              key={key}
              variant={selectedSeatType === key ? "default" : "outline"}
              className="w-full justify-start gap-2"
              onClick={() => onSeatTypeChange(key)}
            >
              <span
                className="w-4 h-4 rounded"
                style={{ backgroundColor: seatType.color }}
              />
              {seatType.label}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
