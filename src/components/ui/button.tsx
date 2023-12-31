import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-amber-950 dark:focus-visible:ring-amber-300",
  {
    variants: {
      variant: {
        default:
          "bg-amber-900 text-amber-50 hover:bg-amber-900/90 dark:bg-amber-50 dark:text-amber-900 dark:hover:bg-amber-50/90",
        destructive:
          "bg-red-500 text-amber-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-amber-50 dark:hover:bg-red-900/90",
        outline:
          "border border-amber-200 bg-white hover:bg-amber-100 hover:text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:hover:bg-amber-800 dark:hover:text-amber-50",
        secondary:
          "bg-amber-100 text-amber-900 hover:bg-amber-100/80 dark:bg-amber-800 dark:text-amber-50 dark:hover:bg-amber-800/80",
        ghost:
          "hover:bg-amber-100 hover:text-amber-900 dark:hover:bg-amber-800 dark:hover:text-amber-50",
        link: "text-amber-900 underline-offset-4 hover:underline dark:text-amber-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      // <>
      //   {notification && (
      //     <span className="relative right-0 top-0 flex h-3 w-3 -translate-y-1/2 translate-x-1/2 transform">
      //       <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
      //       <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-500"></span>
      //     </span>
      //   )}
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
      // </>
    );
  },
);
Button.displayName = "Button";

type ButtonWithNotificationProps = ButtonProps & {
  notification?: boolean;
  containerCn?: string;
};

export const ButtonWithNotification = React.forwardRef<
  HTMLButtonElement,
  ButtonWithNotificationProps
>(function ButtonWithNotification(
  { notification, containerCn, ...buttonProps }: ButtonWithNotificationProps,
  ref,
) {
  if (!notification) {
    return <Button {...buttonProps} ref={ref} />;
  }
  return (
    <div className={cn("relative", containerCn)}>
      <span className="absolute right-0 top-0 flex h-3 w-3 -translate-y-1/2 translate-x-1/2 transform">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-500"></span>
      </span>
      <Button {...buttonProps} ref={ref} />
    </div>
  );
});

export { Button, buttonVariants };
