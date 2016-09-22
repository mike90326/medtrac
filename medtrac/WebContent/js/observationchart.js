// A4 at 200PPI
var width = 1654; 
var height = 2339;
var tablexorigin = 150;
var tableyorigin = 200;
var tablewidth = 1590;
var tableheight = 1850;
var boldlinestroke = 2;
var borderlinestroke = 2.5;
var cellwidth = 33;
var narrowcellheight = 11;
var pscellheight = 22;
var stdcellheight = 33;
var broadcellheight = 44;
var cellxorigin = 350;
var vertbold = cellwidth * 6; // bold on every 6 lines
var temperatureyorigin = 260;
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
var innerheight1 = stdheight1 - stdcellheight;
var innerheight2 = concernheight;
var innerheight = innerheight2 + tickboxheight;
var leftscalealign = 340;
var rightscalealign = innerwidth + 7;
var lefttextalign = tablexorigin + 5;
var topheaderheight = temperatureyorigin - tableyorigin;
var leftheaderwidth = cellxorigin - tablexorigin;
var vitalsignwidth = tablexorigin + 130;
var headersplitter = tableyorigin+(topheaderheight*0.4);

function drawobschart() {
	 
	var ynarrowrange = d3.range(temperatureyorigin, narrowheight, narrowcellheight);
	var ystdrange1 = d3.range(narrowheight, stdheight1, stdcellheight);
	var ypsrange = d3.range(painscoreyorigin, painscoreheight, pscellheight);
	 
	var xrange = d3.range(cellxorigin, innerwidth+1, cellwidth);
	var xaxisbold = d3.range(cellxorigin, innerwidth+1, vertbold);
	
	var ysectionbold = [temperatureyorigin, bpyorigin, pulseyorigin, respirationyorigin, spo2yorigin, o2modeyorigin, flowrateyorigin,
	                   painsiteyorigin, painscoreyorigin, characteryorigin, patternyorigin, concernyorigin, tickboxyorigin];
	
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
	
	var texttable = [{x: lefttextalign, y: tableyorigin+(topheaderheight*0.6), text: "VITAL SIGNS", size: "16px", weight: "bold"},
	                 {x: vitalsignwidth+2, y: tableyorigin+(topheaderheight*0.3), text: "DATE", size: "16px", weight: "bold"},
	                 {x: vitalsignwidth+2, y: tableyorigin+(topheaderheight*0.8), text: "TIME", size: "16px", weight: "bold"},
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
	                 {x: cellxorigin+26, y: tickboxyorigin+(tickboxcellheight * 0.3), text: "Place a tick in", size: "15px", weight: "normal"},
	                 {x: cellxorigin+30, y: tickboxyorigin+(tickboxcellheight * 0.6), text: "the box next", size: "15px", weight: "normal"},
	                 {x: cellxorigin+5, y: tickboxyorigin+(tickboxcellheight * 0.9), text: "to the scale selected", size: "15px", weight: "normal"},
	                 {x: cellxorigin+200, y: tickboxyorigin+(tickboxcellheight * 0.6), text: "Faces \u2610", size: "16px", weight: "normal"},
	                 {x: cellxorigin+320, y: tickboxyorigin+(tickboxcellheight * 0.6), text: "Numeric \u2610", size: "16px", weight: "normal"},
	                 {x: cellxorigin+440, y: tickboxyorigin+(tickboxcellheight * 0.6), text: "Categoric \u2610", size: "16px", weight: "normal"},
	                 {x: cellxorigin+560, y: tickboxyorigin+(tickboxcellheight * 0.6), text: "FLACC \u2610", size: "16px", weight: "normal"},
	                 {x: cellxorigin+680, y: tickboxyorigin+(tickboxcellheight * 0.6), text: "NIPS \u2610", size: "16px", weight: "normal"},
	                 {x: cellxorigin+950, y: tickboxyorigin+(tickboxcellheight * 0.4), text: "Patient advised to report pain", size: "15px", weight: "normal"},
	                 {x: cellxorigin+950, y: tickboxyorigin+(tickboxcellheight * 0.8), text: "\u2610 Yes", size: "15px", weight: "normal"},
	                 {x: cellxorigin+1050, y: tickboxyorigin+(tickboxcellheight * 0.8), text: "\u2610 No", size: "15px", weight: "normal"}];


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
	
	// Add vertical line after VITAL SIGNS.
	gridChart.append("svg:line")
		.attr("x1", vitalsignwidth)
		.attr("y1", tableyorigin)
		.attr("x2", vitalsignwidth)
		.attr("y2", temperatureyorigin)
		.style("stroke", "black")
		.style("stroke-width", borderlinestroke);
	
	// Add horizontal header splitter line
	gridChart.append("svg:line")
		.attr("x1", vitalsignwidth)
		.attr("y1", tableyorigin+(topheaderheight*0.4))
		.attr("x2", tablewidth)
		.attr("y2", tableyorigin+(topheaderheight*0.4))
		.style("stroke", "black")
		.style("stroke-width", borderlinestroke);

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
		//.attr("y1", temperatureyorigin)
		.attr("y1", headersplitter)
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
		//.attr("y1", temperatureyorigin)
		.attr("y1", headersplitter)
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

}

function query(){
	
	// Get query values from HTML page
	var id = document.getElementById('patient_id').value.toUpperCase();
	var from = document.getElementById('date').value;
	
	// Form the web service query
    var timeformat = d3.time.format("%Y-%m-%d %H:%M");
	var todate = timeformat.parse(from + " 00:00");
	var formattedto = $.datepicker.formatDate("yy-mm-dd", todate);
	var toinclusive = new Date(todate);
	toinclusive.setDate(toinclusive.getDate() + 1);
	var newto = $.datepicker.formatDate("yy-mm-dd", toinclusive);
	var url = "./resources/chart?id="+id+"&from="+from+"&to="+newto+"&clinical=no";
    
	// SVG to draw line
   	var dotradius = 3;
    var mindate = timeformat.parse(from + " 00:00");
    var parseDate = d3.time.format("%Y-%m-%d %H:%M").parse;
    
    // Data range for columns
    var timecolumns = d3.range(cellxorigin+(cellwidth*0.5), innerwidth+1, cellwidth);
    var timescale = d3.range(cellxorigin-(cellwidth*0.5), innerwidth, cellwidth);
    var index = 0;
    
    // Formatting all the scales
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
       	.x(function(d) { return d.x;})
       	.y(function(d) { return temperaturescale(d.temp);})
    	.defined(function(d) { return d.temp; }); // for missing data
    var pulseline = d3.svg.line()
   		.x(function(d) { return d.x;})
   		.y(function(d) { return pulsescale(d.pulse);})
    	.defined(function(d) {return d.pulse;}); // for missing data
    var spo2line = d3.svg.line()
		.x(function(d) { return d.x;})
		.y(function(d) { return spo2scale(d.spo2);})
    	.defined(function(d) {return d.spo2;}); // for missing data

    
    d3.xml(url, "application/xml", function(error, data) {
    	if (error) throw error;
     	
    	data = [].map.call(data.querySelectorAll("MEASUREMENT"), function(measurement) {
            index++;
    		return {
            	time: getTime(parseDate(measurement.querySelector("DATETIME").textContent)),
            	temp: +measurement.querySelector("TEMP").textContent,
            	bphigh: +measurement.querySelector("BPHIGH").textContent,
            	bplow: +measurement.querySelector("BPLOW").textContent,
            	pulse: +measurement.querySelector("PULSE").textContent,
            	spo2: +measurement.querySelector("SPO2").textContent,
            	// Try to insert X scale
            	x: +timescale[index]
            };
        });
    	
    // remove the previous plotted data
    gridChart.selectAll("text.headerdate").remove();	
    gridChart.selectAll("text.headertime").remove();
    gridChart.selectAll("circle.tempdata").remove();
    gridChart.selectAll("path.templine").remove();
    gridChart.selectAll("text.bpdatahigh").remove();
    gridChart.selectAll("text.bpdatalow").remove();
    gridChart.selectAll("circle.pulsedata").remove();
    gridChart.selectAll("path.pulseline").remove();
    gridChart.selectAll("circle.spo2data").remove();
    gridChart.selectAll("path.spo2line").remove();
    
    // Insert date into header
    gridChart.append("text")
    	.text(formattedto)
    	.attr("class","headerdate")
    	.attr("x", cellxorigin + (innerwidth*0.39))
		.attr("y", tableyorigin+(topheaderheight*0.3))
		.attr("text-anchor", "middle")
		.attr("font-size", "16px")
		.attr("font-weight", "bold")
		.style("stroke-width", 3);

    // Insert time into header
	var headertimetext = gridChart.selectAll("text.headertime")
		.data(timecolumns)
		.enter()
		.append("text")
		.attr("class","headertime");

	var headertimelabels = headertimetext
		.attr("x", function(d){return d;})
		.attr("y", tableyorigin+(topheaderheight*0.8))
		.data(data)
		.text(function(d){return d.time;})
		.attr("text-anchor", "middle")
		.attr("font-size", "12px")
		.style("stroke-width", 3);
    
    
    // Observation chart has no scale and range, so just plot available data in each column
    // Draw data points and line for temperature
    gridChart.selectAll("circle.tempdata")
    	.data(timecolumns)
    	.enter()
    	.append("circle")
    	.attr("class", "tempdata")
    	.attr("cx", function(d){return d;})
    	.data(data)
    	.style("display", function(d) {if (isNaN(d.temp)) {return "none"} else { return "block" };}) 
    	.attr("cy", function(d){return temperaturescale(d.temp);})
    	.attr("r", dotradius)
    	
    gridChart.append("path")
    	.datum(data)
    	.attr("class", "templine")
    	.attr("d", templine);
        
    // Draw data points for BP
    gridChart.selectAll("text.bpdata")
		.data(timecolumns)
		.enter()
		.append("text")
		.attr("class","bpdatahigh")
		.attr("x", function(d){return d;})
		.data(data)
		.style("display", function(d) {if (isNaN(d.bphigh)) {return "none"} else { return "block" };}) 
		.attr("y", function(d){return bpscale(d.bphigh);})
		.attr("font-size", "20px")
		.attr("font-weight", "bold")
		.attr("text-anchor", "middle")
		.attr("fill", "red")
		.text("\u0076")
		.style("stroke-width", 3);
    
    gridChart.selectAll("text.bpdata")
		.data(timecolumns)
		.enter()
		.append("text")
		.attr("class","bpdatalow")
		.attr("x", function(d){return d;})
		.data(data)
		.style("display", function(d) {if (isNaN(d.bplow)) {return "none"} else { return "block" };}) 
		.attr("y", function(d){return bpscale(d.bplow);})
		.attr("font-size", "20px")
		.attr("font-weight", "bold")
		.attr("text-anchor", "middle")
		.text("\u028C")
		.attr("fill", "red")
		.style("stroke-width", 3);
    
    // Draw data points and line for pulse
    gridChart.selectAll("circle.pulsedata")
		.data(timecolumns)
		.enter()
		.append("circle")
		.attr("class", "pulsedata")
		.attr("cx", function(d){return d;})
		.data(data)
		.style("display", function(d) {if (isNaN(d.pulse)) {return "none"} else { return "block" };}) 
		.attr("cy", function(d){return pulsescale(d.pulse);})
		.attr("r", dotradius)
    
    gridChart.append("path")
       .datum(data)
       .attr("class", "pulseline")
       .attr("d", pulseline);
    
    // Draw data points and line for spo2
    gridChart.selectAll("circle.spo2data")
		.data(timecolumns)
		.enter()
		.append("circle")
		.attr("class", "spo2data")
		.attr("cx", function(d){return d;})
		.data(data)
		.style("display", function(d) {if (isNaN(d.spo2)) {return "none"} else { return "block" };}) 
		.attr("cy", function(d){return spo2scale(d.spo2);})
		.attr("r", dotradius)
       	
    gridChart.append("path")
       .datum(data)
       .attr("class", "spo2line")
       .attr("d", spo2line);

    });
 
}

function getTime(d) {
	var datetime = d.toString();
	var index = datetime.indexOf(":");
	var hh = datetime.substring(index-2,index);
	var mm = datetime.substring(index+1,index+3);
	var time = hh + ':' + mm;
	return time;
}
