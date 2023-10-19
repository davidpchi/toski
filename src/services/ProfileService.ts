import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { AuthSelectors } from "../redux/auth/authSelectors";
import { UserSelectors } from "../redux/user/userSelectors";
import { ChatterfangProfile } from "../types/service/ProfileService/ChatterfangProfile";
import { Profile } from "../types/domain/Profile";
import { profilesDataMapper } from "../types/service/ProfileService/dataMappers";
import { ProfilesAction } from "../redux/profiles/profilesActions";

const useProfiles = () => {
    const dispatch = useDispatch();

    const accessToken = useSelector(AuthSelectors.getAccessToken);
    const userId = useSelector(UserSelectors.getId);

    const endpoint = "https://chatterfang.onrender.com/profiles";

    useEffect(() => {
        if (accessToken !== undefined && userId !== undefined) {
            axios
                .get<string>(endpoint, {
                    headers: { "access-token": accessToken }
                })
                .then((res) => {
                    const data: ChatterfangProfile[] = res.data as unknown as ChatterfangProfile[];
                    const profiles: Profile[] = profilesDataMapper(data);
                    dispatch(ProfilesAction.GetProfilesComplete(profiles));
                });
        }
    }, [accessToken, userId, dispatch]);
};

// "Content-Type": "application/x-www-form-urlencoded"

// const updateFavoriteCommander = (commanderId: string) = {

// }

export const ProfileService = {
    useProfiles
};
