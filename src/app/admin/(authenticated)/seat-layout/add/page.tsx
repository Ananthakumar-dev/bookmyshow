import SeatLayoutEditor from "@/app/admin/_components/seat-layout/SeatLayoutEditor";
import { SeatLayoutForm } from "@/lib/types/seat-layout.types";

const defaultValues: SeatLayoutForm = {
  name: "",
  sections: [],
};

export default function Page() {
  return <SeatLayoutEditor defaultValues={defaultValues} templateId={null} />;
}
