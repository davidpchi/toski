import { article_1 } from "./Article_1";
import { NewsArticle } from "../types/domain/NewsArticle";
import { article_4 } from "./Article_4";
import { article_5 } from "./Article_5";
import { article_6 } from "./Article_6";
import { article_7 } from "./Article_7";
import { article_8 } from "./Article_8";
import { article_9 } from "./Article_9";
import { article_10 } from "./Article_10";
import { article_11 } from "./Article_11";
import { article_12 } from "./Article_12";

export const Articles: { [id: string]: NewsArticle } = {
    "0001": article_1,
    "0004": article_4,
    "0005": article_5,
    "0006": article_6,
    "0007": article_7,
    "0008": article_8,
    "0009": article_9,
    "0010": article_10,
    "0011": article_11,
    "0012": article_12
};
