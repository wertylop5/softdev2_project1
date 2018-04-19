var mpv = document.getElementById("mpv");
var acc = document.getElementById("acc");
var csi = document.getElementById("csi");
var ahd = document.getElementById("ahd");
var efc = document.getElementById("efc");

var switchinfo = function(e, id) {
  let target = e.target.id;
  if (target === "mpv") {
    mpv.innerHTML = "more description stuff";
  }
  else if (target === "acc") {
    acc.innerHTML = "more description stuff";
  }
  else if (target === "csi") {
    csi.innerHTML = "more description stuff";
  }
  else if (target === "ahd") {
    ahd.innerHTML = "more description stuff";
  }
  else if (target === "efc") {
    efc.innerHTML = "more description stuff";
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

for (button of document.getElementsByClassName("data-button")) {
  button.addEventListener("mouseover", switchinfo);
  button.addEventListener("mouseout", switchback);
}

