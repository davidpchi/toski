import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { useCallback } from "react";
import { UserAction } from "../redux/user/userActions";
import { UserSelectors } from "../redux/user/userSelectors";
import { useAuthInfo } from "../logic/hooks/authHooks";

export const getDiscordLoginEndpoint = () => {
    const redirectUri = encodeURIComponent("http://" + window.location.host + "/toski");
    return `https://discord.com/api/oauth2/authorize?client_id=1163345338376138773&redirect_uri=${redirectUri}&response_type=token&scope=identify`;
};

export const getDiscordAvatarImage = (userId: string, userAvatar: string) => {
    return `https://cdn.discordapp.com/avatars/${userId}/${userAvatar}.png`;
};

const useGetCurrentUserInfo = () => {
    const dispatch = useDispatch();
    const { accessToken, tokenType } = useAuthInfo();

    const isUserSignedIn = useSelector(UserSelectors.getUsername) !== undefined;

    const endpoint = "https://discord.com/api/users/@me";

    return useCallback(() => {
        // if the user is signed in but we don't have the discord information for that user, request that information
        if (accessToken !== undefined && isUserSignedIn === false) {
            axios
                .get<string>(endpoint, {
                    headers: { authorization: `${tokenType} ${accessToken}` }
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
    }, [accessToken, tokenType, dispatch, isUserSignedIn]);
};

export const DiscordService = {
    useGetCurrentUserInfo
};
