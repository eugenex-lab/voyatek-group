export const handleError = (error: any): string => {
  if (error?.response) {
    // Server responded with an error status
    if (error.response.status === 400) {
      // Safely check if errors exist in the response data
      const errors = error.response.data?.errors;
      if (errors && typeof errors === "object") {
        // Extract and join error messages into a single string
        const errorMessages = Object.entries(errors)
          .map(([field, messages]) => {
            // Ensure messages is an array before joining
            if (Array.isArray(messages)) {
              return `${field}: ${messages.join(", ")}`;
            }
            return `${field}: Unknown error`;
          })
          .join("; ");

        return `Validation Error: ${errorMessages}`;
      }

      return "There was a problem with your request. Please check your input.";
    } else if (error.response.status === 500) {
      return "Internal server error. Please try again later.";
    } else {
      return `Unexpected error: ${
        error.response.statusText || "Unknown error"
      }`;
    }
  } else if (error?.request) {
    // No response was received from the server
    return "No response from the server. Please try again later.";
  } else {
    // Something happened in setting up the request
    return "There was an error setting up your request. Please try again.";
  }
};
