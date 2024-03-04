export type MoxfieldDeckResponse = {
    data: MoxfieldDeckResponseData;
    [key: string]: any; // This allows any other properties
};

export type MoxfieldDeckResponseData = {
    name: string;
    format: string; // we should check that this is commander before trying to render it
    publicUrl: string;
    publicId: string;
    main: {
        name: string; // this is commmander name
    };
};
