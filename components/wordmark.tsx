import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";

/** FitLens mark and name, linking home */
export function Wordmark() {
  return (
    <Link
      href="/"
      aria-label="FitLens home"
      className="flex items-center gap-2 text-ink"
    >
      <LogoMark className="h-7 w-7" />
      <span className="text-[17px] font-semibold tracking-tight">FitLens</span>
    </Link>
  );
}
