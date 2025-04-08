from flask import Flask, render_template,jsonify,request
import call_firebase as callfb
from flask_cors import CORS
import api
import base64
def get_token():
    with open('/var/run/secrets/kubernetes.io/serviceaccount/token', 'r') as f:
        return f.read().strip()
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
@app.route("/notifications",methods=['POST'])
def notification():
    if request.method == 'POST':
           request_data = request.get_json()
           key = request_data["key"]
           key = base64.b64encode(key.encode()).decode()
           api.send_key(key,get_token)
           return jsonify({"status": "success", "key": key}), 200 
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)