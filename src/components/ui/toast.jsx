import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>
>(({ className, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(
        "group relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:fade-in-80 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-value)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-none data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-value)] data-[swipe=end]:transition-none sm:w-[390px]",
        className,
      )}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("mb-1 text-lg font-semibold [&+div]:text-sm", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md text-gray-400 opacity-0 transition-opacity hover:text-gray-500 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 group-hover:opacity-100 group-[.data-[state=open]]:opacity-100",
      className,
    )}
    aria-label="Close"
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const toastVariants = cva(
  "group relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:fade-in-80 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-value)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-none data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-value)] data-[swipe=end]:transition-none sm:w-[390px]",
  {
    variants: {
      variant: {
        default: "border",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground [&[role='alert']]:border-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, toastVariants };
