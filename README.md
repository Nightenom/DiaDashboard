# Diashboard

>Jsem diabetik a potřeboval bych v noci vidět aktuální stav glykémie, deltu oproti poslednímu měření glykémie, trendovou šipku a taky hodiny a čas od posledního změření glykémie. Tyhle data by se mi zobrazovaly na displeji tabletu, kterej bych používal jako hodiny na noční stolek v ložnici. Viz obrázek. Data by se tahala ze serveru.

>To by byla fáze jedna.. Fáze dvě by byla, aby uživatel v nějakým menu mohl měnit font, velikost fontu jednotlivých položek, barvu textu a aby se hodiny podle času východu a západu slunce inverzně měnily (v noci černé pozadí, ve dve bílé pozadí)..

>Fáze tři by byla naprogramovat to jako aplikaci pro android..

![](https://scontent-prg1-1.xx.fbcdn.net/v/t1.15752-0/p280x280/49072138_779223495777273_4552193591732076544_n.png?_nc_cat=102&_nc_ht=scontent-prg1-1.xx&oh=b52272368c82680adeed999ff43592b2&oe=5CBEF680)

### input
```json
{"status":[{"now":1546609408942}],"bgs":[{"sgv":"7.1","trend":5,"direction":"FortyFiveDown","datetime":1546609366000,"bgdelta":"-0.4","battery":"88","iob":"11.14","bwp":"-9.75","bwpo":-9.6,"cob":45}],"cals":[]}
```

### plan
  - [ ] 1: static reading
  - [ ] 2: tile system - resizing, repositioning ?
  - [ ] 3: color, font, etc. selectors
  - [ ] 4: day/night color profiles
  - [ ] 5: Android app

##### notes
  - HTML5, JS, CSS3, no jQuery, as few libraries as possible
  - create your branches a use PRs to push into master branch
  - live preview will be available soon
