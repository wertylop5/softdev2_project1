"use strict";

let width = 900, height = 500;

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
		.fitExtent([[20, 20], [615, 380]], feature);

	//defines d attribute of path tag
	//the d attribute defines a curve
	let path = d3.geoPath(projection);
	console.log("printing path");
	console.log(path);

	svg.append("path")
		.datum(mesh)
		.attr("class", "border")
		.attr("d", path);
});
