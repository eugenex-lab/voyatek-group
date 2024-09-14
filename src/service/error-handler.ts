export const handleError = (error: any): string => {
  console.error("Full error object:", error);

  if (typeof error === "string") {
    return error;
  }

  if (error.title && error.status === 400) {
    // This is the structure we're receiving for validation errors
    return error.title;
  }

  if (error.message) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
};
