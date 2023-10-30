export type NewsArticle = {
    title: string;
    date: string;
    author: string;
    summary: string;
    id: string;
    content: JSX.Element;
    note?: string;
    originalLink?: string;
    image: string;
};
