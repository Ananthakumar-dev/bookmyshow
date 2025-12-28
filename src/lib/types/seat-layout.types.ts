export type SeatTypeKey = string;

export type SeatLayout = {
  meta: {
    name: string;
    description?: string;
    rows: number;
    columns: number;
  };
  seatTypes: Record<
    SeatTypeKey,
    {
      label: string;
      color: string;
    }
  >;
  grid: SeatCell[][];
};

export type SeatCell =
  | {
      type: "SEAT";
      seatType: SeatTypeKey;
      label: string;
    }
  | {
      type: "EMPTY";
    }
  | {
      type: "DISABLED";
    };
