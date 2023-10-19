import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { AuthSelectors } from "../redux/auth/authSelectors";
import { UserAction } from "../redux/user/userActions";
import { UserSelectors } from "../redux/user/userSelectors";

const useCurrentUserInfo = () => {
    const dispatch = useDispatch();

    const authTokenType = useSelector(AuthSelectors.getTokenType);
    const accessToken = useSelector(AuthSelectors.getAccessToken);
    const isUserSignedIn = useSelector(UserSelectors.getUsername) !== undefined;

    const endpoint = "https://discord.com/api/users/@me";

    useEffect(() => {
        // if the user is signed in but we don't have the discord information for that user, request that information
        if (accessToken !== undefined && isUserSignedIn === false) {
            axios
                .get<string>(endpoint, {
                    headers: { authorization: `${authTokenType} ${accessToken}` }
                })
                .then((res) => {
                    const data: any = res.data as any;
                    dispatch(
                        UserAction.SetUserComplete({
                            username: data.username,
                            id: data.id.toString(),
                            avatar: data.avatar
                        })
                    );
                });
        }
    }, [accessToken, authTokenType, dispatch, isUserSignedIn]);
};

export const DiscordService = {
    useCurrentUserInfo
};
