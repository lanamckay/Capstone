export function phoneNumberValidator(phoneNumber) {
    if (!phoneNumber || phoneNumber.trim() === "") {
      return "Please fill in this field.";
    }
  
    const phoneRegex = /^[0-9]{10,15}$/; // Adjust for valid formats (10-15 digits)
    if (!phoneRegex.test(phoneNumber)) {
      return "Please enter a valid phone number.";
    }
  
    return "";
  }
  