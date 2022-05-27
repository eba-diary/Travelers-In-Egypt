import FAQDao from "../data-access/FAQDao";

export default class FAQController {
    static async apiGetAnswers(req, res, next) {
        let filters = null
        let page = 0
        let answersPerPage = 15
        const { answerList, length } = await FAQDao.getAnswers({filters, page, answersPerPage})

        let response = {
            answerList: answerList,
            length: length
        }
        res.json(response)
    }
}