var _rootDir = '/geartickswebsite/standard/';
var _standards = {
	'navbar': {
		position:'prepend body', //either prepend or append, then the element you want to put it in 
		url: 'navbar.html',
		events: [
			{
				selector: '#header>img',
				eventname: 'load',
				run: function(event) {
					console.log(event);
				}
			}
		]
	}
};

for (var i in _standards) {
	$.ajax({
		url: _rootDir + _standards[i].url,
		success: (function() {
			return function(d) {
				if (_standards[this.i].position[0] == 'p') { //prepend 
					$(_standards[this.i].position.substr(8)).prepend(d);
				}
				else { //append
					$(_standards[this.i].position.substr(7)).append(d);
				}
				if (_standards[this.i].events) {
					for (var j = 0; j < _standards[this.i].events.length; j++) {
						$(_standards[this.i].events[i].selector).on(_standards[this.i].events[i].eventname, _standards[this.i].events[i].run);
					}
				}
			}
		}()),
		dataType: 'html',
		i: i
	});
}