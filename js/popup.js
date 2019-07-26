// System Info Chrome extension
// David Christian

// System info Chrome extension
var systemInformation = {
  requestInfo: function() {
		chrome.system.cpu.getInfo(function (cpuInfo){
			var elem = document.getElementById('cpu');

			var info = cpuInfo.modelName + "<br>";
			info += "Architecture: " + cpuInfo.archName + "<br>";
			info += "Cores: " + cpuInfo.numOfProcessors.toString() + "<br>";
			// info += "Features: " + cpuInfo.features + "<br>";

			info += "<table><tr><th>#</th><th>User (ms)</th><th>Kernel (ms)</th><th>Idle (ms)</th><th>Total (ms)</th></tr>";

			for (var i=0; i < cpuInfo.processors.length; i++){
				info += "<tr><td>" + i + "</td>";
				info += "<td>" + cpuInfo.processors[i].usage.user + "</td>";
				info += "<td>" + cpuInfo.processors[i].usage.kernel + "</td>";
				info += "<td>" + cpuInfo.processors[i].usage.idle + "</td>";
				info += "<td>" + cpuInfo.processors[i].usage.total + "</td><tr>";
			}

			elem.innerHTML = info + "</table>";
		});

		chrome.system.memory.getInfo(function (ramInfo){
			var elem = document.getElementById('ram');
			elem.innerHTML = (ramInfo.availableCapacity / 1073741824).toFixed(2)
									   + "gb / " + Math.round(ramInfo.capacity / 1073741824).toFixed(2)
									   + "gb (" + ((ramInfo.availableCapacity / ramInfo.capacity) * 100.0).toFixed(2).toString() + "% available)";
		});
  }
};

// Start getting system data as soon as page is ready..
document.addEventListener('DOMContentLoaded', function () {
  // Ensure that we have a display straight away
  systemInformation.requestInfo();

  // Update the display every 3 seconds
  setInterval(systemInformation.requestInfo, 3000);
});
