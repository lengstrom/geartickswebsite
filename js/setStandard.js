var _rootDir = '../standard/';
var _standards = {
	'navbar':{
		position:'prepend body', //either prepend or append, then the element you want to put it in 
		url:"navbar.html"
	}
};

for (var i in _standards) {
	$.ajax({
		url:_rootDir + _standards[i].url,
		success:function() {
			if (_standards[i].position[0] == 'p') { //prepend 
				$(_standards[i].position.substr(8)).prepend(d);
			}
			else { //append
				$(_standards[i].position.substr(7)).append(d);
			}
		},
		dataType:'html'
	});
}