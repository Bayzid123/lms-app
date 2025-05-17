// Email validation using regular expression
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Validate if a field is not empty
  export const isNotEmpty = (value: string): boolean => {
    return value.trim() !== '';
  };
  
  // Validate if the progress value is within range
  export const isValidProgress = (progress: number): boolean => {
    return progress >= 0 && progress <= 100;
  };
  