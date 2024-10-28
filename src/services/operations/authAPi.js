import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"

import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"
import { useNavigate } from 'react-router-dom';


const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
  CHANGEPASSWORD_API,
  ADDLINK_API,
  GETLINKS_API,
  UPDATELINK_API,
} = endpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      // toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      // toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    // toast.dismiss(toastId)
  }
}

export function signUp(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  userType,
  otp,
  navigate
) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {

        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        userType,
        otp,
      });

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      // toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      // toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    // toast.dismiss(toastId)
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      // toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      console.log(response)
      dispatch(setUser({ ...response.data.user, image: userImage }))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/user")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      // toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    // toast.dismiss(toastId)

  }
}
export function adminLogin(email, password, navigate) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      // toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      console.log(response)
      dispatch(setUser({ ...response.data.user, image: userImage }))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      // toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    // toast.dismiss(toastId)

  }
}
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))

    localStorage.removeItem("token")
    localStorage.removeItem("user")
    // toast.success("Logged Out")
    navigate("/")
  }
}



export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, { email, })

      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // toast.success("Reset Email Sent");
      setEmailSent(true);
    }
    catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      // toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false));
  }
}

export function resetPassword(password, confirmPassword, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, { password, confirmPassword, token });

      console.log("RESET Password RESPONSE ... ", response);


      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // toast.success("Password has been reset successfully");
    }
    catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      // toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
  }
}

export async function changePassword(token, formData) {
  // const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CHANGEPASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    // toast.success("Password Changed Successfully")
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    // toast.error(error.response.data.message)
  }
  // toast.dismiss(toastId)
}

export async function addLink(token, formData) {
  // const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", ADDLINK_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("ADD_LINK_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    // toast.success("Link Added Successfully")
  } catch (error) {
    console.log("ADD_LINK_API API ERROR............", error)
    // toast.error(error.response.data.message)
  }
  // toast.dismiss(toastId)
}
export async function getLink() {
  // const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("GET", GETLINKS_API);
    console.log("GET_LINK_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch link");
    }
    // toast.success("Link fetched successfully");
    return response.data.link;
  } catch (error) {
    console.error("GET_LINK_API API ERROR............", error);
    let errorMessage = "An error occurred while fetching the link";
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorMessage = error.response.data.message || `Error: ${error.response.status}`;
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = "No response received from server";
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = error.message;
    }
    // toast.error(errorMessage);
    throw error; // Re-throw the error so it can be caught in the component
  } finally {
    // toast.dismiss(toastId);
  }
}


export async function updateLink(token, formData) {
  // const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("PUT", UPDATELINK_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE_LINK_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    // toast.success("Link Updated Successfully")
  } catch (error) {
    console.log("UPDATE_LINK_API API ERROR............", error)
    // toast.error(error.response.data.message)
  }
  // toast.dismiss(toastId)
}