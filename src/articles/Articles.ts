import { article_1 } from "./Article_1";
import { NewsArticle } from "../types/domain/NewsArticle";
import { article_4 } from "./Article_4";
import { article_5 } from "./Article_5";
import { article_6 } from "./Article_6";
import { article_7 } from "./Article_7";

export const Articles: { [id: string]: NewsArticle } = {
    "1": article_1,
    "4": article_4,
    "5": article_5,
    "6": article_6,
    "7": article_7
};
