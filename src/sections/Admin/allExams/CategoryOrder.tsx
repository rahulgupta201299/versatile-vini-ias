"use client";

import React from "react";
import { AdminExamCategoryWithSubCategories } from "@/types";
import ReorderPanel from "../common/ReorderPanel";

type CategoryOrderProps = {
  categories: AdminExamCategoryWithSubCategories[];
  /** Saves the ids in their new order. Throw to show the message here. */
  onSave: (ids: string[]) => Promise<void>;
  onCancel: () => void;
};

/** Reorder All Exams categories — the header "All Exams" menu follows this order. */
export default function CategoryOrder({ categories, onSave, onCancel }: CategoryOrderProps) {
  const items = categories.map(({ _id, name, isActive, subCategories }) => ({ _id, name, isActive, detail: `${subCategories.length} sub categories` }));

  return <ReorderPanel items={items} title="Reorder categories" description="The header “All Exams” menu shows categories in this order." onSave={onSave} onCancel={onCancel} />;
}
