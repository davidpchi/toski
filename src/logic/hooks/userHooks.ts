import { useSelector } from "react-redux";

import { UserSelectors } from "../../redux/user/userSelectors";
import { getDiscordAvatarImage } from "../../services/DiscordService";

export const useUserInfo = () => {
    const username = useSelector(UserSelectors.getUsername);
    const userAvatar = useSelector(UserSelectors.getAvatar);
    const userId = useSelector(UserSelectors.getId);
    const userPic = userId && userAvatar ? getDiscordAvatarImage(userId, userAvatar) : undefined;

    return {
        username,
        userAvatar,
        userId,
        userPic
    };
};
