var webreceive;

function server_connect() {
	//server_ip = document.getElementById('server_ip').value;
	server_ip = "127.0.0.1" 

	//Create websocket client connection
	//websend = new WebSocket("ws://"+server_ip+":8080/medtrac/send");
	webreceive =  new WebSocket("ws://"+server_ip+":8080/medtrac/receive");
	//connect_ws(server_ip);
		
	webreceive.onmessage = function(event) {

		var json = JSON.parse(event.data);
		// save everything to localStorage for post processing
		localStorage.setItem("temperature", json.Temperature);
		localStorage.setItem("bphigh", json.BPhigh);
		localStorage.setItem("bplow", json.BPlow);
		localStorage.setItem("pulse", json.Pulse);
		localStorage.setItem("spo2", json.SpO2);
		
		if (json.BoxID == "40a36bc10566") {
			l = 1;
		} else if (json.BoxID == "40a36bc1055b") {
			l = 2;
		} else if (json.BoxID == "40a36bc10567") {
			l = 3;
		} else if (json.BoxID == "40a36bc10568") {
			l = 4;
		} else if (json.BoxID == "40a36bc1055a") {
			l = 5;
		} 
		
		var storedTemp = localStorage.getItem("temperature"+l);
		var storedBPhigh = localStorage.getItem("bphigh"+l);
		var storedBPlow = localStorage.getItem("bplow"+l);
		var storedPulse = localStorage.getItem("pulse"+l);
		var storedSPO2 = localStorage.getItem("spo2"+l);
		var readTemp = localStorage.getItem("temperature");
		var readBPhigh = localStorage.getItem("bphigh");
		var readBPlow = localStorage.getItem("bplow");
		var readPulse = localStorage.getItem("pulse");
		var readSPO2 = localStorage.getItem("spo2"); 
		
		localStorage.setItem("startdatetime"+l, json.StartDateTime);
		
		if (readTemp == "waiting" && storedTemp != "starting") {
			localStorage.setItem("temperature", storedTemp);
		} 
		else {
			localStorage.setItem("temperature"+l, readTemp);
		}
		if (readBPhigh == "waiting" && storedBPhigh != "starting") {
			localStorage.setItem("bphigh", storedBPhigh);
		} 
		else {
			localStorage.setItem("bphigh"+l, readBPhigh);
		}
		if (readBPlow == "waiting" && storedBPlow != "starting") {
			localStorage.setItem("bplow", storedBPlow);
		} 
		else {
			localStorage.setItem("bplow"+l, readBPlow);
		}
		if (readPulse == "waiting" && storedPulse != "starting") {
			localStorage.setItem("pulse", storedPulse);
		} 
		else {
			localStorage.setItem("pulse"+l, readPulse);
		}
		if (readSPO2 == "waiting" && storedSPO2 != "starting") {
			localStorage.setItem("spo2", storedSPO2);
		} 
		else {
			localStorage.setItem("spo2"+l, readSPO2);
		}
		
		// Below if for checking the alerts
		
		if (readTemp != "Error" && readTemp != "NA" && readTemp != "starting" && readTemp != "waiting") {
			var freadTemp = parseFloat(localStorage.getItem("temperature"));
			var thresTEMPW = parseFloat(localStorage.getItem("TEMPW"));
			if (localStorage.getItem("TEMPW") != null) {
				if (freadTemp >= thresTEMPW) {
					alert("Temperature Warning from Unit:"+json.BoxID+" Reading:"+readTemp);
				}
			}
		}
		if (readBPhigh != "Error" && readBPhigh != "NA" && readBPhigh != "starting" && readBPhigh != "waiting") {
			var freadBPhigh = parseFloat(localStorage.getItem("bphigh"));
			var thresBPUC = parseFloat(localStorage.getItem("BPUC"));
			var thresBPUW = parseFloat(localStorage.getItem("BPUW"));
			if (localStorage.getItem("BPUC") != null) {
				if (freadBPhigh >= thresBPUC) {
					alert("BP Systolic High Critical from Unit:"+json.BoxID+" Reading:"+readBPhigh);
				}
				else if (localStorage.getItem("BPUW") != null) {
					if (freadBPhigh >= thresBPUW) {
						alert("BP Systolic High Warning from Unit:"+json.BoxID+" Reading:"+readBPhigh);
					}
				}
			}
		}
		if (readBPhigh != "Error" && readBPhigh != "NA" && readBPhigh != "starting" && readBPhigh != "waiting") {
			var freadBPhigh = parseFloat(localStorage.getItem("bphigh"));
			var thresBPLC = parseFloat(localStorage.getItem("BPLC"));
			if (localStorage.getItem("BPLC") != null) {
				if (freadBPhigh <= thresBPLC) {
					alert("BP Systolic Low Critical from Unit:"+json.BoxID+" Reading:"+readBPhigh);
				}
			}
		}
		if (readPulse != "Error" && readPulse != "NA" && readPulse != "starting" && readPulse != "waiting") {
			var freadPulse = parseFloat(localStorage.getItem("pulse"));
			var thresPULSEUC = parseFloat(localStorage.getItem("PULSEUC"));
			var thresPULSEUW = parseFloat(localStorage.getItem("PULSEUW"));
			var thresPULSELC = parseFloat(localStorage.getItem("PULSELC"));
			var thresPULSELW = parseFloat(localStorage.getItem("PULSELW"));
			if (localStorage.getItem("PULSEUC") != null) {
				if (freadPulse >= thresPULSEUC) {
					alert("Pulse Upper Critical from Unit:"+json.BoxID+" Reading:"+readPulse);
				}
				else if (localStorage.getItem("PULSEUW") != null) {
					if (freadPulse >= thresPULSEUW) {
						alert("Pulse Upper Warning from Unit:"+json.BoxID+" Reading:"+readPulse);
					}
				}
			}
			if (localStorage.getItem("PULSELC") != null) {
				if (freadPulse <= thresPULSELC) {
					alert("Pulse Lower Critical from Unit:"+json.BoxID+" Reading:"+readPulse);
				}
				else if (localStorage.getItem("PULSELW") != null) {
					if (freadPulse <= thresPULSELW) {
						alert("Pulse Lower Warning from Unit:"+json.BoxID+" Reading:"+readPulse);
					}
				}
			}
		}
		if (readSPO2 != "Error" && readSPO2 != "NA" && readSPO2 != "starting" && readSPO2 != "waiting") {
			var freadSPO2 = parseFloat(localStorage.getItem("spo2"));
			var thresSPO2C = parseFloat(localStorage.getItem("SPO2C"));
			var thresSPO2W = parseFloat(localStorage.getItem("SPO2W"));
			if (localStorage.getItem("SPO2C") != null) {
				if (freadSPO2 <= thresSPO2C) {
					alert("SPO2 Critical from Unit:"+json.BoxID+" Reading:"+readSPO2);
				}
				else if (localStorage.getItem("SPO2W") != null) {
					if (freadSPO2 < thresSPO2W) {
						alert("SPO2 Warning from Unit:"+json.BoxID+" Reading:"+readSPO2);
					}
				}
			}
		}
		
		
		// Refresh the dashboard
		var iframe = document.getElementById('main_iframe');
		var innerDoc = (iframe.contentDocument) ? iframe.contentDocument : iframe.contentWindow.document;
		var elem = innerDoc.getElementById('dashboard');
		if(elem) {
			for (var i=1; i < 6; i++) {
				if (localStorage.getItem("startdatetime"+i) !== null) {
					innerDoc.getElementById('datetime_'+i).value = localStorage.getItem("startdatetime"+i);
				}
				if (localStorage.getItem("temperature"+i) !== null) {
					innerDoc.getElementById('temperature_'+i).value = localStorage.getItem("temperature"+i);
				}
				if (localStorage.getItem("bphigh"+i) !== null) {
					innerDoc.getElementById('bphigh_'+i).value = localStorage.getItem("bphigh"+i);
				}
				if (localStorage.getItem("bplow"+i) !== null) {
					innerDoc.getElementById('bplow_'+i).value = localStorage.getItem("bplow"+i);
				}
				if (localStorage.getItem("pulse"+i) !== null) {
					innerDoc.getElementById('pulse_'+i).value = localStorage.getItem("pulse"+i);
				}
				if (localStorage.getItem("spo2"+i) !== null) {
					innerDoc.getElementById('spo2_'+i).value = localStorage.getItem("spo2"+i);
				}
			}
			get_dashboard_patient();
		}
		
		// Refresh Manual Monitor dashboard
		var elem2 = innerDoc.getElementById('monitor2');
		if(elem) {
			for (var i=1; i < 6; i++) {
				if (localStorage.getItem("startdatetime"+i) !== null) {
					innerDoc.getElementById('time_'+i).value = localStorage.getItem("startdatetime"+i);
				}
				if (localStorage.getItem("temperature"+i) !== null) {
					innerDoc.getElementById('temp_'+i).value = localStorage.getItem("temperature"+i);
				}
				if (localStorage.getItem("bphigh"+i) !== null) {
					innerDoc.getElementById('bph_'+i).value = localStorage.getItem("bphigh"+i);
				}
				if (localStorage.getItem("bplow"+i) !== null) {
					innerDoc.getElementById('bpl_'+i).value = localStorage.getItem("bplow"+i);
				}
				if (localStorage.getItem("pulse"+i) !== null) {
					innerDoc.getElementById('pulse_'+i).value = localStorage.getItem("pulse"+i);
				}
				if (localStorage.getItem("spo2"+i) !== null) {
					innerDoc.getElementById('spo2_'+i).value = localStorage.getItem("spo2"+i);
				}
			}
		}
	}
	
	webreceive.onerror = function(event) {
		// Assuming the previous connection will automatically close, reconnect
		
		//server_ip = document.getElementById('server_ip').value;
		server_ip = "127.0.0.1" 

		//Create websocket client connection
		//websend = new WebSocket("ws://"+server_ip+":8080/medtrac/send");
		webreceive =  new WebSocket("ws://"+server_ip+":8080/medtrac/receive");
		//connect_ws(server_ip);
	}
	
	//webreceive.onclose = function(event) {
	//}
}

function load_threshold () {
	//if (!ActiveXObject) {
	xmlHttp = new XMLHttpRequest;
	//}
	//else {
	//    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	//} 

	var url = "./resources/threshold";
	xmlHttp.open('GET',url,true);
	xmlHttp.send(null);
	xmlHttp.onreadystatechange = function() {
	    if (xmlHttp.readyState == 4) {
	    	if ( xmlHttp.status == 200) {
	        	var xmldoc = xmlHttp.responseXML;
	
	    		for (var i = 0; i < xmldoc.getElementsByTagName("ALERT").length; i++) {
	    			var alert = xmldoc.getElementsByTagName("ALERT")[i].firstChild.nodeValue;
	    			var value = xmldoc.getElementsByTagName("VALUE")[i].firstChild.nodeValue;
	    			var checked = xmldoc.getElementsByTagName("CHECKED")[i].firstChild.nodeValue;
	    			if (checked == "Y") {
	    				localStorage.setItem(alert,value);
	    			}
	    		}
         }
         else
               alert("Error ->" + xmlHttp.responseText);
      	 }
	};
}

function get_dashboard_patient() {
	//if (!ActiveXObject) {
	xmlHttp = new XMLHttpRequest;
	//}
	//else {
	//    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	//} 

	//var url = "./resources/schedule/dashboard?med_id="+med_id;
	var url = "./resources/schedule/dashboard";
	xmlHttp.open('GET',url,true);
	xmlHttp.send(null);
	xmlHttp.onreadystatechange = function() {
	    if (xmlHttp.readyState == 4) {
	    	if ( xmlHttp.status == 200) {
	        	var xmldoc = xmlHttp.responseXML;
	        	
	        	var iframe = document.getElementById('main_iframe');
	    		var innerDoc = (iframe.contentDocument) ? iframe.contentDocument : iframe.contentWindow.document;
	    		var elem = innerDoc.getElementById('dashboard');
	    		
            	// Clear the table
            	for (var j = 1; j < 6; j++) {
            		innerDoc.getElementById("patientid_"+j).value = "";
	           	}
            	
        		for (var i = 0; i < xmldoc.getElementsByTagName("MED_ID").length; i++) {
        			var medid = xmldoc.getElementsByTagName("MED_ID")[i].firstChild.nodeValue;
        			var patientid = xmldoc.getElementsByTagName("PATIENT_ID")[i].firstChild.nodeValue;
        			var startdt = xmldoc.getElementsByTagName("MED_DATE_START")[i].firstChild.nodeValue;
        			var enddt = xmldoc.getElementsByTagName("MED_DATE_END")[i].firstChild.nodeValue;
         			if (medid == "40a36bc10566") {
        				l = 1;
           			} else if (medid == "40a36bc1055b") {
           				l = 2;
           			} else if (medid == "40a36bc10567") {
           				l = 3;
           			} else if (medid == "40a36bc10568") {
	       				l = 4;
	       			} else if (medid == "40a36bc1055a") {
	       				l = 5;
	       			} else {
				    	l = 0;
				    }
        			
        			if (l != 0) {
        				innerDoc.getElementById("patientid_"+l).value = patientid;
        			}
        		}
            }
	    	else {
               alert("Error ->" + xmlHttp.responseText);
	    	}
        }
	};
}