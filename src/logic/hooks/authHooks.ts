import { useSelector } from "react-redux";

import { AuthSelectors } from "../../redux/auth/authSelectors";

export const useAuthInfo = () => {
    const tokenType = useSelector(AuthSelectors.getTokenType);
    const accessToken = useSelector(AuthSelectors.getAccessToken);

    return {
        tokenType,
        accessToken
    };
};
