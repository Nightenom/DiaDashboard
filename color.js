const defaultColor = [
  255,255,255,
  0  ,0  ,0  ,
];

addEventListener("load",function() {
  for (var i = 0; i < 6; i++) {
    const slider = document.getElementById("colorSlider"+i);
    const input = document.getElementById("colorNumber"+i);
    const val = localStorage["color"+i] || defaultColor[i];

    slider.oninput = updateColor.bind(null, slider, input, i);
    input. oninput = updateColor.bind(null, input, slider, i);

    input.value = val;
    updateColor(input, slider, i);
  }
});

function updateColor(from, to, i) {
  to.value = from.value;
  localStorage["color"+i] = from.value;
  if(i < 3){
    const r = localStorage["color0"],
          g = localStorage["color1"],
          b = localStorage["color2"];
    document.body.style.color = `rgb(${r},${g},${b})`;
  } else {
    const r = localStorage["color3"],
          g = localStorage["color4"],
          b = localStorage["color5"];
    document.body.style.backgroundColor = `rgb(${r},${g},${b})`;
  }
}
