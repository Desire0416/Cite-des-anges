import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, text, align = "left", tone = "dark", className, id }: SectionHeadingProps) {
  return (
    <div className={cn("reveal max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className={cn("eyebrow", tone === "light" && "eyebrow-light", align === "center" && "justify-center")}>{eyebrow}</p>
      <h2
        id={id}
        className={cn(
          "mt-4 text-[2rem] font-extrabold leading-[1.12] tracking-[-0.03em] sm:text-[2.5rem] lg:text-[2.85rem]",
          tone === "light" && "text-white",
        )}
      >
        {title}
      </h2>
      {text && <div className={cn("lead mt-5", tone === "light" && "text-white/70")}>{text}</div>}
    </div>
  );
}
