const refreshInterval = 25000,
    dataUrl = "http://jimmyscgm.nightscout.cz/pebble"; // TODO: settings

const dateFormatter = new Intl.NumberFormat('en-IN', {
    minimumIntegerDigits: 2,
    useGrouping: false
});
const arrows = {
    DoubleDown: "&#x21CA;",
    SingleDown: "&#x2193;",
    FortyFiveDown: "&#x2198;",
    Flat: "&#x2192;",
    FortyFiveUp: "&#x2197;",
    SingleUp: "&#x2191;",
    DoubleUp: "&#x21C8;"
};
const allowDrag = false;
var previewInEditMode = false;

window.onload = function() {
    FetchData();
    toggleSettings(); // Hide settings by default
    saveBaseTextSizes();
    updateTextSizeMult(true);
}

function FetchData() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
            if(xmlhttp.status == 200) {
                ParseData(xmlhttp.responseText);
                setTimeout(FetchData, refreshInterval);
            } else {
                setTimeout(FetchData, refreshInterval * 2);
            }
        }
    };
    xmlhttp.onerror = function() {
        setTimeout(FetchData, refreshInterval * 2);
    };
    xmlhttp.open("GET", dataUrl, true);
    xmlhttp.send();
}

function ParseData(json) {
    json = JSON.parse(json);
    console.info(json); //TODO: remove in production

    if(json.status == undefined || json.bgs == undefined) {
        console.error("wrong data format"); // TODO: error handling - console on display?
        return;
    }

    const localDate = new Date(),
        lastMeasureDate = new Date(json.status[0].now - json.bgs[0].datetime);

    //battery: json.bgs[0].battery

    document.getElementById("time").innerText = dateFormatter.format(localDate.getHours()) + " : " + dateFormatter.format(localDate.getMinutes());
    document.getElementById("lastMeasureDate").innerText = lastMeasureDate.getMinutes() > 0 ? lastMeasureDate.getMinutes() + " min" : lastMeasureDate.getSeconds() + " sec";
    document.getElementById("glucose").innerText = json.bgs[0].sgv;
    document.getElementById("trendArrow").innerHTML = arrows[json.bgs[0].direction];
    document.getElementById("delta").innerText = json.bgs[0].bgdelta;
}

var settingsMode = true;

function toggleSettings() {
    settingsMode = !settingsMode;
    let boxes = document.getElementsByClassName("box");
    if(allowDrag){
      for(var i = 0; i < boxes.length; i++) {
        boxes[i].draggable = settingsMode;
      }
    }
    for(var i = 0; i < boxes.length; i++) {
      boxes[i].style.display = settingsMode && !previewInEditMode ? "none" : "inline-block";
    }
    document.getElementById("settings").style.display = settingsMode ? "block" : "none";
}

let moveOffsetX,moveOffsetY;

function StartMove(event) {
  console.log(event);
  let mouseX = event.pageX, mouseY = event.pageY;
  let elementX = 0+event.srcElement.style.top.split("px")[0];
  let elementY = 0+event.srcElement.style.top.split("px")[0];
  moveOffsetX = elementX - mouseX;
  moveOffsetY = elementY - mouseY;
}

function Move(event) {
    console.info(event);
    event.srcElement.style.left = event.pageX + moveOffsetX + "px";
    event.srcElement.style.top  = event.pageY + moveOffsetY + "px";
}

const baseTextSizes = [];
function saveBaseTextSizes() {
  let boxes = document.getElementsByClassName("box");
  for(var i = 0; i < boxes.length; i++) {
    const fontSize = getComputedStyle(boxes[i]).fontSize;
    baseTextSizes.push(Number(fontSize.substring(0,fontSize.length-3))); // 3 for "rem"
  }
}

function applyTextSizeMult(mult) {
  let boxes = document.getElementsByClassName("box");
  for(var i = 0; i < boxes.length; i++) {
    boxes[i].style.fontSize = baseTextSizes[i] * mult + "rem";
  }
}
