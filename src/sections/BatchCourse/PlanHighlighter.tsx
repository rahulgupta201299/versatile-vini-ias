"use client";

import { useEffect } from "react";
import { SELECT_PLAN_EVENT } from "./planEvents";

/** Marks the selected plan on the comparison table (data-active-plan) when a hero plan button is clicked. */
export default function PlanHighlighter({ tableId }: { tableId: string }) {
  useEffect(() => {
    const onSelect = (e: Event) => {
      const table = document.getElementById(tableId);
      if (table) table.dataset.activePlan = (e as CustomEvent<string>).detail;
    };
    window.addEventListener(SELECT_PLAN_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_PLAN_EVENT, onSelect);
  }, [tableId]);
  return null;
}
