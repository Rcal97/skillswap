from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient("mongodb://localhost:27017/")
db = client["skillswap"]
collection = db["offerte"]

@app.route("/")
def index():
	return render_template("index.html")

if __name__ == "__main__":
	app.run(debug = True)