function logout() {
	//if (!ActiveXObject) {
	xmlHttp = new XMLHttpRequest;
	//}
	//else {
	//    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	//} 
	
	var url = "./resources/logon";
	xmlHttp.open('POST',url,true);
	//xmlHttp.send(null);
	xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	xmlHttp.onreadystatechange = function() {
	    if (xmlHttp.readyState == 4) {
	    	if ( xmlHttp.status == 200) {
	    		var login = xmlHttp.responseText;
	    		
	    		if (login == "false") {
	    			//alert("logged out!");
	    		}
	    	}
	    }
	};
	
	var json = {
			'UserId' : "1",
			'Password' : "9999",
			'Logon' : "logout",
	};
	
	xmlHttp.send(JSON.stringify(json));
	
}

