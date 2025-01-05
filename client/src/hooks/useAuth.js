import { useSelector } from "react-redux";

export const useAuth = () => {
    const isAuthenticated = useSelector(
        (state) => state.userAuth.isAuthenticated
    );
    return { isAuthenticated };
};

