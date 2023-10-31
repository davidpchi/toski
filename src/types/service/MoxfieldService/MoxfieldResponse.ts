export type MoxfieldResponse = {
    data: MoxfieldResponseData;
    [key: string]: any; // This allows any other properties
};

export type MoxfieldResponseData = {
    userName: string;
    profileImageType: string;
    profileImageUrl: string;
    followerCount: number;
    followingCount: number;
    deckCount: number;
    userSinceUtc: string;
    badges: any[];
};
