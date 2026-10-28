import { NextResponse } from "next/server";
import { endAdminSession } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function POST() {
  await endAdminSession();

  return NextResponse.json({ ok: true });
}
