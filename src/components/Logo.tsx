import Image from "next/image";

export default function Logo({ variant = "color", className = "h-7 w-auto" }: { variant?: "color" | "white"; className?: string }) {
  return (
    <Image
      src={variant === "white" ? "/brand/etqan-logo-white.png" : "/brand/etqan-logo.png"}
      alt="ETQAN"
      width={632}
      height={196}
      priority
      className={className}
    />
  );
}
