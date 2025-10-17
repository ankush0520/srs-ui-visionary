import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const NavigationMenu = React.forwardRef(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = React.forwardRef(({ className, children, title, ...props }, ref) => (
  <NavigationMenuPrimitive.Item ref={ref} className="group-[.with-background]:data-[active]:bg-accent group-[.with-background]:data-[active]:text-accent-foreground" {...props}>
    {children}
  </NavigationMenuPrimitive.Item>
));
NavigationMenuItem.displayName = NavigationMenuPrimitive.Item.displayName;

const NavigationMenuLink = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <NavigationMenuPrimitive.Link asChild>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-0.5 rounded-md p-3 text-sm font-medium no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent data-[active]:text-accent-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </a>
    </NavigationMenuPrimitive.Link>
  );
});
NavigationMenuLink.displayName = "NavigationMenuLink";

const NavigationMenuTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(
        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/50 focus:bg-secondary/50 data-[state=open]:bg-secondary/50 data-[state=open]:text-foreground/80",
        className,
      )}
      {...props}
    >
      {children}{" "}
      <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition-all group-[[data-state=open]>div]:rotate-180" />
    </NavigationMenuPrimitive.Trigger>
  ),
);
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full sm:w-[400px] p-4 data-[motion=from-start]:animate-in data-[motion=from-end]:animate-in data-[motion=to-start]:animate-out data-[motion=to-end]:animate-out data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuViewport = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Viewport
    className={cn(
      "absolute left-0 top-full flex justify-center overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[side=bottom]:animate-slide-in-from-top data-[side=left]:animate-slide-in-from-right data-[side=right]:animate-slide-in-from-left data-[side=top]:animate-slide-in-from-bottom",
      className,
    )}
    ref={ref}
    {...props}
  />
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden transition-all data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=visible]:fade-in data-[state=visible]:slide-in-from-bottom-2 data-[state=hidden]:fade-out data-[state=hidden]:slide-out-to-bottom-2",
      className,
    )}
    {...props}
  >
    <div className="relative h-3 w-[10px] rotate-45 rounded-tl-sm bg-border" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuViewport, NavigationMenuIndicator };
