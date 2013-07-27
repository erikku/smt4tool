$("#walkthrough").empty().append($.create("h1").text("Main Story")).append(
$.create("ol"
	).contents("Introduction", "intro"
	).contents("Training Exercise", "training"
	/*).contents("Toyosu", "toyosu"*/
	).contents("Quest: Help Me Get Some Servers", "cameron_building"
));
