from flask import Flask, render_template,jsonify
import call_firebase as callfb
from flask_cors import CORS

callfb.intialise()
def get_real_time_data():
    data=callfb.get_values()
    if (data):
        return(data)
    else:
        return('error')
app = Flask(__name__)
cors = CORS(app, resources={r"/api": {"origins": "http://localhost:5000"}})
@app.route("/api")
def value_return():
    data=get_real_time_data()
    return jsonify(data)
@app.route("/")
def index():
    return render_template('dashboard.html')  

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)