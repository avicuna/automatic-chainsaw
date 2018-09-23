import { logoutTypes } from "./logout.types";
  
export const logoutUser = () => {
    return {
        payload: {
            accountNumber: 0,
            email: "",
            firstName: "",
            gender: "",
            height: 0,
            lastName: "",
            username: "",
            weight: 0
        },
        type: logoutTypes.Logout_User
    }
}

