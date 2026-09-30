import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 min-h-11 px-4 text-sm font-semibold rounded-[10px] transition-[transform,background-color,box-shadow,filter] duration-150 ease-out disabled:opacity-50 disabled:pointer-events-none tap select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-royal text-[#fff8f0] shadow-[0_8px_18px_-10px_rgba(138,28,28,0.7)] hover:brightness-110",
        gold: "bg-gold text-charcoal hover:brightness-105",
        ghost: "bg-transparent text-royal border border-border hover:bg-primary/10",
        glass: "glass-thin text-fg hover:bg-primary/10",
        danger: "bg-danger text-white hover:brightness-110",
        quiet: "bg-transparent text-muted hover:text-fg hover:bg-primary/10",
      },
      size: {
        md: "min-h-11 px-4",
        sm: "min-h-9 px-3 text-[13px]",
        icon: "size-11 p-0",
        iconSm: "size-9 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & { asChild?: boolean }
>(function Button({ className, variant, size, asChild, ...props }, ref) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
  );
});
