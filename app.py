from flask import Flask, render_template
import csv, json

app = Flask(__name__)

@app.route("/")
def root():
	return render_template("base.html")

if __name__ == "__main__":
	app.debug = True
	app.run()

