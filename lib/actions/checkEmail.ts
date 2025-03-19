// const fetch = require("node-fetch"); 

const API_KEY = "ABSTRACT_KEY";

export async function checkEmail(email: string ) {
  const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${API_KEY}&email=${email}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.deliverability === "DELIVERABLE") {
      // console.log("✅ Valid Email:", data.email);
      return email;
    } else {
      // console.log("❌ Invalid Email:", data.email);
      return null;
    }

  } catch (error) {
    console.error("Error validating email:", error);
  }
}

