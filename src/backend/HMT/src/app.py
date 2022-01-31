import re
from flask import Flask, request, render_template, Response
from flask_cors import CORS
from gevent.pywsgi import WSGIServer
from ner.flair_ner import tag_entities
from assemble_tei import create_header, create_xml, create_body

app = Flask(__name__, static_folder='../../../build')
cors = CORS(app, resources={'/*':{'origins': 'http://localhost:3000'}})

@app.route('/')
def index():
    return render_template('markup.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/output')
def output():
    return render_template('output.html')


@app.route('/HistoricalMarkupTool/output', methods=['POST'])
def submit_text():
    data = request.json
    title = data['teiHeaderTitle']
    author = data['teiHeaderAuthor']
    editor = data['teiHeaderEditor']
    publisher = data['teiHeaderPublisher']
    publisher_address = data['teiHeaderPublisherAddress']
    publication_date = data['teiHeaderPublicationDate']
    license_desc = data['teiHeaderLicense']
    project_description = data['teiHeaderProjectDescription']
    source_description = data['teiHeaderSourceDescription']

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
    text = data['rawText']
    text = re.sub('\n|\t\r|\r\n', ' ', text)
    text = re.sub(' +', ' ', text)

    flair_output = tag_entities(text)
    tei_body = create_body(flair_output)

    # Assemble document
    tei_document = create_xml(tei_header, tei_body).decode('unicode-escape')
    return Response(tei_document, mimetype='text/plain')
    # return render_template('output.html',
                        #    tei=tei_document)


if __name__ == '__main__':
    # WSGIServer(('0.0.0.0', 8080), app).serve_forever()
    app.run(debug=True)
