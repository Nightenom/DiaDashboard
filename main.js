const fetchInterval = 25000;
const dataUrl = "http://jimmyscgm.nightscout.cz/pebble";

const dateFormatter = new Intl.NumberFormat('en-IN', {
    minimumIntegerDigits: 2
});

const arrows = {
    DoubleDown:    "&#x21CA;",
    SingleDown:    "&#x2193;",
    FortyFiveDown: "&#x2198;",
    Flat:          "&#x2192;",
    FortyFiveUp:   "&#x2197;",
    SingleUp:      "&#x2191;",
    DoubleUp:      "&#x21C8;"
};

addEventListener("load", function() {
    fetchData();
});

function update(json) {
    json = JSON.parse(json);
    const localDate = new Date();

    const lastUpDate = new Date(json.status[0].now - json.bgs[0].datetime);

    const data = {
        lastUpdate: lastUpDate.getMinutes() ? lastUpDate.getMinutes() : lastUpDate.getSeconds(),
        lastUpdateInSec: !lastUpDate.getMinutes(),

        time: dateFormatter.format(localDate.getHours()) + " : " + dateFormatter.format(localDate.getMinutes()),

        delta: json.bgs[0].bgdelta,

        battery: json.bgs[0].battery,

        glucose: json.bgs[0].sgv,

        trendArrow: arrows[json.bgs[0].direction]
    };

    writeToScreen(data);
}

function writeToScreen(data) {
    console.log(data);

    document.getElementById("time").innerText = data.time;
    document.getElementById("lastUpdate").innerText = data.lastUpdate + (data.lastUpdateInSec ? " sec" : " min");
    document.getElementById("glucose").innerText = data.glucose;
    document.getElementById("trendArrow").innerHTML = data.trendArrow;
    document.getElementById("delta").innerText = data.delta;
}

function fetchData() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
            if(xmlhttp.status == 200) {
                update(xmlhttp.responseText);
                setTimeout(fetchData, fetchInterval);
            } else {
                setTimeout(fetchData, fetchInterval * 2);
            }
        }
    };
    xmlhttp.onerror = function() {
        setTimeout(fetchData, fetchInterval * 2);
    };
    xmlhttp.open("GET", dataUrl, true);
    xmlhttp.send();
}

function Move(event) {
    console.info(event);
    event.srcElement.style.left = event.clientX + "px";
    event.srcElement.style.top = event.clientY + "px";
}
