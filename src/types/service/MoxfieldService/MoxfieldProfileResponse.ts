export type MoxfieldProfileResponse = {
    data: MoxfieldProfileResponseData;
    [key: string]: any; // This allows any other properties
};

export type MoxfieldProfileResponseData = {
    userName: string;
    profileImageType: string;
    profileImageUrl: string;
    followerCount: number;
    followingCount: number;
    deckCount: number;
    userSinceUtc: string;
    badges: any[];
};
