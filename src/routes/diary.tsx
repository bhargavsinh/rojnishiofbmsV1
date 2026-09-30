import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { CalendarView } from "@/components/calendar-view";
import { DayPanel } from "@/components/day-panel";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/diary")({
  validateSearch: (search: Record<string, unknown>) => ({
    date: typeof search.date === "string" ? search.date : undefined,
  }),
  component: DiaryPage,
});

function DiaryPage() {
  const { date } = Route.useSearch();
  const selectDate = useApp((s) => s.selectDate);
  const selected = useApp((s) => s.selectedDate);
  const navigate = useNavigate({ from: "/diary" });

  useEffect(() => {
    if (date && /^\d{4}-\d{2}-\d{2}$/.test(date) && date !== selected) {
      selectDate(date);
    }
  }, [date, selectDate, selected]);

  useEffect(() => {
    if (selected && selected !== date) {
      void navigate({ search: { date: selected }, replace: true });
    }
  }, [selected, date, navigate]);

  return (
    <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(320px,1fr)_minmax(320px,1.2fr)] gap-4 items-start">
      <CalendarView />
      <DayPanel />
    </div>
  );
}
