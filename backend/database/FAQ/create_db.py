import sqlite3

conn = sqlite3.connect('FAQ.db')
c = conn.cursor()

#Create tables
def create_table():
    # table QuestionType
    c.execute('''CREATE TABLE IF NOT EXISTS QuestionType(
        [QuestionType_id] INTEGER PRIMARY KEY, 
        [TypeName] TEXT)''')

    # table Question
    c.execute('''CREATE TABLE IF NOT EXISTS Question(
        [Question_id] INTEGER PRIMARY KEY, 
        [QuestionType_id] INTEGER, 
        [Content] TEXT,
        FOREIGN KEY (QuestionType_id) REFERENCES QuestionType (QuestionType_id))''')

    # table Answer
    c.execute('''CREATE TABLE IF NOT EXISTS Answer(
        [Answer_id] INTEGER PRIMARY KEY, 
        [Solution] TEXT)''')

    # table QuestionAnswer
    c.execute('''CREATE TABLE IF NOT EXISTS QuestionAnswer(
        [QuestionAnswer_id] INTEGER PRIMARY KEY, 
        [Question_id] INTEGER,
        [Answer_id] INTEGER,
        FOREIGN KEY (Question_id) REFERENCES Question (Question_id),
        FOREIGN KEY (Answer_id) REFERENCES Answer (Answer_id))''')

create_table()

# Commit command 
conn.commit()