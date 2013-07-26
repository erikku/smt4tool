function Page() {
	// Nothing; it's a base class.
}

Page.prototype.tab = function() {
	alert("You called a pure virtual function!");
}

Page.prototype.initialize = function() {
	alert("You called a pure virtual function!");
}

Page.prototype.enter = function(data) {
	alert("You called a pure virtual function!");
}

Page.prototype.leave = function(data) {
	alert("You called a pure virtual function!");
}
