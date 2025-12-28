"use client";

import { useState } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { SeatLayout, SeatCell } from "@/lib/types/seat-layout.types";
import LeftPanel from "./LeftPanel";
import SeatLayoutPreview from "./SeatLayoutPreview";

type Props = {
  initialLayout: SeatLayout;
};

export default function SeatLayoutBuilder({ initialLayout }: Props) {
  const [layout, setLayout] = useState<SeatLayout>(initialLayout);
  const [selectedSeatType, setSelectedSeatType] = useState<string>(
    Object.keys(initialLayout.seatTypes)[0]
  );

  const handleCellClick = (row: number, col: number) => {
    setLayout((prev) => {
      const cell = prev.grid[row][col];
      if (cell.type === "DISABLED") return prev;

      const newCell: SeatCell =
        cell.type === "EMPTY"
          ? {
              type: "SEAT",
              seatType: selectedSeatType,
              label: `${String.fromCharCode(65 + row)}${col + 1}`,
            }
          : {
              ...cell,
              seatType: selectedSeatType,
            };

      const newGrid = prev.grid.map((r, ri) =>
        r.map((c, ci) => (ri === row && ci === col ? newCell : c))
      );

      return { ...prev, grid: newGrid };
    });
  };

  return (
    <div className="h-[calc(100vh-64px)] border rounded-lg overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={35} minSize={25}>
          <LeftPanel
            layout={layout}
            selectedSeatType={selectedSeatType}
            onSeatTypeChange={setSelectedSeatType}
            onLayoutChange={setLayout}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={65}>
          <div className="h-full p-4 overflow-auto">
            <SeatLayoutPreview
              layout={layout}
              onCellClick={handleCellClick}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
