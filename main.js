const fetchInterval = 25000;
const dataUrl = "http://jimmyscgm.nightscout.cz/pebble";

addEventListener("load",function() {
  FetchData();
});

function Update(json) {
  json = JSON.parse(json);
  let localDate = new Date();

  let lastUpDate = new Date(json.status[0].now - json.bgs[0].datetime);

  let data = {
    lastUpdate: lastUpDate.getMinutes() ? lastUpDate.getMinutes() : lastUpDate.getSeconds(),
    lastUpdateInSec: !lastUpDate.getMinutes(),

    time: localDate.getHours().pad(2) + " : " + localDate.getMinutes().pad(2),

    delta: json.bgs[0].bgdelta,

    battery: json.bgs[0].battery,

    glucose: json.bgs[0].sgv,
  };

  WriteToScreen(data);
}

function WriteToScreen(data){
  console.log(data);
}

function FetchData() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
     if (xmlhttp.status == 200) {
       Update(xmlhttp.responseText);
       setTimeout(FetchData, fetchInterval);
     } else {
       setTimeout(FetchData, fetchInterval * 2);
     }
    }
  };
  xmlhttp.onerror = function(){
    setTimeout(FetchData, fetchInterval * 2);
  };
  xmlhttp.open("GET", dataUrl, true);
  xmlhttp.send();
}

Number.prototype.pad = function(width, z) {
  z = z || '0';
  let n = this.toString();
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};
