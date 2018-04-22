"use strict";

/*
 * BUTTON SETUP
 */
var mpv = document.getElementById("mpv");
var acc = document.getElementById("acc");
var csi = document.getElementById("csi");
var ahd = document.getElementById("ahd");
var efc = document.getElementById("efc");

var switchinfo = function(e, id) {
  let target = e.target.id;
  if (target === "mpv") {
    mpv.innerHTML = "Average distance traveled per vehicle";
  }
  else if (target === "acc") {
    acc.innerHTML = "Extra fuel consumed by vehicles in traffic";
  }
  else if (target === "csi") {
    csi.innerHTML = "Travel time ratio, peak to off hours";
  }
  else if (target === "ahd") {
    ahd.innerHTML = "Total hours of delay per year";
  }
  else if (target === "efc") {
    efc.innerHTML = "Excess fuel used per commuter (gallons)";
  }
};

var switchback = function(e) {
  let target = e.target.id;
  if (target === "mpv") {
    mpv.innerHTML = "Miles Per Vehicle";
  }
  else if (target === "acc") {
    acc.innerHTML = "Annual Congestion Cost";
  }
  else if (target === "csi") {
    csi.innerHTML = "Commuter Stress Index";
  }
  else if (target === "ahd") {
    ahd.innerHTML = "Annual Hours of Delay";
  }
  else if (target === "efc") {
    efc.innerHTML = "Excess Fuel Consumed";
  }
};

for (let button of document.getElementsByClassName("data-button")) {
  button.addEventListener("mouseover", switchinfo);
  button.addEventListener("mouseout", switchback);
}


/*
 * MAP SETUP
 */

let width = 900, height = 500;
var year;
d3.select("#year")
    .on("change",function(){
	d3.select("#data")
	    .text(this.value);
	console.log(this.value);
    });
//should use an ajax call to get the data?
d3.json("https://raw.githubusercontent.com/wertylop5/softdev2_project1/master/data/nielsentopo.json").then(data => {
	console.log("printing data");
	console.log(data);

	let svg = d3.select("#mapContainer").append("svg")
		.attr("width", width)
		.attr("height", height);

	//convert topojson to geojson
	//features property is what has the actual data
	let feature = topojson.feature(data, data.objects.nielsen_dma);
	console.log("printing feature");
	console.log(feature);

	//if lines overlap, only draw one of them
	//returns an object containing an array that defines the lines
	let mesh = topojson.mesh(data, data.objects.nielsen_dma,
			(a, b) => true);
	console.log("printing mesh");
	console.log(mesh);

	//defines the map projection to be used
	//will attempt to fit the projection based on the geojson object
	let projection = d3.geoAlbers()
		.fitExtent([[20, 20], [width-20, height-20]], feature);

	//defines d attribute of path tag
	//the d attribute defines a curve
	let path = d3.geoPath(projection);
	console.log("printing path");
	console.log(path);
    var defaultFill = "#aaa";
    svg.append("g")
	.attr("id","dmas")
	.selectAll("path")
	.data(feature.features)
        .enter()
	.append("path")
	.attr("d", path)
        .on("mouseover", function(d){
	    d3.select(this)
		.attr("fill","orange");
	    console.log(d.properties.dma1);
	    d3.select("#name")
		.text(d.properties.dma1);
	    d3.select("#data")
		.text("yur");
	})
        .on("mouseout", function(d){
	    d3.select(this)
		.attr("fill",defaultFill);
	})
	.attr("fill", defaultFill);
    
	
});
