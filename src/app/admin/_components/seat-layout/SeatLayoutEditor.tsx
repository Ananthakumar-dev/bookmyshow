"use client";

import { useForm } from "react-hook-form";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { zodResolver } from "@hookform/resolvers/zod";

import LeftSideForm from "./LeftSideForm";
import SeatLayoutPreview from "./SeatLayoutPreview";
import { SeatLayoutForm } from "@/lib/types/seat-layout.types";
import { seatLayoutSchema } from "../../(authenticated)/seat-layout/seat-layout.schema";

export default function SeatLayoutEditor(
    { defaultValues, templateId }: { defaultValues: SeatLayoutForm; templateId: null | string }
) {
  const form = useForm<SeatLayoutForm>({
    resolver: zodResolver(seatLayoutSchema),
    defaultValues,
  });

  // 🔑 WATCH ENTIRE FORM
  const watchedLayout = form.watch();

  return (
    <div className="h-[calc(100vh-64px)] border rounded-lg overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={35} minSize={25}>
          <LeftSideForm form={form} templateId={templateId} />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={65}>
          <SeatLayoutPreview layout={watchedLayout} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
