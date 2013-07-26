appNamesEN = [ ];
appByNameEN = { };

currentApp = { };

function parseRequirements(reqList) {
	var html = "";

	$.each(reqList, function(index, req) {
		if(html.length)
			html += ", ";

		if(req.length > 4 && req.substring(0, 4) == "app:") {
			html += htmlAppLink(req.substring(4));
		} else {
			html += req;
		}
	});

	return html;
}

function appTableHeader() {
	var appList = "";
	appList += "<table>";
	appList += "<th><a>Name</a></th>";
	appList += "<th><a>Points</a></th>";
	appList += "<th><a>Requirements</a></th>";
	appList += "<th><a>Description</a></th>";

	return appList;
}

function appClicked(obj) {
	showApp($(obj).text());
}

function appTableEntry(data) {
	var appList = "";
	appList += "<tr>";
	appList += "<td><a class=\"appLink\" onClick=\"appClicked(this);\">" +
		data.name + "</a></td>";
	appList += "<td>" + data.points + "</td>";
	appList += "<td>" + parseRequirements(data.req) + "</td>";
	appList += "<td>" + data.desc + "</td>";
	appList += "</tr>";

	return appList;
}

function appTableFooter() {
	return "</table>";
}

function showAppList(html) {
	$("#appData").hide();
	$("#appList").html(html);
	$("#showAllAppsBtn").show();
	$("#appList").show();
}

function showAllApps() {
	var apps = [ ];

	$.each(appByNameEN, function(name, data) {
		apps.push(data);
	});

	apps.sort(function(a, b) {
		return a.name > b.name ? 1 : -1;
	});

	var appList = appTableHeader();

	$.each(apps, function(index, data) {
		appList += appTableEntry(data);
	});

	appList += appTableFooter();

	showAppList(appList);

	$("#showAllAppsBtn").hide();
}

function showApp(name) {
	name = name.toLowerCase();

	if(!(name in appByNameEN))
		return;

	var data = appByNameEN[name];
	currentApp = data;

	showTab("apps");

	$("#appData_name").text(data.name);
	$("#appData_points").text(data.points);
	$("#appData_req").html(parseRequirements(data.req));
	$("#appData_desc").text(data.desc);

	if(data.notes && data.notes.length > 1) {
		$("#appData_notes").text(data.notes);
		$("#appData_notesRow").show();
	} else {
		$("#appData_notesRow").hide();
	}

	$("#appList").hide();
	$('#appData').show();
	$("#showAllAppsBtn").show();
}
