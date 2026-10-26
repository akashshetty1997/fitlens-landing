import Image from "next/image";

export type Screen = {
  src: string;
  alt: string;
  caption?: string;
};

/**
 * A real app screenshot in a simple phone outline. Screenshots are
 * 1320 x 2868 (iPhone 6.9"), so the frame keeps that ratio and never
 * shifts the layout while the image loads.
 */
export function Phone({
  screen,
  priority = false,
  sizes = "(min-width: 1024px) 320px, 70vw",
  className = "",
}: {
  screen: Screen;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[2.6rem] bg-[#18181b] p-[6px] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)] ring-1 ring-line ${className}`}
    >
      <Image
        src={screen.src}
        alt={screen.alt}
        width={1320}
        height={2868}
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        className="h-auto w-full rounded-[2.25rem] bg-paper"
      />
    </div>
  );
}
