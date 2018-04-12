var mpv = document.getElementById("mpv");
var acc = document.getElementById("acc");
var csi = document.getElementById("csi");
var ahd = document.getElementById("ahd");
var efc = document.getElementById("efc");

var switchinfo = function(e, id) {
  mpv.innerHTML = "more description stuff";
};

var switchback = function(e) {
  mpv.innerHTML = "Miles Per Vehicle";
};

mpv.addEventListener("mouseover", switchinfo);
mpv.addEventListener("mouseout", switchback);
