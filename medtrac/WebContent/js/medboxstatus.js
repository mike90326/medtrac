for (var i=1; i < 6; i++) {
	if (localStorage.getItem("ipaddr"+i) !== null) {
		document.getElementById('ipaddr_'+i).textContent = localStorage.getItem("ipaddr"+i);
	}
	if (localStorage.getItem("tcp"+i) !== null) {
		document.getElementById('tcp_'+i).textContent = localStorage.getItem("tcp"+i);
	}
	if (localStorage.getItem("bpsens"+i) !== null) {
		document.getElementById('bpsens_'+i).textContent = localStorage.getItem("bpsens"+i);
	}
	if (localStorage.getItem("o2sens"+i) !== null) {
		document.getElementById('o2sens_'+i).textContent = localStorage.getItem("o2sens"+i);
	}
	if (localStorage.getItem("tempsens"+i) !== null) {
		document.getElementById('tempsens_'+i).textContent = localStorage.getItem("tempsens"+i);
	}
}