export type RowForm = {
  id: string;
  name: string;
  seatCount: number;
   // UI-only
  gapsText?: string;

  // Actual validated value
  gaps?: number[];
};

export type SectionForm = {
  id: string;
  name: string;
  price: number;
  rowGapAfter?: number; // number of empty rows after this section
  rows: RowForm[];
};

export type SeatLayoutForm = {
  name: string;
  sections: SectionForm[];
};

export type LayoutFormState = {
  name: string;
  sections: SectionForm[];
};

export type PreviewSeat = {
  label?: string;
  isGap?: boolean;
};

export type PreviewRow = {
  rowName: string;
  seats: PreviewSeat[];
};

export type PreviewSection = {
  name: string;
  price: number;
  rows: PreviewRow[];
};
