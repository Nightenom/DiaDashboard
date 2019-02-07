function Update(json) {
  json = JSON.parse(json);
  let localDate = new Date();

  let lastUpDate = new Date(json.status[0].now - json.bgs[0].datetime);

  let data = {
    lastUpdate: lastUpDate.getMinutes() ? lastUpDate.getMinutes() : lastUpDate.getSeconds(),
    lastUpdateInSec: !lastUpDate.getMinutes(),

    time: localDate.getHours().make2char() + " : " + localDate.getMinutes().make2char(),

    delta: json.bgs[0].bgdelta,

    battery: json.bgs[0].battery,

    glucose: json.bgs[0].sgv,

    
  };

  writeToScreen(data);
}

function writeToScreen(data){
  console.log(data);
}

function fetchData() {
  var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
               Update(xmlhttp.responseText)
           }
        }
    };
    xmlhttp.open("GET", "http://jimmyscgm.nightscout.cz/pebble", true);
    xmlhttp.send();
}

addEventListener("load",function() {
  setInterval(fetchData,25000);
  fetchData();
});


Number.prototype.make2char = function() {
  let str = this.toString();
  let ln  = str.length;
  if(ln == 2) return str;
  else        return "0" + str;
};
