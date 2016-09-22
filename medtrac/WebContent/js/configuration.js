function medbox_discovery(){
	//alert("discovery");  
	//if (!ActiveXObject) {
		xmlHttp = new XMLHttpRequest;
	//}
	//else {
	//    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	//} 
	
	var url = "./resources/enumerate";
    xmlHttp.open('GET',url,true);
    xmlHttp.send(null);
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
        	if ( xmlHttp.status == 200) {
            	var xmldoc = xmlHttp.responseXML;
            	
        		for (var i = 0; i < xmldoc.getElementsByTagName("BoxID").length; i++) {
        			var boxid = xmldoc.getElementsByTagName("BoxID")[i].firstChild.nodeValue;
        			var boxip = xmldoc.getElementsByTagName("BoxIP")[i].firstChild.nodeValue;
        			var e1 = document.createElement("input");
        			e1.setAttribute("type", "text");
        			e1.setAttribute("value", boxid);
        			var e2 = document.createElement("input");
        			e2.setAttribute("type", "text");
        			e2.setAttribute("value", boxip);
        			var br = document.createElement("br");
        			device_list.appendChild(br);
        			device_list.appendChild(e1);
        			device_list.appendChild(e2);
        			
        		}
             }
             else
                   alert("Error ->" + xmlHttp.responseText);
          }
    };
}