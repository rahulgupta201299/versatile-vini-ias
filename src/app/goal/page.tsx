import { redirect } from "next/navigation";

/** /goal has no page of its own — send visitors to "Select Your Goal" on the homepage. */
export default function GoalIndex() {
  redirect("/#goals");
}
