import { PreviewSection } from "@/lib/types/seat-layout.types";
import PreviewRowView from "./PreviewRowView";
import { Separator } from "@/components/ui/separator";

type Props = {
  section: PreviewSection;
};

export default function PreviewSectionView({ section }: Props) {
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-gray-700">
        {section.name} – ₹{section.price}
      </div>

      {section.rows.map((row, i) => (
        <PreviewRowView
          key={i}
          row={row}
          price={section.price}
        />
      ))}

      <Separator />
    </div>
  );
}
