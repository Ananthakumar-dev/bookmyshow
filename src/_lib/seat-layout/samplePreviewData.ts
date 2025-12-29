import { PreviewSection } from "@/lib/types/seat-layout.types";

export const samplePreviewSections: PreviewSection[] = [
  {
    name: "Silver",
    price: 150,
    rows: [
      {
        rowName: "A",
        seats: [
          { label: "A1" },
          { label: "A2" },
          { label: "A3" },
          { isGap: true },
          { label: "A4" },
          { label: "A5" },
        ],
      },
      {
        rowName: "B",
        seats: [
          { label: "B1" },
          { label: "B2" },
          { label: "B3" },
          { isGap: true },
          { label: "B4" },
          { label: "B5" },
          { label: "B6" },
        ],
      },
    ],
  },
  {
    name: "Gold",
    price: 200,
    rows: [
      {
        rowName: "C",
        seats: [
          { label: "C1" },
          { label: "C2" },
          { isGap: true },
          { label: "C3" },
          { label: "C4" },
        ],
      },
    ],
  },
];
