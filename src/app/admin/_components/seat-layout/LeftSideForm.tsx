import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SeatLayoutForm } from "@/lib/types/seat-layout.types";
import SectionEditor from "./SectionEditor";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  form: UseFormReturn<SeatLayoutForm>;
  templateId: null | string;
};

export default function LeftSideForm({ form, templateId }: Props) {
  const router = useRouter();
  const { control, register } = form;

  const {
    fields: sectionFields,
    append: addSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "sections",
  });

  const onSubmit = async (data: SeatLayoutForm) => {
    let url = "/api/seat-layout-templates";
    if(templateId) url = `/api/seat-layout-templates/${templateId}`;

    const method = templateId ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error(err);
      toast.error("Something went wrong!");
      return;
    }

    const { id } = await res.json();
    toast("Seat layout saved successfully!");
    router.push("/admin/seat-layout");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
      <div className="h-full p-4 space-y-4 overflow-auto">
        {/* Layout Name */}
        <Card>
          <CardHeader>
            <CardTitle>Layout Info</CardTitle>
          </CardHeader>
          <CardContent>
            <Label>Layout Name</Label>
            <Input {...register("name")} />
          </CardContent>
        </Card>

        <Separator />

        {/* Sections */}
        {sectionFields.map((section, sectionIndex) => (
          <SectionEditor
            key={section.id}
            form={form}
            sectionIndex={sectionIndex}
            onDelete={() => removeSection(sectionIndex)}
          />
        ))}

        <Button
          variant="outline"
          className="w-full"
          onClick={() =>
            addSection({
              id: crypto.randomUUID(),
              name: "",
              price: 0,
              rowGapAfter: 0,
              rows: [],
            })
          }
        >
          + Add Section
        </Button>

        <div className="text-right">
          <Button type="submit">Save Layout</Button>
        </div>
      </div>
    </form>
  );
}
