document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
});

$(document).ready(function() {
    function displayBtn(param){
        disp=document.getElementById('savedBtn');
        disp.innerHTML="<button id=button>"+JSON.parse(localStorage.getItem(0)).templateName+"</button>";
    }
    displayBtn();
	$('#button').click(function() {
		console.log('click !');
		chrome.tabs.query({
			currentWindow: true,
			active : true
		}, function(tabs) {
			var optionData = getStoredData();
			tabs.forEach(function(tab) {
				console.log('sending message to ' + tab.id);
				chrome.tabs.sendMessage(tab.id, optionData, function() {
					console.log('message sent to ' + tab.id);
				});
			});
			
        });
    });

});

function getStoredData(){
    return JSON.parse(localStorage.getItem(0));
}