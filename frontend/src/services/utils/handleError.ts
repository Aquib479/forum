import { AxiosError } from "axios";

export const handleError = (error: AxiosError) => {
    // Log error for debugging purpose
    console.error("API Error", error);

    // check if the error response exists
    if (error.response) {
        // server responsed with statusCode other than 200
        const statusCode = error.response.status;
        const message = error.response.statusText || "Something went wrong!";

        // Customisable based on statusCode
        switch (statusCode) {
            case 400:
                throw new Error(message || "Bad Request");
            case 401:
                throw new Error("Unauthorized, Please login");
            case 403:
                window.location.href = "/auth/login";
                throw new Error("Forbidden, You don't have permission");
            case 404:
                throw new Error("Resource not found");
            case 500:
                throw new Error("Internal server error. Please try again later");
            default:
                break;
        }
    } else if (error.request) {
        // request wad made but no response was received
        console.error("No response received: ", error.message);
        throw new Error(
            "No response from server. Please check your network or try again later"
        );
    } else {
        // something happened while setting up the request
        console.log("Error setting up the request: ", error.message);
        throw new Error(error.message || "Unexpected error occurred");
    }
}