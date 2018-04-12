from flask import Flask, render_template
import csv

app = Flask(__name__)

@app.route("/")
def root():
	return render_template("base.html")

@app.route("/data", methods=["POST"])
def data():
	res = ""
	with open("data/traffic-data.csv") as data_file:
		reader = csv.reader(data_file)
		for row in reader:
			print row
	return ""

if __name__ == "__main__":
	app.debug = True
	app.run()

