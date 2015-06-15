var graph = require('fbgraph');
var Config = require('./config');
access_token=Config.access_token;
var messagearray=[];

graph.setAccessToken(access_token);


var makenicearray=function(arr){
	var n=arr.length;
	for(var i=0;i<n;i++){
		if(arr[i].message)
		{
			messagearray[messagearray.length]=arr[i].message;
		}
	}
}


var extractfunc=function(minurl){
	graph.get(minurl, function(err, res) {
			//console.log(res.data);
			makenicearray(res.data);
	if(res.paging && res.paging.next) {
			extractfunc(res.paging.next);
		}
	else{
		console.log(messagearray);
	}
	});
}

graph.get('me?fields=statuses{message}', function(err, res) {
	if(err){console.log(err)}
	else{
		//console.log(res.statuses.data); 
		makenicearray(res.statuses.data);
		 if(res.statuses.paging && res.statuses.paging.next) {
			graph.get(res.statuses.paging.next, function(err, res) {
				//console.log(res.data);
				makenicearray(res.data);
				if(err){console.log(err)}
				else{
			    	extractfunc(res.paging.next);}
		    });
		}
	}
});

