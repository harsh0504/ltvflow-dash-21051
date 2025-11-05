import { toast } from "sonner";

/**
 * Toast utility functions using Sonner library
 *
 * Usage examples:
 * - showToast.success("Operation completed!")
 * - showToast.error("Failed to save data")
 * - showToast.warning("Please review your input")
 * - showToast.info("New update available")
 */

export const showToast = {
  success: (message: string, description?: string) => {
    toast.success(message, {
      description,
      duration: 3000,
    });
  },

  error: (message: string, description?: string) => {
    toast.error(message, {
      description,
      duration: 4000,
    });
  },

  warning: (message: string, description?: string) => {
    toast.warning(message, {
      description,
      duration: 3500,
    });
  },

  info: (message: string, description?: string) => {
    toast.info(message, {
      description,
      duration: 3000,
    });
  },

  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    return toast.promise(promise, messages);
  },

  custom: (message: string, options?: any) => {
    toast(message, options);
  },
};

// Export the original toast for advanced use cases
export { toast };
