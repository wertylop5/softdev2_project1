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

@app.route("/traffic-temp")
def temp():
	names = set()
	res = ""
	
	bad = [
	"Cincinnati OH-KY-IN",
	"McAllen TX",
	"Madison WI",
	"Milwaukee WI",
	"Toledo OH-MI",
	"San Antonio TX",
	"Stockton CA",
	"New York-Newark NY-NJ-CT",
	"Laredo TX",
	"Knoxville TN",
	"San Juan PR",
	"San Diego CA",
	"Greensboro NC",
	"Wichita KS",
	"Worcester MA-CT",
	"Cape Coral FL",
	"Indio-Cathedral City CA",
	"Minneapolis-St. Paul MN-WI",
	"Hartford CT",
	"Louisville-Jefferson County KY-IN",
	"Salt Lake City-West Valley City UT",
	"Springfield MA-CT",
	"Poughkeepsie-Newburgh NY-NJ",
	"Houston TX",
	"Tulsa OK",
	"Richmond VA",
	"Salem OR",
	"Las Vegas-Henderson NV",
	"Spokane WA",
	"Colorado Springs CO",
	"Omaha NE-IA",
	"Fresno CA",
	"Nashville-Davidson TN",
	"Oxnard CA",
	"Indianapolis IN",
	"Raleigh NC",
	"Columbia SC",
	"Kansas City MO-KS",
	"Pittsburgh PA",
	"Brownsville TX",
	"Honolulu HI",
	"Dayton OH",
	"Akron OH",
	"Dallas-Fort Worth-Arlington TX",
	"Riverside-San Bernardino CA",
	"Birmingham AL",
	"Eugene OR",
	"New Orleans LA",
	"Detroit MI",
	"Allentown PA-NJ",
	"Denver-Aurora CO",
	"Pensacola FL-AL",
	"Sacramento CA",
	"Grand Rapids MI",
	"Charleston-North Charleston SC",
	"Charlotte NC-SC",
	"Rochester NY",
	"Washington DC-VA-MD",
	"Anchorage AK",
	"Provo-Orem UT",
	"Philadelphia PA-NJ-DE-MD",
	"Miami FL",
	"Cleveland OH",
	"Austin TX",
	"Winston-Salem NC",
	"New Haven CT",
	"Oklahoma City OK",
	"Bridgeport-Stamford CT-NY",
	"Tucson AZ",
	"Providence RI-MA",
	"Chicago IL-IN",
	"St. Louis MO-IL",
	"Boise ID",
	"Jackson MS",
	"Columbus OH",
	"Beaumont TX",
	"Albuquerque NM",
	"Buffalo NY",
	"Little Rock AR",
	"Orlando FL",
	"Seattle WA",
	"Phoenix-Mesa AZ",
	"Jacksonville FL",
	"Sarasota-Bradenton FL",
	"San Jose CA",
	"Bakersfield CA",
	"Boulder CO",
	"Baltimore MD",
	"Los Angeles-Long Beach-Anaheim CA",
	"Memphis TN-MS-AR",
	"Albany-Schenectady NY",
	"Atlanta GA",
	"Boston MA-NH-RI",
	"Virginia Beach VA",
	"San Francisco-Oakland CA",
	"Baton Rouge LA",
	"Portland OR-WA",
	"Lancaster-Palmdale CA",
	"El Paso TX-NM",
	"Corpus Christi TX",
	"Tampa-St. Petersburg FL"
	]
	
	good = [
	"Cincinnati, OH",
	"Harlingen-Weslaco-Brownsville-McAllen, TX",
	"Madison, WI",
	"Milwaukee, WI",
	"Toledo, OH",
	"San Antonio, TX",
	"Sacramento-Stockton-Modesto, CA",
	"New York, NY",
	"Laredo, TX",
	"Knoxville, TN",
	"",
	"San Diego, CA",
	"Greensboro-High Point-Winston Salem, NC",
	"Wichita-Hutchinson, KS Plus",
	"",
	"",
	"",
	"Minneapolis-St. Paul, MN",
	"Hartford & New Haven, CT",
	"Louisville, KY",
	"Salt Lake City, UT",
	"Springfield-Holyoke, MA",
	"",
	"Houston, TX",
	"Tulsa, OK",
	"Richmond-Petersburg, VA",
	"",
	"Las Vegas, NV",
	"Spokane, WA",
	"Colorado Springs-Pueblo, CO",
	"Omaha, NE",
	"Fresno-Visalia, CA",
	"Nashville, TN",
	"",
	"Indianapolis, IN",
	"Raleigh-Durham (Fayetteville), NC",
	"Columbia, SC",
	"Kansas City, MO",
	"Pittsburgh, PA",
	"Harlingen-Weslaco-Brownsville-McAllen, TX",
	"",
	"Dayton, OH",
	"",
	"Dallas-Ft. Worth, TX",
	"",
	"Birmingham (Anniston and Tuscaloosa), AL",
	"Eugene, OR",
	"New Orleans, LA",
	"Detroit, MI",
	"",
	"Denver, CO",
	"Mobile, AL-Pensacola (Ft. Walton Beach), FL",
	"Sacramento-Stockton-Modesto, CA",
	"Grand Rapids-Kalamazoo-Battle Creek, MI",
	"Charleston, SC",
	"Charlotte, NC",
	"Rochester, NY",
	"Washington, DC (Hagerstown, MD)",
	"",
	"",
	"Philadelphia, PA",
	"Miami-Fort Lauderdale, FL",
	"Cleveland-Akron (Canton), OH",
	"Austin, TX",
	"Greensboro-High Point-Winston Salem, NC",
	"",
	"Oklahoma City, OK",
	"",
	"Tucson (Sierra Vista), AZ",
	"Providence, RI-New Bedford, MA",
	"Chicago, IL",
	"St. Louis, MO",
	"Boise, ID",
	"Jackson, MS",
	"Columbus, OH",
	"Beaumont-Port Arthur, TX",
	"Albuquerque-Santa Fe, NM",
	"Buffalo, NY",
	"Little Rock-Pine Bluff, AR",
	"Orlando-Daytona Beach-Melbourne, FL",
	"Seattle-Tacoma, WA",
	"Phoenix, AZ",
	"Jacksonville, FL",
	"",
	"",
	"Bakersfield, CA",
	"",
	"Baltimore, MD",
	"Los Angeles, CA",
	"Memphis, TN",
	"Albany-Schenectady-Troy, NY",
	"Atlanta, GA",
	"Boston, MA (Manchester, NH)",
	"",
	"San Francisco-Oakland-San Jose, CA",
	"Baton Rouge, LA",
	"Portland, OR",
	"",
	"El Paso, TX",
	"Corpus Christi, TX",
	"Tampa-St. Petersburg (Sarasota), FL"
	]
	
	
	#print traffic data names
	with open("data/traffic-data.json") as data_file:
		data = json.load(data_file)
		for entry in data:
			#names.add(entry["Urban Area"])
			try:
				index = bad.index(entry["Urban Area"])
				entry["Urban Area"] = good[index]
			except ValueError:
				pass
		'''for entry in names:
			res += entry
			res += "<br>"'''
		better = open("data/new.json", "w")
		json.dump(data, better)
		better.close()
	return res

@app.route("/nielsen-temp")
def temp2():
	names = set()
	res = ""
	#print traffic data names
	with open("data/nielsentopo.json") as data_file:
		data = json.load(data_file)
		for entry in data["objects"]["nielsen_dma"]["geometries"]:
			names.add(entry["properties"]["dma1"])
		for entry in names:
			res += entry
			res += "<br>"
	return res

if __name__ == "__main__":
	app.debug = True
	app.run()

