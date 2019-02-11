$(document).ready(function () {
    function displayBtn() {
        for (var key in localStorage) {
            if (localStorage.getItem(key) != null) {
                var optionData = getStoredData(key);
                disp = document.getElementById('savedBtn');
                var locationTab = [];
                var cat;
                for (var i = 0; i < optionData.location.length; i++) {
                    switch (optionData.location[i]) {
                        case "O":
                            locationTab.push('CGI');
                            break;
                        case "C":
                            locationTab.push('Client');
                            break;
                        case "T":
                            locationTab.push('Teletravail');
                            break;
                        case "NA":
                            locationTab.push('N/A');
                            break;
                    }
                }
                switch (optionData.category) {
                    case 'proj':
                        cat = 'project';
                        break;
                    case '0':
                        cat = 'congé cons. prud\'homiale';
                        break;
                    case '1':
                        cat = 'congé payé';
                        break;
                    case '2':
                        cat = 'tps. compensatoire';
                        break;
                    case '3':
                        cat = 'maladie';
                        break;
                    case '4':
                        cat = 'congé déménagement';
                        break;
                    case '5':
                        cat = 'congé décès famille';
                        break;
                    case '6':
                        cat = 'accident trav.';
                        break;
                    case '7':
                        cat = 'congé juré/témoin';
                        break;
                    case '8':
                        cat = 'congé militaire';
                        break;
                    case '9':
                        cat = 'congé mariage/PACS';
                        break;
                    case '10':
                        cat = 'congé paternité';
                        break;
                    case '11':
                        cat = 'congé naiss. enfant';
                        break;
                    case '12':
                        cat = 'congé solidarité familiale';
                        break;
                    case '13':
                        cat = 'congé administratif';
                        break;
                    case '14':
                        cat = 'retour progressif trav.';
                        break;
                    case '15':
                        cat = 'abs. non autorisée non payée';
                        break;
                    case '16':
                        cat = 'congé sans solde';
                        break;
                    case '17':
                        cat = 'congé enfant malade';
                        break;
                    case '18':
                        cat = 'congé examen prénatal';
                        break;
                    case '19':
                        cat = 'congé parentalité payé';
                        break;
                    case '20':
                        cat = 'congé prentalité non payé';
                        break;
                    case '21':
                        cat = 'travaux passagers';
                        break;
                    case '22':
                        cat = 'avant-vente';
                        break;
                    case '23':
                        cat = 'général/administration';
                        break;
                    case '24':
                        cat = 'compl. tps. partiel/activité';
                        break;
                    case '25':
                        cat = 'formation'
                        break;
                    case '26':
                        cat = 'formation animation';
                        break;
                    case '27':
                        cat = 'jour férié';
                        break;
                    case '28':
                        cat = 'RTT Q1';
                        break;
                    case '29':
                        cat = 'RTT non payé(Q2)';
                        break;
                    case '30':
                        cat = 'enfant malade alsace-moseille';
                        break;
                    case '31':
                        cat = 'bénéficiaire don congé';
                        break;
                    case '32':
                        cat = 'abs. autorisée non rém.';
                        break;
                    case '33':
                        cat = 'maladie professionnelle';
                        break;
                    case '34':
                        cat = 'accident trajet';
                        break;
                    case '35':
                        cat = 'gross. patho. pré-natale';
                        break;
                    case '36':
                        cat = 'gross. patho. post-natale';
                        break;
                    case '37':
                        cat = 'élu d\'état';
                        break;
                    case '38':
                        cat = 'congé rech. d\'emploi';
                        break;
                    case '39':
                        cat = 'heures déplacements récup.';
                        break;
                    case '40':
                        cat = 'dispense spe. rem.';
                        break;
                    case '41':
                        cat = 'repos hebdo/quotidien';
                        break;
                    case '42':
                        cat = 'congé d\'accompagnement';
                        break;
                    case '43':
                        cat = 'abs. autorisée MEH';
                        break;
                    case '44':
                        cat = 'formation syndicale';
                        break;
                    case '45':
                        cat = 'formation mandat';
                        break;
                    case '46':
                        cat = 'abs. autorisée MEH RQTH';
                        break;
                    case '47':
                        cat = 'PDPMA';
                        break;
                    case '48':
                        cat = 'jour CET';
                        break;
                }
                disp.innerHTML += "<button id='" + optionData.id + "' title='time: " + optionData.time + "h/day| location:" + locationTab + "|category:" + cat + "'>" + optionData.templateName + "</button>";
            }
        }

    }
    displayBtn();
    $('button').click(function (event) {
        console.log('click !');
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function (tabs) {
            console.log(event.target.id);
            var optionData = getStoredData(event.target.id);
            tabs.forEach(function (tab) {
                console.log('sending message to ' + tab.id);
                chrome.tabs.sendMessage(tab.id, optionData, function () {
                    console.log('message sent to ' + tab.id);
                });
            });
        });
    });

});

function getStoredData(key) {
    return JSON.parse(localStorage.getItem(key));
}