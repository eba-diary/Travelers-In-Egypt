def lookup(search):
    import sqlite3

    conn = sqlite3.connect('FAQ.db')
    c = conn.cursor()

    c.execute("""SELECT TypeName, Content, Solution 
    FROM QuestionType
    INNER JOIN Question ON Question.QuestionType_id = QuestionType.QuestionType_id
    INNER JOIN QuestionAnswer ON Question.Question_id = QuestionAnswer.Question_id
    INNER JOIN Answer ON Answer.Answer_id =  QuestionAnswer.Answer_id
    WHERE (TypeName LIKE (?)) 
    OR (Content LIKE (?))
    OR (Solution LIKE (?))
    """, ('%'+ search + '%', '%'+ search + '%', '%'+ search + '%' ))
    results = c.fetchall()

    if len(results) != 0: 
        print(results)
    else:
        print("No related content")

    conn.commit()
