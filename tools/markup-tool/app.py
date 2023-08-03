import re
from flask import Flask, request, render_template
from gevent.pywsgi import WSGIServer
from ner.flair_ner import tag_entities
from tei.assemble_tei import create_header, create_xml, create_body
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)

CORS(
    app, 
    supports_credentials=True, 
    methods=['GET', 'POST', 'OPTIONS'], 
    # resources={
    #     r"/*": {
    #         "origins": [
    #             "http://localhost:3000", 
    #             "https://travelers-in-egypt-preview.vercel.app", 
    #             "https://travelers-in-egypt.vercel.app"
    #         ]
    #     }
    # }
)


# origins = [
#     "http://localhost:3000", 
#     "https://travelers-in-egypt-preview.vercel.app", 
#     "https://travelers-in-egypt.vercel.app"
# ]

# @app.after_request
# def add_cors_headers(response):
#     r = request.referrer
#     if not r:
#         r = origins[2]
#     else:
#         r = r[:-1]

#     if r in origins:
#         response.headers.add('Access-Control-Allow-Origin', r)
#         response.headers.add('Access-Control-Allow-Credentials', 'true')
#         response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
#         response.headers.add('Access-Control-Allow-Headers', 'Cache-Control')
#         response.headers.add('Access-Control-Allow-Headers', 'X-Requested-With')
#         response.headers.add('Access-Control-Allow-Headers', 'Authorization')
#         response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
#     return response

@app.route('/')
def index():
    return json.dumps('Historical Markup Tool api')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/output')
def output():
    return render_template('output.html')


@app.route('/', methods=['POST'])
@cross_origin()
def submit_text():
    title = request.form['teiHeaderTitle']
    author = request.form['teiHeaderAuthor']
    editor = request.form['teiHeaderEditor']
    publisher = request.form['teiHeaderPublisher']
    publisher_address = request.form['teiHeaderPublisherAddress']
    publication_date = request.form['teiHeaderPublicationDate']
    license_desc = request.form['teiHeaderLicense']
    project_description = request.form['teiHeaderProjectDescription']
    source_description = request.form['teiHeaderSourceDescription']

    project_description = re.sub('\n|\t\r|\r\n', ' ', project_description)
    project_description = re.sub(' +', ' ', project_description)
    if project_description != '':
        project_description = tag_entities(project_description)

    source_description = re.sub('\n|\t\r|\r\n', ' ', source_description)
    source_description = re.sub(' +', ' ', source_description)
    if source_description != '':
        source_description = tag_entities(source_description
                                          )
    # Create header
    tei_header = create_header(title, author, editor, publisher, publisher_address,
                               publication_date, license_desc, project_description, source_description)

    # Create body
    text = request.form['rawText']
    text = re.sub('\n|\t\r|\r\n', ' ', text)
    text = re.sub(' +', ' ', text)

    flair_output = tag_entities(text)
    tei_body = create_body(flair_output)

    # Assemble document
    tei_document = create_xml(tei_header, tei_body).decode('unicode-escape')

    return json.dumps(tei_document)


if __name__ == '__main__':
    # app.run(host='0.0.0.0', port='1107', debug=True)
    WSGIServer(('127.0.0.1', 5000), app).serve_forever()