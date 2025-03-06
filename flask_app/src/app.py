from flask import Flask, render_template,jsonify
import random
def get_real_time_data():
    return {
        "temperature": random.randint(20, 30),  # Random temperature between 20 and 30
        "humidity": random.randint(40, 60),     # Random humidity between 40% and 60%
        "pressure": random.randint(1000, 1020), # Random pressure between 1000 and 1020 hPa
        "windspeed": random.randint(5, 15)      # Random wind speed between 5 and 15 km/h
    }
app = Flask(__name__)
@app.route("/api")
def value_return():
    data=get_real_time_data()
    return jsonify(data)
@app.route("/")
def index():
    return render_template('dashboard.html')  

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
