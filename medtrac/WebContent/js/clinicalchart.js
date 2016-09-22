// A4 at 200PPI
var width = 1654; 
var height = 2339;
var tablexorigin = 150;
var tableyorigin = 100;
var tablewidth = 1590;
var tableheight = 1963;
var boldlinestroke = 2;
var borderlinestroke = 2.5;
var cellwidth = 33;
var narrowcellheight = 11;
var pscellheight = 22;
var stdcellheight = 33;
var broadcellheight = 44;
var cellxorigin = 350;
var vertbold = cellwidth * 6; // bold on every 6 lines
var timescaleyorigin = 180;
var temperatureyorigin = 200;
var scalelabelyoffset = 3;
var temperatureboldoffset = temperatureyorigin + (narrowcellheight * 2);
var temperaturehbold = narrowcellheight * 5; // bold on every 5 lines
var temperatureheight = temperatureyorigin + (narrowcellheight * 24);
var bpyorigin = temperatureheight;
var bpboldoffset = bpyorigin + (narrowcellheight * 2);
var bphbold = narrowcellheight * 2; // bold on every 2 lines
var bpheight = bpyorigin + (narrowcellheight * 34);
var pulseyorigin = bpheight;
var pulseboldoffset = pulseyorigin+narrowcellheight;
var pulsehbold = narrowcellheight * 2; // bold on every 2 lines
var pulseheight = pulseyorigin + (narrowcellheight * 27);
var respirationyorigin = pulseheight;
var respirationboldoffset = respirationyorigin+narrowcellheight;
var respirationhbold = narrowcellheight * 2; // bold on every 2 lines
var respirationheight = respirationyorigin + (narrowcellheight * 7);
var spo2yorigin = respirationheight;
var spo2boldofffset = spo2yorigin+narrowcellheight;
var spo2hbold = narrowcellheight * 2; // bold on every 2 lines
var spo2height = spo2yorigin + (narrowcellheight * 4);
var o2modeyorigin = spo2height;
var flowrateyorigin = o2modeyorigin + stdcellheight;
var painsiteyorigin = flowrateyorigin + stdcellheight;
var innerwidth = cellxorigin + (cellwidth * 36); // 36 columns
var narrowheight = o2modeyorigin;
var stdheight1 = narrowheight + (stdcellheight * 3);
var painscoreyorigin = stdheight1;
var painscoreheight = painscoreyorigin + (pscellheight * 12);
var characteryorigin = painscoreheight;
var characterheight = characteryorigin + stdcellheight;
var characteryorigin = painscoreheight;
var characterheight = characteryorigin + stdcellheight;
var patternyorigin = characterheight;
var patternheight = patternyorigin + broadcellheight;
var concernyorigin = patternheight;
var concernheight = concernyorigin + broadcellheight;
var tickboxyorigin = concernheight;
var tickboxcellheight = 50;
var tickboxheight = tickboxyorigin + tickboxcellheight;
var doublelineyorigin = tickboxheight;
var doublelinecellheight = 5;
var doublelineheight = doublelineyorigin + doublelinecellheight;
var weightyorigin = doublelineheight;
var weightheight = weightyorigin + stdcellheight;
var defecationyorigin = weightheight;
var defecationheight = defecationyorigin + stdcellheight;
var drainsyorigin = defecationheight;
var drainsheight = drainsyorigin + stdcellheight;
var blank1yorigin = drainsheight;
var blank1height = blank1yorigin + stdcellheight;
var blank2yorigin = blank1height;
var blank2height = blank2yorigin + stdcellheight;
var innerheight1 = stdheight1 - stdcellheight;
var innerheight2 = concernheight;
var innerheight = innerheight2 + tickboxheight;
var leftscalealign = 340;
var rightscalealign = innerwidth + 7;
var lefttextalign = tablexorigin + 5;
var topheaderheight = temperatureyorigin - tableyorigin;
var leftheaderwidth = cellxorigin - tablexorigin;

function drawclinchart() {

	var ynarrowrange = d3.range(temperatureyorigin, narrowheight, narrowcellheight);
	var ystdrange1 = d3.range(narrowheight, stdheight1, stdcellheight);
	var ypsrange = d3.range(painscoreyorigin, painscoreheight, pscellheight);
	 
	var xrange = d3.range(cellxorigin, innerwidth+1, cellwidth);
	var xaxisbold = d3.range(cellxorigin, innerwidth+1, vertbold);
	var headerdiagonal = [{startx: tablexorigin, starty: timescaleyorigin, endx: cellxorigin, endy: tableyorigin},
	                      {startx: cellxorigin, starty: timescaleyorigin, endx: cellxorigin+vertbold, endy: tableyorigin},
	                      {startx: cellxorigin+vertbold, starty: timescaleyorigin, endx: cellxorigin+(vertbold*2), endy: tableyorigin},
	                      {startx: cellxorigin+(vertbold*2), starty: timescaleyorigin, endx: cellxorigin+(vertbold*3), endy: tableyorigin},
	                      {startx: cellxorigin+(vertbold*3), starty: timescaleyorigin, endx: cellxorigin+(vertbold*4), endy: tableyorigin},
	                      {startx: cellxorigin+(vertbold*4), starty: timescaleyorigin, endx: cellxorigin+(vertbold*5), endy: tableyorigin},
	                      {startx: cellxorigin+(vertbold*5), starty: timescaleyorigin, endx: cellxorigin+(vertbold*6), endy: tableyorigin}];
	
	var xtimescalerange = d3.range(cellxorigin+(cellwidth*0.5), innerwidth, cellwidth);
	var xtimescalelabels = [2,6,10,2,6,10,2,6,10,2,6,10,2,6,10,2,6,10,2,6,10,2,6,10,2,6,10,2,6,10,2,6,10,2,6,10];
	
	var ysectionbold = [timescaleyorigin, bpyorigin, pulseyorigin, respirationyorigin, spo2yorigin, o2modeyorigin, flowrateyorigin,
	                   painsiteyorigin, painscoreyorigin, characteryorigin, patternyorigin, concernyorigin, tickboxyorigin, doublelineyorigin,
	                   weightyorigin, defecationyorigin, drainsyorigin, blank1yorigin, blank2yorigin];
	
	var xverticalborders = [tablexorigin, cellxorigin, innerwidth, tablewidth];
	var yhorizontalborders = [tableyorigin, tableheight];
	
	var ytemperaturebold1 = d3.range(temperatureboldoffset, temperatureheight-(temperaturehbold*2), temperaturehbold);
	var ytemperaturebold2 = [temperatureboldoffset+(temperaturehbold*3)];
	var ytemperaturebold3 = [temperatureboldoffset+(temperaturehbold*4)];
	var ytemperaturelabelrange = d3.range(temperatureboldoffset+scalelabelyoffset, temperatureheight, temperaturehbold);
	var ytemperaturelabels = d3.range(40,35,-1);
	
	var ybpbold = d3.range(bpboldoffset, bpheight, bphbold);
	var ybplabelrange = d3.range(bpboldoffset+scalelabelyoffset, bpheight, bphbold);
	var ybplabels = d3.range(200,40,-10);
	
	var ypulsebold = d3.range(pulseboldoffset, pulseheight, pulsehbold);
	var ypulselabelrange = d3.range(pulseboldoffset+scalelabelyoffset, pulseheight, pulsehbold);
	var ypulselabels = d3.range(160,30,-10);
	
	var yrespirationbold = d3.range(respirationboldoffset, respirationheight, respirationhbold);
	var yrespirationlabelrange = d3.range(respirationboldoffset+scalelabelyoffset, respirationheight, respirationhbold);
	var yrespirationlabels = d3.range(30,0,-10);
	
	var yspo2bold = d3.range(spo2boldofffset, spo2height, spo2hbold);
	var yspo2labelrange = d3.range(spo2boldofffset+scalelabelyoffset, spo2height, spo2hbold);
	var yspo2labels = d3.range(95,85,-5);
	
	var ypslabelrange = d3.range(painscoreyorigin+pscellheight+scalelabelyoffset, painscoreheight, pscellheight)
	var ypainscorelabels = d3.range(10,-1,-1);
	
	var ycharacterrange = [characteryorigin, characterheight];
	var ypatternrange = [patternyorigin, patternheight];
	var yconcernrange = [concernyorigin, concernheight];
	
	var xdefecation = d3.range(cellxorigin, innerwidth, cellwidth*2);
	
	// Fills
	var yellowfill = [{start: temperatureyorigin, height: narrowcellheight*10},
	                  {start: bpyorigin+(narrowcellheight*2), height: narrowcellheight*4},
					  {start: pulseyorigin+(narrowcellheight*7), height: narrowcellheight*2},
	                  {start: pulseyorigin+(narrowcellheight*23), height: narrowcellheight*2},
					  {start: respirationyorigin+narrowcellheight, height: narrowcellheight},
					  {start: spo2yorigin+narrowcellheight, height: narrowcellheight*2}];
	
	var redfill = [{start: bpyorigin, height: narrowcellheight*2},
	               {start: bpyorigin+(narrowcellheight*24), height: narrowcellheight*10},
				   {start: pulseyorigin, height: narrowcellheight*7},
	               {start: pulseyorigin+(narrowcellheight*25), height: narrowcellheight*2},
				   {start: respirationyorigin, height: narrowcellheight},
				   {start: respirationyorigin+(narrowcellheight*5), height: narrowcellheight*2},
				   {start: spo2yorigin+(narrowcellheight*3), height: narrowcellheight},
				   {start: concernyorigin, height: broadcellheight}];
	
	var texttable = [{x: lefttextalign, y: tableyorigin+(topheaderheight*0.4), text: "DATE", size: "16px", weight: "bold"},
	                 {x: lefttextalign+(leftheaderwidth*0.6), y: tableyorigin+(topheaderheight*0.6), text: "OP DAY", size: "16px", weight: "bold"},
	                 {x: lefttextalign, y: temperatureyorigin+(narrowcellheight * 12), text: "\u25CF TEMPERATURE", size: "16px", weight: "normal"},
	                 {x: lefttextalign+13, y: temperatureyorigin+(narrowcellheight * 14), text: "C\u00B0", size: "16px", weight: "normal"},
	                 {x: lefttextalign+13, y: temperatureyorigin+(narrowcellheight * 16), text: "\u0028IN BLACK\u0029", size: "16px", weight: "normal"},
	                 {x: lefttextalign+20, y: bpyorigin+(narrowcellheight * 17), text: "B.P.", size: "16px", weight: "bold"},
	                 {x: lefttextalign+20, y: bpyorigin+(narrowcellheight * 19), text: "\u0028IN RED\u0029", size: "16px", weight: "bold"},
	                 {x: lefttextalign, y: bpyorigin+(narrowcellheight * 22), text: "Trigger for", size: "16px", weight: "bold"},
	                 {x: lefttextalign, y: bpyorigin+(narrowcellheight * 24), text: "Systolic Only", size: "16px", weight: "bold"},
	                 {x: lefttextalign, y: pulseyorigin+(narrowcellheight * 13), text: "\u25CF PULSE", size: "16px", weight: "bold"},
	                 {x: lefttextalign+13, y: pulseyorigin+(narrowcellheight * 15), text: "\u0028IN BLACK\u0029", size: "16px", weight: "bold"},
	                 {x: lefttextalign, y: respirationyorigin+(narrowcellheight * 2), text: "\u25CF RESPIRATION", size: "16px", weight: "bold"},
	                 {x: lefttextalign+13, y: respirationyorigin+(narrowcellheight * 4), text: "\u0028IN BLACK\u0029", size: "16px", weight: "bold"},
	                 {x: lefttextalign+13, y: spo2yorigin+(narrowcellheight * 1.5), text: "SpO2 \u0028\u0025\u0029", size: "16px", weight: "normal"},
	                 {x: lefttextalign+13, y: spo2yorigin+(narrowcellheight * 3.5), text: "Numerical", size: "16px", weight: "normal"},
	                 {x: lefttextalign+13, y: o2modeyorigin+(stdcellheight * 0.65), text: "O2 Mode", size: "16px", weight: "normal"},
	                 {x: lefttextalign+13, y: flowrateyorigin+(stdcellheight * 0.65), text: "Flow Rate", size: "16px", weight: "normal"},
	                 {x: lefttextalign, y: painsiteyorigin+(stdcellheight * 0.65), text: "Pain Site", size: "16px", weight: "bold"},
	                 {x: cellxorigin+5, y: painsiteyorigin+(stdcellheight * 0.65), text: "Indicate the pain site(s) with the letter (A,B,C,D) in the box against the pain score. Mark \u0022O\u0022 if no pain site", size: "16px", weight: "normal"},
	                 {x: lefttextalign, y: painscoreyorigin + (pscellheight*1), text: "A", size: "16px", weight: "bold"},
	                 {x: lefttextalign, y: painscoreyorigin + (pscellheight*2), text: "B", size: "16px", weight: "bold"},
	                 {x: lefttextalign, y: painscoreyorigin + (pscellheight*3), text: "C", size: "16px", weight: "bold"},
	                 {x: lefttextalign, y: painscoreyorigin + (pscellheight*4), text: "D", size: "16px", weight: "bold"},
	                 {x: lefttextalign, y: painscoreyorigin + (pscellheight*6), text: "\u25CF PAIN SCORE", size: "16px", weight: "bold"},
	                 {x: lefttextalign, y: painscoreyorigin + (pscellheight*7), text: "\u0028IN BLACK\u0029", size: "16px", weight: "bold"},
	                 {x: lefttextalign, y: characteryorigin+(stdcellheight * 0.65), text: "Character", size: "16px", weight: "normal"},
	                 {x: lefttextalign, y: patternyorigin + (broadcellheight * 0.65), text: "Frequency \u002F Pattern", size: "16px", weight: "normal"},
	                 {x: lefttextalign, y: concernyorigin+(broadcellheight * 0.65), text: "Serious Concern", size: "16px", weight: "normal"},
	                 {x: cellxorigin+5, y: tickboxyorigin+(tickboxcellheight * 0.4), text: "Place a tick in the box next", size: "15px", weight: "normal"},
	                 {x: cellxorigin+15, y: tickboxyorigin+(tickboxcellheight * 0.8), text: "to the scale selected", size: "15px", weight: "normal"},
	                 {x: cellxorigin+300, y: tickboxyorigin+(tickboxcellheight * 0.6), text: "Faces \u2610", size: "16px", weight: "normal"},
	                 {x: cellxorigin+420, y: tickboxyorigin+(tickboxcellheight * 0.6), text: "Numeric \u2610", size: "16px", weight: "normal"},
	                 {x: cellxorigin+560, y: tickboxyorigin+(tickboxcellheight * 0.6), text: "Categoric \u2610", size: "16px", weight: "normal"},
	                 {x: cellxorigin+700, y: tickboxyorigin+(tickboxcellheight * 0.6), text: "FLACC \u2610", size: "16px", weight: "normal"},
	                 {x: cellxorigin+860, y: tickboxyorigin+(tickboxcellheight * 0.4), text: "Patient advised", size: "15px", weight: "normal"},
	                 {x: cellxorigin+865, y: tickboxyorigin+(tickboxcellheight * 0.8), text: "to report pain", size: "15px", weight: "normal"},
	                 {x: cellxorigin+1000, y: tickboxyorigin+(tickboxcellheight * 0.6), text: "\u2610 Yes", size: "16px", weight: "normal"},
	                 {x: cellxorigin+1100, y: tickboxyorigin+(tickboxcellheight * 0.6), text: "\u2610 No", size: "16px", weight: "normal"},
	                 {x: tablexorigin+2, y: weightyorigin+(stdcellheight * 0.5), text: "HEIGHT", size: "14px", weight: "bold"},
	                 {x: tablexorigin+140, y: weightyorigin+(stdcellheight * 0.8), text: "WEIGHT", size: "14px", weight: "bold"},
	                 {x: lefttextalign, y: defecationyorigin+(stdcellheight * 0.65), text: "DEFECATION", size: "16px", weight: "normal"},
	                 {x: lefttextalign, y: drainsyorigin+(stdcellheight * 0.65), text: "DRAINS", size: "16px", weight: "normal"}];

	// Time scale
	var timescaletext = gridChart.selectAll("text.timescale")
		.data(xtimescalerange)
		.enter()
		.append("text");
	
	var timescalelabels = timescaletext
		.attr("x", function(d){return d;})
		.attr("y", (timescaleyorigin+temperatureyorigin)*0.5+5)
		.data(xtimescalelabels)
		.text(function(d){return d;})
		.attr("text-anchor", "middle")
		.attr("font-size", "12px")
		.style("stroke-width", 3);
	
	// Temperature scale
	var temperaturetext1 = gridChart.selectAll("text.temperature1")
		.data(ytemperaturelabelrange)
		.enter()
		.append("text");
	
	var temperaturelabels1 = temperaturetext1
		.attr("x", leftscalealign)
		.attr("y", function(d){return d;})
		.data(ytemperaturelabels)
		.text(function(d){return d;})
		.attr("text-anchor", "end")
		.attr("font-size", "12px")
		.style("stroke-width", 3);
	
	var temperaturetext2 = gridChart.selectAll("text.temperature2")
		.data(ytemperaturelabelrange)
		.enter()
		.append("text");

	var temperaturelabels2 = temperaturetext2
		.attr("x", rightscalealign)
		.attr("y", function(d){return d;})
		.data(ytemperaturelabels)
		.text(function(d){return d;})
		.attr("text-anchor", "start")
		.attr("font-size", "12px")
		.style("stroke-width", 3);
	
	// B.P. scale
	var bptext1 = gridChart.selectAll("text.bp1")
		.data(ybplabelrange)
		.enter()
		.append("text");

	var bplabels1 = bptext1
		.attr("x", leftscalealign)
		.attr("y", function(d){return d;})
		.data(ybplabels)
		.text(function(d){return d;})
		.attr("text-anchor", "end")
		.attr("font-size", "12px")
		.style("stroke-width", 3);
	
	var bptext2 = gridChart.selectAll("text.bp2")
		.data(ybplabelrange)
		.enter()
		.append("text");

	var bplabels2 = bptext2
		.attr("x", rightscalealign)
		.attr("y", function(d){return d;})
		.data(ybplabels)
		.text(function(d){return d;})
		.attr("text-anchor", "start")
		.attr("font-size", "12px")
		.style("stroke-width", 3);
	
	// Pulse scale
	var pulsetext1 = gridChart.selectAll("text.pulse1")
		.data(ypulselabelrange)
		.enter()
		.append("text");

	var pulselabels1 = pulsetext1
		.attr("x", leftscalealign)
		.attr("y", function(d){return d;})
		.data(ypulselabels)
		.text(function(d){return d;})
		.attr("text-anchor", "end")
		.attr("font-size", "12px")
		.style("stroke-width", 3);
	
	var pulsetext2 = gridChart.selectAll("text.pulse2")
		.data(ypulselabelrange)
		.enter()
		.append("text");

	var pulselabels2 = pulsetext2
		.attr("x", rightscalealign)
		.attr("y", function(d){return d;})
		.data(ypulselabels)
		.text(function(d){return d;})
		.attr("text-anchor", "start")
		.attr("font-size", "12px")
		.style("stroke-width", 3);
	
	// Respiration scale
	var respirationtext1 = gridChart.selectAll("text.respiration1")
		.data(yrespirationlabelrange)
		.enter()
		.append("text");

	var respirationlabels1 = respirationtext1
		.attr("x", leftscalealign)
		.attr("y", function(d){return d;})
		.data(yrespirationlabels)
		.text(function(d){return d;})
		.attr("text-anchor", "end")
		.attr("font-size", "12px")
		.style("stroke-width", 3);
	
	var respirationtext2 = gridChart.selectAll("text.respiration2")
		.data(yrespirationlabelrange)
		.enter()
		.append("text");

	var respirationlabels2 = respirationtext2
		.attr("x", rightscalealign)
		.attr("y", function(d){return d;})
		.data(yrespirationlabels)
		.text(function(d){return d;})
		.attr("text-anchor", "start")
		.attr("font-size", "12px")
		.style("stroke-width", 3);
	
	// SpO2 scale
	var spo2text1 = gridChart.selectAll("text.spo21")
		.data(yspo2labelrange)
		.enter()
		.append("text");

	var spo2labels1 = spo2text1
		.attr("x", leftscalealign)
		.attr("y", function(d){return d;})
		.data(yspo2labels)
		.text(function(d){return d;})
		.attr("text-anchor", "end")
		.attr("font-size", "12px")
		.style("stroke-width", 3);
	
	var spo2text2 = gridChart.selectAll("text.spo22")
		.data(yspo2labelrange)
		.enter()
		.append("text");

	var spo2labels2 = spo2text2
		.attr("x", rightscalealign)
		.attr("y", function(d){return d;})
		.data(yspo2labels)
		.text(function(d){return d;})
		.attr("text-anchor", "start")
		.attr("font-size", "12px")
		.style("stroke-width", 3);
	
	// Pain Score scale
	var painscoretext1 = gridChart.selectAll("text.painscore1")
		.data(ypslabelrange)
		.enter()
		.append("text");

	var painscorelabels1 = painscoretext1
		.attr("x", leftscalealign)
		.attr("y", function(d){return d;})
		.data(ypainscorelabels)
		.text(function(d){return d;})
		.attr("text-anchor", "end")
		.attr("font-size", "12px")
		.style("stroke-width", 3);
	
	var painscoretext2 = gridChart.selectAll("text.painscore2")
		.data(ypslabelrange)
		.enter()
		.append("text");

	var painscorelabels2 = painscoretext2
		.attr("x", rightscalealign)
		.attr("y", function(d){return d;})
		.data(ypainscorelabels)
		.text(function(d){return d;})
		.attr("text-anchor", "start")
		.attr("font-size", "12px")
		.style("stroke-width", 3);
	
	// Add table text
	var tabletext = gridChart.selectAll("text.table")
		.data(texttable)
		.enter()
		.append("text");
	
	var textlabels = tabletext
		.attr("x", function(d){return d.x;})
		.attr("y", function(d){return d.y;})
		.attr("font-size", function(d){return d.size;})
		.attr("font-weight", function(d){return d.weight;})
		.text(function(d){return d.text;})
		.style("stroke-width", 3);
	
	// Add diagonal lines for table header
	gridChart.selectAll("line.header")
		.data(headerdiagonal)
		.enter().append("svg:line")
		.attr("x1", function(d){return d.startx;})
		.attr("y1", function(d){return d.starty;})
		.attr("x2", function(d){return d.endx;})
		.attr("y2", function(d){return d.endy;})
		.style("stroke", "black")
		.style("stroke-width", boldlinestroke);
	
	// Add B.P. up down Vs
	gridChart.append("text")
		.attr("class","bp")
		.attr("y", bpyorigin+(narrowcellheight * 17))
		.attr("x", lefttextalign)
		.attr("font-size", "20px")
		.attr("font-weight", "bold")
		.attr("fill", "red")
		.text("\u0076")
		.style("stroke-width", 3);
	
	gridChart.append("text")
	.attr("class","bp")
		.attr("y", bpyorigin+(narrowcellheight * 19))
		.attr("x", lefttextalign)
		.attr("font-size", "20px")
		.attr("font-weight", "bold")
		.text("\u028C")
		.attr("fill", "red")
		.style("stroke-width", 3);	
	
	// Yellow Fill
	gridChart.selectAll("rect.yellow")
	   .data(yellowfill)
	   .enter()
	   .append("rect")
	   .attr("x", cellxorigin)
	   .attr("y", function(d){return d.start;})
	   .attr("width", cellwidth * 36)
	   .attr("height", function(d){return d.height;})
	   .attr("fill", "lightyellow");
	
	// Red Fill
	gridChart.selectAll("rect.red")
	   .data(redfill)
	   .enter()
	   .append("rect")
	   .attr("x", cellxorigin)
	   .attr("y", function(d){return d.start;})
	   .attr("width", cellwidth * 36)
	   .attr("height", function(d){return d.height;})
	   .attr("fill", "lightpink");
	
	 
	// Generate vertical lines for above Pain Site.
	gridChart.selectAll("line.vertical1")
		.data(xrange)
		.enter().append("svg:line")
		.attr("x1", function(d){return d;})
		.attr("y1", timescaleyorigin)
		.attr("x2", function(d){return d;})
		.attr("y2", innerheight1)
		.style("stroke", "grey")
		.style("stroke-width", 1);
	
	// Generate vertical lines for below Pain Site.
	gridChart.selectAll("line.vertical2")
		.data(xrange)
		.enter().append("svg:line")
		.attr("x1", function(d){return d;})
		.attr("y1", painscoreyorigin)
		.attr("x2", function(d){return d;})
		.attr("y2", innerheight2)
		.style("stroke", "grey")
		.style("stroke-width", 1);     

	// Generate horizontal lines for narrow cells.       
	gridChart.selectAll("line.narrowcells")
		.data(ynarrowrange)
		.enter().append("svg:line")
		.attr("x1", cellxorigin)
		.attr("y1", function(d){return d;})
		.attr("x2", innerwidth)
		.attr("y2", function(d){return d;})
		.style("stroke", "grey")
		.style("stroke-width", 1);
	
	// Generate horizontal lines for std cells.       
	gridChart.selectAll("line.stdcells1")
		.data(ystdrange1)
		.enter().append("svg:line")
		.attr("x1", cellxorigin)
		.attr("y1", function(d){return d;})
		.attr("x2", innerwidth)
		.attr("y2", function(d){return d;})
		.style("stroke", "grey")
		.style("stroke-width", 1);
	
	// Generate horizontal lines for pain score cells.       
	gridChart.selectAll("line.pscells")
		.data(ypsrange)
		.enter().append("svg:line")
		.attr("x1", cellxorigin)
		.attr("y1", function(d){return d;})
		.attr("x2", innerwidth)
		.attr("y2", function(d){return d;})
		.style("stroke", "grey")
		.style("stroke-width", 1);

	// Generate horizontal lines for Character cells.       
	gridChart.selectAll("line.charcells")
		.data(ycharacterrange)
		.enter().append("svg:line")
		.attr("x1", cellxorigin)
		.attr("y1", function(d){return d;})
		.attr("x2", innerwidth)
		.attr("y2", function(d){return d;})
		.style("stroke", "grey")
		.style("stroke-width", 1);
	
	// Generate horizontal lines for Frequency/Pattern cells.       
	gridChart.selectAll("line.patterencells")
		.data(ypatternrange)
		.enter().append("svg:line")
		.attr("x1", cellxorigin)
		.attr("y1", function(d){return d;})
		.attr("x2", innerwidth)
		.attr("y2", function(d){return d;})
		.style("stroke", "grey")
		.style("stroke-width", 1);
	
	// Generate horizontal lines for Serious Concern cells.       
	gridChart.selectAll("line.concerncells")
		.data(yconcernrange)
		.enter().append("svg:line")
		.attr("x1", cellxorigin)
		.attr("y1", function(d){return d;})
		.attr("x2", innerwidth)
		.attr("y2", function(d){return d;})
		.style("stroke", "grey")
		.style("stroke-width", 1);
	
	// Vertical Bold lines
	gridChart.selectAll("line.vbold1")
		.data(xaxisbold)
		.enter().append("svg:line")
		.attr("x1", function(d){return d;})
		.attr("y1", tableyorigin)
		.attr("x2", function(d){return d;})
		.attr("y2", innerheight1)
		.style("stroke", "black")
		.style("stroke-width", borderlinestroke);
	
	gridChart.selectAll("line.vbold2")
		.data(xaxisbold)
		.enter().append("svg:line")
		.attr("x1", function(d){return d;})
		.attr("y1", painscoreyorigin)
		.attr("x2", function(d){return d;})
		.attr("y2", innerheight2)
		.style("stroke", "black")
		.style("stroke-width", borderlinestroke);
	
	gridChart.selectAll("line.vbold3")
		.data(xaxisbold)
		.enter().append("svg:line")
		.attr("x1", function(d){return d;})
		.attr("y1", weightyorigin)
		.attr("x2", function(d){return d;})
		.attr("y2", tableheight)
		.style("stroke", "black")
		.style("stroke-width", borderlinestroke);
	
	// Horizontal Section Bold Lines
	gridChart.selectAll("line.sectionbold")
		.data(ysectionbold)
		.enter().append("svg:line")
		.attr("x1", tablexorigin)
		.attr("y1", function(d){return d;})
		.attr("x2", tablewidth)
		.attr("y2", function(d){return d;})
		.style("stroke", "black")
		.style("stroke-width", borderlinestroke);
	
	// Draw Table Borders
	gridChart.selectAll("line.verticalborders")
		.data(xverticalborders)
		.enter().append("svg:line")
		.attr("x1", function(d){return d;})
		.attr("y1", tableyorigin)
		.attr("x2", function(d){return d;})
		.attr("y2", tableheight)
		.style("stroke", "black")
		.style("stroke-width", borderlinestroke);
	
	gridChart.selectAll("line.horizonalborders")
		.data(yhorizontalborders)
		.enter().append("svg:line")
		.attr("x1", tablexorigin)
		.attr("y1", function(d){return d;})
		.attr("x2", tablewidth)
		.attr("y2", function(d){return d;})
		.style("stroke", "black")
		.style("stroke-width", borderlinestroke);
	
	// Horizontal Bold lines for Temperature
	gridChart.selectAll("line.temperaturebold1")
		.data(ytemperaturebold1)
		.enter().append("svg:line")
		.attr("x1", cellxorigin)
		.attr("y1", function(d){return d;})
		.attr("x2", innerwidth)
		.attr("y2", function(d){return d;})
		.style("stroke", "black")
		.style("stroke-width", boldlinestroke);
	
	gridChart.selectAll("line.temperaturebold2")
		.data(ytemperaturebold2)
		.enter().append("svg:line")
		.attr("x1", cellxorigin)
		.attr("y1", function(d){return d;})
		.attr("x2", innerwidth)
		.attr("y2", function(d){return d;})
		.style("stroke", "black")
		.style("stroke-width", boldlinestroke)
		.style("stroke-dasharray", "30,10,10,10");
	
	gridChart.selectAll("line.temperaturebold3")
		.data(ytemperaturebold3)
		.enter().append("svg:line")
		.attr("x1", cellxorigin)
		.attr("y1", function(d){return d;})
		.attr("x2", innerwidth)
		.attr("y2", function(d){return d;})
		.style("stroke", "black")
		.style("stroke-width", boldlinestroke);
	    
	// Horizontal Bold lines for B.P.
	gridChart.selectAll("line.bpbold")
		.data(ybpbold)
		.enter().append("svg:line")
		.attr("x1", cellxorigin)
		.attr("y1", function(d){return d;})
		.attr("x2", innerwidth)
		.attr("y2", function(d){return d;})
		.style("stroke", "black")
		.style("stroke-width", boldlinestroke);
	
	// Horizontal Bold lines for Pulse
	gridChart.selectAll("line.ypulsebold")
		.data(ypulsebold)
		.enter().append("svg:line")
		.attr("x1", cellxorigin)
		.attr("y1", function(d){return d;})
		.attr("x2", innerwidth)
		.attr("y2", function(d){return d;})
		.style("stroke", "black")
		.style("stroke-width", boldlinestroke);
	
	// Horizontal Bold lines for Respiration
	gridChart.selectAll("line.yrespirationbold")
		.data(yrespirationbold)
		.enter().append("svg:line")
		.attr("x1", cellxorigin)
		.attr("y1", function(d){return d;})
		.attr("x2", innerwidth)
		.attr("y2", function(d){return d;})
		.style("stroke", "black")
		.style("stroke-width", boldlinestroke);

	// Horizontal Bold lines for SpO2
	gridChart.selectAll("line.yspo2bold")
		.data(yspo2bold)
		.enter().append("svg:line")
		.attr("x1", cellxorigin)
		.attr("y1", function(d){return d;})
		.attr("x2", innerwidth)
		.attr("y2", function(d){return d;})
		.style("stroke", "black")
		.style("stroke-width", boldlinestroke);
	
	// Diagonal line for height and weight
	gridChart.append("svg:line")
		.attr("x1", tablexorigin)
		.attr("y1", defecationyorigin)
		.attr("x2", cellxorigin)
		.attr("y2", weightyorigin)
		.style("stroke", "black")
		.style("stroke-width", 1);
	
	// Vertical lines for defecation
	gridChart.selectAll("line.defecation")
	.data(xdefecation)
	.enter().append("svg:line")
	.attr("x1", function(d){return d;})
	.attr("y1", defecationyorigin)
	.attr("x2", function(d){return d;})
	.attr("y2", defecationheight)
	.style("stroke", "black")
	.style("stroke-width", borderlinestroke);
	
}

function query(){
	
	// Get query values from HTML page
	var id = document.getElementById('patient_id').value.toUpperCase();
	var from = document.getElementById('start_date').value;
	var to = document.getElementById('end_date').value;
	
	// Form the web service query
    var timeformat = d3.time.format("%Y-%m-%d %H:%M");
	var todate = timeformat.parse(to + " 00:00");
	var toinclusive = new Date(to);
	toinclusive.setDate(toinclusive.getDate() + 1);
	var newto = $.datepicker.formatDate("yy-mm-dd", toinclusive);
	var url = "./resources/chart?id="+id+"&from="+from+"&to="+newto+"&clinical=yes";
    
	// SVG to draw line
   	var dotradius = 3;
    var mindate = timeformat.parse(from + " 00:00");
    
    // There's probably better way to get maxdate
    var upmaxdate = new Date(mindate);
    upmaxdate.setDate(upmaxdate.getDate() + 6);
    var formatted = $.datepicker.formatDate("yy-mm-dd", upmaxdate);
    var maxdate = timeformat.parse(formatted + " 00:00");
    
    // Data range for the date header
    var datecolumns = d3.range(cellxorigin+5, innerwidth+1, vertbold);
    var datelabels = [];
    var startdate = $("#start_date").datepicker('getDate');
    var enddate = $("#end_date").datepicker('getDate');
    var newmindate = new Date(mindate);
    newmindate.setDate(newmindate.getDate() - 1); // newmindate will be incremented in for loop so set back 1 day
    var days = ((enddate-startdate) / 1000 / 60 / 60 / 24) + 1; // +1 to include enddate
    for (var i = 0; i < days; i++) {
    	newmindate.setDate(newmindate.getDate() + 1);
    	datelabels[i] = $.datepicker.formatDate("yy-mm-dd", newmindate);
    }
    
    // Formatting all the scales
    var parseDate = d3.time.format("%Y-%m-%d %H:%M").parse;
    var timescale = d3.time.scale()
    	.domain([mindate,maxdate])
    	.range([cellxorigin,innerwidth]);
    var temperaturescale = d3.scale.linear()
		.domain([35.6,40.4])
		.range([temperatureheight,temperatureyorigin]);
    var bpscale = d3.scale.linear()
		.domain([40,210])
		.range([bpheight,bpyorigin]);
    var pulsescale = d3.scale.linear()
		.domain([30,165])
		.range([pulseheight,pulseyorigin]);
    var spo2scale = d3.scale.linear()
		.domain([87.5,97.5])
		.range([spo2height,spo2yorigin]);
    var templine = d3.svg.line()
      	.x(function(d) {return timescale(d.datetime);})
       	.y(function(d) {return temperaturescale(d.temp);})
       	.defined(function(d) { return d.temp; }); // for missing data;
    var pulseline = d3.svg.line()
   		.x(function(d) {return timescale(d.datetime);})
   		.y(function(d) {return pulsescale(d.pulse);})
   		.defined(function(d) {return d.pulse;}); // for missing data;
    var spo2line = d3.svg.line()
		.x(function(d) {return timescale(d.datetime);})
		.y(function(d) {return spo2scale(d.spo2);})
		.defined(function(d) {return d.spo2;}); // for missing data;
            	
    d3.xml(url, "application/xml", function(error, data) {
    	if (error) throw error;
     	
    	data = [].map.call(data.querySelectorAll("MEASUREMENT"), function(measurement) {
            return {
            	datetime: parseDate(measurement.querySelector("DATETIME").textContent),
            	temp: +measurement.querySelector("TEMP").textContent,
            	bphigh: +measurement.querySelector("BPHIGH").textContent,
            	bplow: +measurement.querySelector("BPLOW").textContent,
            	pulse: +measurement.querySelector("PULSE").textContent,
            	spo2: +measurement.querySelector("SPO2").textContent
            };
        });
    	
    // remove the previous plotted data
    gridChart.selectAll("text.headerdate").remove();	
    gridChart.selectAll("circle.tempdata").remove();
    gridChart.selectAll("path.templine").remove();
    gridChart.selectAll("text.bpdatahigh").remove();
    gridChart.selectAll("text.bpdatalow").remove();
    gridChart.selectAll("circle.pulsedata").remove();
    gridChart.selectAll("path.pulseline").remove();
    gridChart.selectAll("circle.spo2data").remove();
    gridChart.selectAll("path.spo2line").remove();
    
    // Insert date into header
	var headerdatetext = gridChart.selectAll("text.headerdate")
		.data(datecolumns)
		.enter()
		.append("text")
		.attr("class","headerdate");

	var headerdatelabels = headerdatetext
		.attr("x", function(d){return d;})
		.attr("y", tableyorigin+(topheaderheight*0.3))
		.data(datelabels)
		.text(function(d){return d;})
		.attr("text-anchor", "start")
		.attr("font-size", "20px")
		.style("stroke-width", 3);
    
    // Draw data points and line for temperature
    gridChart.selectAll("circle.tempdata")
       	//.data(data)
    	.data(data.filter(function(d) {return d.temp;})) // for missing data;
	    .enter()
	    .append("circle")
	    .attr("class", "tempdata")
	    .attr("cx", function(d){return timescale(d.datetime);})
	    .attr("cy", function(d){return temperaturescale(d.temp);})
	    .attr("r", dotradius);
            	
    gridChart.append("path")
       .datum(data)
       .attr("class", "templine")
       .attr("d", templine);
    
    // Draw data points for BP
    gridChart.selectAll("text.bpdata")
    	//.data(data)
    	.data(data.filter(function(d) { return d.bphigh; })) // for missing data;
    	.enter()
    	.append("text")
		.attr("class","bpdatahigh")
		.attr("x", function(d){return timescale(d.datetime);})
		.attr("y", function(d){return bpscale(d.bphigh);})
		.attr("font-size", "20px")
		.attr("font-weight", "bold")
		.attr("text-anchor", "middle")
		.attr("fill", "red")
		.text("\u0076")
		.style("stroke-width", 3);
    
    gridChart.selectAll("text.bpdata")
    	 //.data(data)
    	.data(data.filter(function(d) {return d.bplow;})) // for missing data;
    	.enter()
		.append("text")
		.attr("class","bpdatalow")
		.attr("x", function(d){return timescale(d.datetime);})
		.attr("y", function(d){return bpscale(d.bplow);})
		.attr("dy", ".5em")
		.attr("font-size", "20px")
		.attr("font-weight", "bold")
		.attr("text-anchor", "middle")
		.text("\u028C")
		.attr("fill", "red")
		.style("stroke-width", 3);	
    
    // Draw data points and line for pulse
    gridChart.selectAll("circle.pulsedata")
    	//.data(data)
    	.data(data.filter(function(d) {return d.pulse;})) // for missing data;
    	.enter()
    	.append("circle")
    	.attr("class", "pulsedata")
    	.attr("cx", function(d){return timescale(d.datetime);})
    	.attr("cy", function(d){return pulsescale(d.pulse);})
    	.attr("r", dotradius);
            	
    gridChart.append("path")
       .datum(data)
       .attr("class", "pulseline")
       .attr("d", pulseline);
    
    // Draw data points and line for spo2
    gridChart.selectAll("circle.spo2data")
    	//.data(data)
    	.data(data.filter(function(d) {return d.spo2;})) // for missing data;
    	.enter()
    	.append("circle")
    	.attr("class", "spo2data")
    	.attr("cx", function(d){return timescale(d.datetime);})
    	.attr("cy", function(d){return spo2scale(d.spo2);})
    	.attr("r", dotradius);
            	
    gridChart.append("path")
       .datum(data)
       .attr("class", "spo2line")
       .attr("d", spo2line);
    
    });
 
}
