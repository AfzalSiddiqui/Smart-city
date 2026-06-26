export const Helpers = {
  formatPhoneNumber: (phone: string): string => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Format based on length
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)})  ${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)})  ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  },

  debounce: <T extends (...args: any[]) =>  any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout | null =  null;
    
    return (...args: Parameters<T>) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => func(...args),  wait);
    };
  },

  capitalizeFirst: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },
};
