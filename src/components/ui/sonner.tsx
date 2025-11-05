import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="bottom-right"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-medium group-[.toaster]:rounded-lg",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:text-[14px] group-[.toast]:leading-[150%]",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:hover:bg-primary/90 group-[.toast]:text-[14px]",
          cancelButton: "group-[.toast]:bg-white group-[.toast]:text-foreground group-[.toast]:border group-[.toast]:border-input group-[.toast]:hover:bg-accent group-[.toast]:text-[14px]",
          success: "group-[.toast]:bg-success group-[.toast]:text-success-foreground group-[.toast]:border-success",
          error: "group-[.toast]:bg-destructive group-[.toast]:text-destructive-foreground group-[.toast]:border-destructive",
          warning: "group-[.toast]:bg-warning group-[.toast]:text-warning-foreground group-[.toast]:border-warning",
          info: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:border-primary",
        },
        style: {
          fontSize: '14px',
          lineHeight: '150%',
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
