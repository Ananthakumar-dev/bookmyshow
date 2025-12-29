import { useWatch, UseFormReturn, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SeatLayoutForm } from "@/lib/types/seat-layout.types";
import RowEditor from "./RowEditor";

type Props = {
  form: UseFormReturn<SeatLayoutForm>;
  sectionIndex: number;
  onDelete: () => void;
};

export default function SectionEditor({ form, sectionIndex, onDelete }: Props) {
  const { control, register, formState: { errors } } = form;
  console.log(errors)
  const {
    fields: rowFields,
    append: addRow,
    remove: removeRow,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.rows`,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Section</CardTitle>
        <Button size="sm" variant="destructive" onClick={onDelete}>
          Delete
        </Button>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <Label>Name</Label>
          <Input {...register(`sections.${sectionIndex}.name`)} />
        </div>

        <div>
          <Label>Price</Label>
          <Input
            type="number"
            {...register(`sections.${sectionIndex}.price`, {
              valueAsNumber: true,
            })}
          />
        </div>

        <div>
          <Label>Vertical Gap After Section (rows)</Label>
          <Input
            type="number"
            min={0}
            placeholder="e.g. 1"
            {...form.register(`sections.${sectionIndex}.rowGapAfter`, {
              valueAsNumber: true,
            })}
          />
        </div>

        {/* Rows */}
        <div className="space-y-2">
          <Label>Rows</Label>

          {rowFields.map((row, rowIndex) => (
            <RowEditor
              key={row.id}
              form={form}
              sectionIndex={sectionIndex}
              rowIndex={rowIndex}
              onDelete={() => removeRow(rowIndex)}
            />
          ))}


          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              addRow({
                id: crypto.randomUUID(),
                name: "",
                seatCount: 0,
                gaps: [],
              })
            }
          >
            + Add Row
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
