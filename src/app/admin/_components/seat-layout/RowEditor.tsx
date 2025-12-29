import { useEffect } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SeatLayoutForm } from "@/lib/types/seat-layout.types";

type Props = {
  form: UseFormReturn<SeatLayoutForm>;
  sectionIndex: number;
  rowIndex: number;
  onDelete: () => void;
};

export default function RowEditor({
  form,
  sectionIndex,
  rowIndex,
  onDelete,
}: Props) {
  const { control, register, setValue } = form;

  // ✅ hooks at top level of component
  const gapsText = useWatch({
    control,
    name: `sections.${sectionIndex}.rows.${rowIndex}.gapsText`,
  });

  useEffect(() => {
    if (typeof gapsText !== "string") return;

    const parsedGaps = gapsText
      .split(",")
      .map((v) => Number(v.trim()))
      .filter((n) => Number.isInteger(n) && n > 0);

    setValue(
      `sections.${sectionIndex}.rows.${rowIndex}.gaps`,
      parsedGaps,
      { shouldValidate: true }
    );
  }, [gapsText, sectionIndex, rowIndex, setValue]);

  return (
    <div className="flex gap-2 items-center">
      <Input
        placeholder="Row"
        {...register(
          `sections.${sectionIndex}.rows.${rowIndex}.name`
        )}
      />

      <Input
        type="number"
        placeholder="Seats"
        {...register(
          `sections.${sectionIndex}.rows.${rowIndex}.seatCount`,
          { valueAsNumber: true }
        )}
      />

      <Input
        placeholder="Gaps (e.g. 5,10)"
        {...register(
          `sections.${sectionIndex}.rows.${rowIndex}.gapsText`
        )}
      />

      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={onDelete}
      >
        ✕
      </Button>
    </div>
  );
}
