"use strict";

/*
 * BUTTON SETUP
 */
var mpv = document.getElementById("mpv");
var acc = document.getElementById("acc");
var csi = document.getElementById("csi");
var ahd = document.getElementById("ahd");
var efc = document.getElementById("efc");

var pressed = mpv;

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
    ahd.innerHTML = "Annual hours of delay per commuter";
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

for (let button of document.getElementsByClassName("data-button")){
    button.addEventListener("mouseover", switchinfo);
    button.addEventListener("mouseout", switchback);
    button.addEventListener("click",function(e){
	let target = e.target.id;
	if (target === "mpv") {
	    pressed = mpv ;
	}
	else if (target === "acc") {
	    pressed = acc;
	}
	else if (target === "csi") {
	    pressed = csi;
	}
	else if (target === "ahd") {
	    pressed = ahd;
	}
	else if (target === "efc") {
	    pressed = efc;
	}
	//console.log(pressed.innerHTML);
	d3.select("#mapContainer").select("svg").select("g").selectAll("path").each((d, i, nodes) => {
		colorexec(d, nodes[i]);
	});
    });
}
			   

			   
			   
			   
			   
    
			   


/*
 * MAP SETUP
 */

let width = 900, height = 500;
var year =1997;
const color_h = 122;
const color_s = 62;
let color_l;
var defaultFill = "#aaa";
    
function colorexec(d, that) {
	//console.log(that.value);
	function componentToHex(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}

	function rgbToHex(r, g, b) {
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}

	function hslToRgb(h, s, l){
		var r, g, b;

		if(s == 0){
			r = g = b = l; // achromatic
		}else{
			var hue2rgb = function hue2rgb(p, q, t){
				if(t < 0) t += 1;
				if(t > 1) t -= 1;
				if(t < 1/6) return p + (q - p) * 6 * t;
				if(t < 1/2) return q;
				if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
				return p;
			}

			var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			var p = 2 * l - q;
			r = hue2rgb(p, q, h + 1/3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1/3);
		}

		return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	}
	function hsltohex(h, s, l) {
		let temp = hslToRgb(h/360, s/100, l/100);
		return rgbToHex(temp[0], temp[1], temp[2]);
	}


	
		
	if (d.properties.data != null) {
		if (pressed.id === "mpv") {
			let color = d3.scaleQuantize()
				.domain([2000, 280000])
				.range([10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90]);
			color_l = color((d.properties.data[year]["Arterial Street Daily Vehicle-Miles of Travel"] +
				d.properties.data[year]["Freeway Daily Vehicle-Miles of Travel"]));
		}
		else if (pressed.id === "acc") {
			let color = d3.scaleQuantize()
				.domain([0, 20000])
				.range([10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90]);
			color_l = color(d.properties.data[year]["Annual Congestion Cost Total Dollars (million)"]);
		}
		else if (pressed.id === "csi") {
			let color = d3.scaleQuantize()
				.domain([1, 2])
				.range([10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90]);
			color_l = color(d.properties.data[year]["Commuter Stress Index Value"]);
		}
		else if (pressed.id === "ahd") {
			let color = d3.scaleQuantize()
				.domain([0, 90])
				.range([10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90]);
			color_l = color(d.properties.data[year]["Annual Hours of Delay per Auto Commuter"]);
		}
		else if (pressed.id === "efc") {
			let color = d3.scaleQuantize()
				.domain([0, 300000])
				.range([10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90]);
			color_l = color(d.properties.data[year]["Annual Excess Fuel Consumed Total Gallons"]);
		}
	
		d3.select(that)
		.attr("fill",hsltohex(color_h, color_s, 100-color_l));
	}
	else {
		d3.select(that)
		.attr("fill",defaultFill);
	}
}
//should use an ajax call to get the data?
d3.json("https://raw.githubusercontent.com/wertylop5/softdev2_project1/master/data/nielsentopo.json").then(data => {
	//console.log("printing data");
	//console.log(data);

	let svg = d3.select("#mapContainer").append("svg")
		.attr("width", width)
		.attr("height", height);

	//convert topojson to geojson
	//features property is what has the actual data
	let feature = topojson.feature(data, data.objects.nielsen_dma);
	//console.log("printing feature");
	//console.log(feature);

	//defines the map projection to be used
	//will attempt to fit the projection based on the geojson object
	let projection = d3.geoAlbers()
		.fitExtent([[20, 20], [width-20, height-20]], feature);

	//defines d attribute of path tag
	//the d attribute defines a curve
	let path = d3.geoPath(projection);
	
	
	//associate data with each media market in json
	d3.json("https://raw.githubusercontent.com/wertylop5/softdev2_project1/master/data/new-data.json").then(traffic_data => {
		for (let counter = 0; counter < feature.features.length; counter++) {
			let prop = feature.features[counter].properties;
			for (let traffic_item of traffic_data) {
				if (traffic_item["Urban Area"] === prop["dma1"]) {
					if (prop.data == null) prop.data = {};
					prop.data[traffic_item["Year"]] = traffic_item;
				}
			}
		}
		
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
				d3.select("#name")
				.text(d.properties.dma1);
				
				if (d.properties.data != null) {
					let temp;
					if (pressed.id === "mpv") {
						temp = d.properties.data[year]["Arterial Street Daily Vehicle-Miles of Travel"] +
							d.properties.data[year]["Freeway Daily Vehicle-Miles of Travel"];
					}
					else if (pressed.id === "acc") {
						temp = d.properties.data[year]["Annual Congestion Cost Total Dollars (million)"];
					}
					else if (pressed.id === "csi") {
						temp = d.properties.data[year]["Commuter Stress Index Value"];
					}
					else if (pressed.id === "ahd") {
						temp = d.properties.data[year]["Annual Hours of Delay per Auto Commuter"];
					}
					else if (pressed.id === "efc") {
						temp = d.properties.data[year]["Annual Excess Fuel Consumed Total Gallons"];
					}
					d3.select("#data")
						.text( pressed.innerHTML+ ":"+temp);
				}
				else {
					d3.select("#data")
						.text( "No data available");
				}
			})
			.on("mouseout", function(d){
				colorexec(d, this);
			})
			.attr("fill", defaultFill);
			d3.select("#year")
			.on("change",function(){
				year = parseInt(this.value);
				svg.select("g").selectAll("path").each((d, i, nodes) => {
					colorexec(d, nodes[i]);
				});
			});
	});
});

if ("createEvent" in document) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
    document.getElementById("year").dispatchEvent(evt);
}
else
    document.getElementById("year").fireEvent("onchange");


