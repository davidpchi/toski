import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { getAccessToken, getTokenType } from "../redux/auth/authSelectors";
import { UserAction } from "../redux/user/userActions";
import { UserSelectors } from "../redux/user/userSelectors";

// http://localhost:3000/toski#token_type=Bearer&access_token=A8nJ0BxHVpT4N7RPMfrK5eIwx4DvXO&expires_in=604800&scope=identify&state=15773059ghq9183habn

export const useCurrentUserInfo = () => {
    const dispatch = useDispatch();
    // Do the initial data hydration here
    const authTokenType = useSelector(getTokenType);
    const accessToken = useSelector(getAccessToken);
    const isUserSignedIn = useSelector(UserSelectors.getUsername) !== undefined;

    const endpoint = "https://discord.com/api/users/@me";

    useEffect(() => {
        if (accessToken !== undefined && isUserSignedIn === false) {
            console.log("attempting discord me request");
            axios
                .get<string>(endpoint, {
                    headers: { authorization: `${authTokenType} ${accessToken}` }
                })
                .then((res) => {
                    console.log(res);
                    // alert("succesful login!");
                    const data: any = res.data as any;
                    dispatch(UserAction.SetUserComplete({ username: data.username, id: data.id, avatar: data.avatar }));
                });
        }
    }, [accessToken, authTokenType, dispatch, isUserSignedIn]);
};

export const DiscordService = {
    useCurrentUserInfo
};
