from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify(message="Hello, Flask!")

@app.route('/about')
def about():
    return jsonify(message="This is the About page")

@app.route('/multiply/<int:x>/<int:y>')
def multiply(x, y):
    result = x * y
    return jsonify(result=result)

if __name__ == '__main__':
    app.run(debug=True)
