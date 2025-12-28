import React from "react";

import { SeatLayout } from "@/lib/types/seat-layout.types";
import SeatLayoutBuilder from "@/app/admin/_components/seat-layout/SeatLayoutBuilder";

const initialLayout: SeatLayout = {
  meta: {
    name: "New Layout",
    rows: 5,
    columns: 8,
  },
  seatTypes: {
    REGULAR: { label: "Regular", color: "#4ade80" },
    PREMIUM: { label: "Premium", color: "#60a5fa" },
  },
  grid: Array.from({ length: 5 }, (_, r) =>
    Array.from({ length: 8 }, (_, c) => ({
      type: "EMPTY",
    }))
  ),
};

export default function Page() {
  return <SeatLayoutBuilder initialLayout={initialLayout} />;
}
