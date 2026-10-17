import { redirect } from "next/navigation";

/** No listing page here yet — send visitors to the courses section on the homepage. */
export default function CoursesIndex() {
  redirect("/#courses");
}
