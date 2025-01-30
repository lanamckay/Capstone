export function homeAddressValidator(homeAddress) {
    if (!homeAddress || homeAddress.trim() === "") {
      return "Please fill in this field.";
    }
  
    if (homeAddress.length < 5) {
      return "Address must be at least 5 characters long.";
    }
  
    const addressRegex = /^[a-zA-Z0-9\s,.'-]{5,}$/;
    if (!addressRegex.test(homeAddress)) {
      return "Please enter a valid address.";
    }
  
    return "";
  }
  