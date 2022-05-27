import app from "./server";
import dotenv from "dotenv";
import FAQDao from "./data-access/FAQDao";

function main() {
    dotenv.config()

    const port = process.env.PORT || 8000;

    FAQDao.injectDB(process.env.DB_CONN)
}