import { cn } from "~/lib/utils";

export default function Separator({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      className={cn(
        "bg-gray-400",
        {
          "h-px w-full": orientation === "horizontal",
          "h-full w-px": orientation === "vertical",
        },
        className,
      )}
    />
  );
}
