const sqlite3 = require("sqlite3").verbose()

let answers;

export default class FAQDao {
    injectDB(conn) {
        if (answers) {
            return;
        } else {
            answers = new sqlite3.Database(conn, err => {
                if (err) {
                    return console.error(err.message)
                }
            })
        }
    }

    static async getAnswers({
        filters = null,
        page = 0,
        answersPerPage = 10
    } = {}) {
        let query;
        if (filters) {
            query = "filters not available"
        }

        let cursor;

        try {
            cursor = await answers.all("SELECT * FROM Answer")
            const answerList = await cursor.toArray();
            const length = answerList.length
            return {answerList, length}

        } catch (e) {
            console.log(`unable to connect: ${e}`)
        }
    };
}