import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { contactEndpoints } from "../apis";
import { setLoading, setUserContacts } from "../../slices/profileSlice"
import { logout } from "./authAPi"
const { CREATE_CONTACT_API, UPDATE_CONTACT_API, GET_USER_CONTACTS_API } = contactEndpoints;

export const createContact = async (data, token) => {
    // const toastId = toast.loading("Creating contact...");
    let result = null;
    try {
        const response = await apiConnector("POST", CREATE_CONTACT_API, data, {
            Authorization: `Bearer ${token}`,
        });
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        // toast.success("Contact created successfully");
        result = response.data;
    } catch (error) {
        // toast.error(error.message);
    }
    // toast.dismiss(toastId);
    return result;
};

export const updateContact = async (data, token) => {
    // const toastId = toast.loading("Updating contact...");
    let result = null;
    try {
        const response = await apiConnector("PUT", UPDATE_CONTACT_API, data, {
            Authorization: `Bearer ${token}`,
        });
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        // toast.success("Contact updated successfully");
        result = response.data;
    } catch (error) {
        // toast.error(error.message);
    }
    // toast.dismiss(toastId);
    return result;
};

export const getUserContacts = (token) => {
    return async (dispatch) => {
        // const toastId = toast.loading("Retrieving contacts...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("GET", GET_USER_CONTACTS_API, null, {
                Authorization: `Bearer ${token}`,
            });
            console.log("GET_USER_CONTACTS_API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            const contactsData = response.data.data;

            if (contactsData && Object.keys(contactsData).length > 0) {
                dispatch(setUserContacts(contactsData));
                // toast.success("Contacts retrieved successfully");
            } else {
                console.log("No contacts data found");
                // toast.info("No contacts data available");
            }

            dispatch(setLoading(false));
            // toast.dismiss(toastId);
            return contactsData; // Return the contacts data (or empty object) for further use

        } catch (error) {
            console.log("GET_USER_CONTACTS_API ERROR............", error);
            dispatch(setLoading(false));

            if (error.response && error.response.status === 404) {
                // Handle 404 error (resource not found)
                // toast.info("No contacts data available");
            } else {
                // Handle other errors
                // toast.error("Could Not Get User Contacts");
            }

            // toast.dismiss(toastId);
            return null; // Return null to indicate no data was retrieved
        }
    };
};