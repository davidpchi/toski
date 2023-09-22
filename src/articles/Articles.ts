import { article_1 } from "./Article_1";
import { article_2 } from "./Article_2";
import { NewsArticle } from "../types/domain/NewsArticle";
import { article_3 } from "./Article_3";

export const Articles: { [id: string]: NewsArticle } = {
    "1": article_1,
    "2": article_2,
    "3": article_3
};
