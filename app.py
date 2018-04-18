from flask import Flask, render_template
import csv, json

app = Flask(__name__)

@app.route("/")
def root():
	return render_template("base.html")

#used by the page to obtain csv data
@app.route("/data", methods=["GET", "POST"])
def data():
	temp = set()
        res = ""
	with open("data/traffic-data.csv") as data_file:
		reader = csv.DictReader(data_file)
		for row in reader:
                        temp.add(row["Urban Area"])
        for s in temp:
            res += s
            res += "<br>"
	return res

@app.route("/temp")
def temp():
	with open("data/traffic-data.json") as data_file:
		data = json.load(data_file)
		return str(data)

if __name__ == "__main__":
	app.debug = True
	app.run()

