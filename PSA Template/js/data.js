function saveLang() {
	var langJson;
	if (localStorage.getItem('lang') == null) {
		langJson = {
			templatePlaceholder: "Nom du template",
			activititesTitle: "Autres Activités",
			projectTtitle: "Projets",
			optionActivite: "choisissez votre activité",
			cancelBtn: "Annuler",
			timeName: "Temps :",
			Morning: "Matin",
			Afternoon: "Après-midi",
			locationTitle: "Lieu",
			locationMornName: "Lieu Matin :",
			locationAfterName: "Lieu Après-midi :",
			activitiesName: "Activités :",
			categories: [
				"Abs. autorisée non rémunérée",
				"Absc non autoriséee non payée",
				"Absence autorisée MEH",
				"Absence autorisée MEH RQTH",
				"Accident de trajet",
				"Accident de travail",
				"Avant-vente",
				"Bénéficiaire don de congé",
				"Compl temps partiel / activite",
				"Congé administratif",
				"Congé CIF non rémunéré",
				"Congé CIF rémunéré",
				"Congé conseiller prud\'homale",
				"Congé d\'accompagnement",
				"Congé de parentalité non payé",
				"Congé de parentalité payé",
				"Congé de paternité",
				"Congé déménagement",
				"Congé enfant malade",
				"Congé examen prénatal",
				"Congé mariage/PACS",
				"Congé mariage/PACS enfant",
				"Congé militaire",
				"Congé naissance enfant",
				"Congé pour décès famille",
				"Congé pour examen / etudes",
				"Congé pour juré/témoin",
				"Congé recherche d\'emploi",
				"Congé sans solde",
				"Congé solidarité familiale",
				"Dispense Spe Rem",
				"Elu d\'état",
				"Enfant malade Alsace-Moseille",
				"Formation",
				"Formation Animation",
				"Formation mandat (CFESS IRP)",
				"Formation syndicale (CFESS)",
				"Général et administration",
				"Grossesse patho. post-natale",
				"Grossesse patho. pré-natale",
				"Heures déplacements récup",
				"Jour férié",
				"Jours CET",
				"Maladie",
				"Maladie professionnelle",
				"PDPMA",
				"Repos Hebdo/Quotidien",
				"Retour progressif au travail",
				"RTT non payée (Q2)",
				"RTT Q1",
				"Survenance handicap enfant",
				"Temps compensatoire",
				"Travaux passagers",
				"Vacances (Congés payés)"
			],
			days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
			locations: [
				{ value: 'NA', label: 'N/A' },
				{ value: 'O', label: 'CGI' },
				{ value: 'C', label: 'Client' },
				{ value: 'T', label: 'Télétravail' },
			]
		};
		localStorage.setItem('lang', JSON.stringify(langJson));
		location.reload();
	}
	else {
		$(document).ready(function () {
			$('#lang').change(function () {
				switch ($('#lang')[0].value) {
					case ("fr"): {
						console.log('switch fr');
						langJson = {
							templatePlaceholder: "Nom du template",
							activititesTitle: "Autres Activités",
							projectTtitle: "Projets",
							optionActivite: "choisissez votre activité",
							cancelBtn: "Annuler",
							timeName: "Temps :",
							Morning: "Matin",
							Afternoon: "Après-midi",
							locationTitle: "Lieu",
							locationMornName: "Lieu Matin :",
							locationAfterName: "Lieu Après-midi :",
							activitiesName: "Activités :",
							categories: [
								"Abs. autorisée non rémunérée",
								"Absc non autoriséee non payée",
								"Absence autorisée MEH",
								"Absence autorisée MEH RQTH",
								"Accident de trajet",
								"Accident de travail",
								"Avant-vente",
								"Bénéficiaire don de congé",
								"Compl temps partiel / activite",
								"Congé administratif",
								"Congé CIF non rémunéré",
								"Congé CIF rémunéré",
								"Congé conseiller prud\'homale",
								"Congé d\'accompagnement",
								"Congé de parentalité non payé",
								"Congé de parentalité payé",
								"Congé de paternité",
								"Congé déménagement",
								"Congé enfant malade",
								"Congé examen prénatal",
								"Congé mariage/PACS",
								"Congé mariage/PACS enfant",
								"Congé militaire",
								"Congé naissance enfant",
								"Congé pour décès famille",
								"Congé pour examen / etudes",
								"Congé pour juré/témoin",
								"Congé recherche d\'emploi",
								"Congé sans solde",
								"Congé solidarité familiale",
								"Dispense Spe Rem",
								"Elu d\'état",
								"Enfant malade Alsace-Moseille",
								"Formation",
								"Formation Animation",
								"Formation mandat (CFESS IRP)",
								"Formation syndicale (CFESS)",
								"Général et administration",
								"Grossesse patho. post-natale",
								"Grossesse patho. pré-natale",
								"Heures déplacements récup",
								"Jour férié",
								"Jours CET",
								"Maladie",
								"Maladie professionnelle",
								"PDPMA",
								"Repos Hebdo/Quotidien",
								"Retour progressif au travail",
								"RTT non payée (Q2)",
								"RTT Q1",
								"Survenance handicap enfant",
								"Temps compensatoire",
								"Travaux passagers",
								"Vacances (Congés payés)"
							],
							days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
							locations: [
								{ value: 'NA', label: 'N/A' },
								{ value: 'O', label: 'CGI' },
								{ value: 'C', label: 'Client' },
								{ value: 'T', label: 'Télétravail' },
							]
						};
						localStorage.setItem('lang', JSON.stringify(langJson));
						break;
					};
					case ("en"): {
						console.log('switch en');
						langJson = {
							templatePlaceholder: "Template name",
							activititesTitle: "Others Activities",
							projectTtitle: "Projects",
							optionActivite: "choose your activitie",
							cancelBtn: "Cancel",
							timeName: "Time :",
							Morning: "Morning",
							Afternoon: "Afternoon",
							locationTitle: "Locations",
							locationMornName: "Location Morning :",
							locationAfterName: "Location Afternoon :",
							activitiesName: "Activites :",
							categories: [
								"Accident on the way to work Lv",
								"Accompaniment Leave",
								"Administrative Leave",
								"Authorized Absence MEH",
								"Authorized Absence MEH RQTH",
								"Authorized Unpaid Absence",
								"Bench",
								"Beneficiary Vac Donation Lv",
								"Bereavement Leave",
								"CET Leave",
								"Care of Child (Alsace-Moselle)",
								"Care of child",
								"Compensatory Time",
								"Daily / Weekly rest",
								"Education Leave (Paid)",
								"Education Leave (Unpaid)",
								"Exam/Study Leave",
								"Family Member Marriage",
								"Family Support Leave",
								"General and administration",
								"Grad Return to Work Off Days",
								"Handicap Child Announcement Lv",
								"Hours traveled recovered",
								"Job Search Leave",
								"Jury Duty Leave",
								"Labor Court Advise Leave",
								"Learning",
								"Learning animation",
								"Leave Without Pay",
								"Marriage Leave",
								"Military Leave",
								"Paid Parental Leave",
								"Paid special dispensation",
								"Paternity Birth Leave",
								"Paternity Leave",
								"Political Mandate Leave",
								"Postnatal Pathological Leave",
								"Prenatal Exam/Course",
								"Prenatal Pathological Leave",
								"Professional Illness Leave",
								"Proposal activity",
								"Public holiday",
								"Q2 Leave",
								"RTT Leave",
								"Relocation Leave",
								"Reproduction Protocol Leave",
								"Sick Leave",
								"Supplement part time/activity",
								"Unauthorized/Unpaid Leave",
								"Union Related Training Leave",
								"Union Training Leave",
								"Unpaid Parental Leave",
								"Vacation",
								"Work Injury Leave"
							],
							days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
							locations: [
								{ value: 'NA', label: 'N/A' },
								{ value: 'O', label: 'CGI' },
								{ value: 'C', label: 'Customer' },
								{ value: 'T', label: 'Teleworking' },
							]
						};
					}
						localStorage.setItem('lang', JSON.stringify(langJson));
						break;
				};
				location.reload();
			});
		});

	}
}
var lang = JSON.parse(localStorage.getItem('lang'));
var templatePlaceholder = lang.templatePlaceholder;
var projectTtitle = lang.projectTtitle;
var activititesTitle = lang.activititesTitle;
var timeName = lang.timeName;
var locationMornName = lang.locationMornName;
var locationAfterName = lang.locationAfterName;
var activitiesName = lang.activitiesName;
var optionActivite = lang.optionActivite;
var cancelBtn = lang.cancelBtn;
var categories = lang.categories;
var locations = lang.locations;
var days = lang.days;
var Morning = lang.Morning;
var Afternoon = lang.Afternoon;
var locationTitle = lang.locationTitle;

