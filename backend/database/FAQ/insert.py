import sqlite3

conn = sqlite3.connect('FAQ.db')
c = conn.cursor()

# test
TypeName = 'Tech'
QuestionType_id = 1
Content = 'where to find web'
solution = 'on github'

c.execute('''INSERT INTO QuestionType(TypeName)
                  VALUES(?)''', (TypeName,))

c.execute('''INSERT INTO Question(QuestionType_id, Content)
                  VALUES(?,?)''', (1, Content))

c.execute('''INSERT INTO Answer(Solution)
                  VALUES(?)''', (solution,))

c.execute('''INSERT INTO QuestionAnswer(Question_id, Answer_id)
                  VALUES(?,?)''', (1,1))

conn.commit()