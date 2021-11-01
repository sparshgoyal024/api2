from flask import Flask,request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route('/', methods=['GET'])
def hello():
    """Passing parameters below."""
    who=request.args.get('who','CA')
    return f'Welcome {who}!\n'
