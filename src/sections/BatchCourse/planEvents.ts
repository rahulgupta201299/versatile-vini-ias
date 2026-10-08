/** Hero plan buttons → scroll to the comparison table and highlight that plan's column. */
export const SELECT_PLAN_EVENT = "vini:select-plan";

export function selectPlan(planId: string) {
  window.dispatchEvent(new CustomEvent(SELECT_PLAN_EVENT, { detail: planId }));
  document.getElementById("plans")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
