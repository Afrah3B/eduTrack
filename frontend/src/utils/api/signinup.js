import config from "../../config.json";
const BASE_API = config.BASE_API;

export const signinAPI = async (validData) => {
  try {
    const response = await fetch(`${BASE_API}auth/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during sign-in API call:', error);
    throw error;
  }
};

export const signupAPI = async (validData) => {
  try {
    const response = await fetch(`${BASE_API}auth/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during sign-up API call:', error);
    throw error;
  }
};
