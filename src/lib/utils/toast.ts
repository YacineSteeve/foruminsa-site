import { toast as baseToast } from 'sonner';
import type { ToastT } from 'sonner';

type ToastOptions = Omit<ToastT, 'id' | 'type' | 'invert' | 'position'>;

const defaultOptions: ToastOptions = {
    duration: 3000,
};

// Custom toast wrapper to handle specific cases and default options
export const toast = {
    success: (message: string, options?: ToastOptions) =>
        baseToast.success(message, { ...defaultOptions, ...options }),
    info: (message: string, options?: ToastOptions) =>
        baseToast.info(message, { ...defaultOptions, ...options }),
    warning: (message: string, options?: ToastOptions) =>
        baseToast.warning(message, { ...defaultOptions, duration: 4000, ...options }),
    error: (message: string, options?: ToastOptions) =>
        baseToast.error(
            message.toLowerCase() === 'failed to fetch'
                ? 'Impossible de se connecter au serveur'
                : message,
            { ...defaultOptions, duration: 4000, ...options },
        ),
    message: (message: string, options?: ToastOptions) =>
        baseToast.message(message, { ...defaultOptions, ...options }),
    loading: (message: string, options?: ToastOptions) =>
        baseToast.loading(message, { ...defaultOptions, ...options }),
};
