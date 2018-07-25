console.log('Loading function');

/**
 * Sample Lambda that returns a mock object
 */
exports.handler = function(event, context) {
    console.log('Body:', event.body);
    console.log('Headers:', event.headers);
    console.log('Method:', event.method);
    console.log('Params:', event.params);
    console.log('Query:', event.query);

    /* var operation = event.params.id;*/
    
    var raceResult = {
		"position": 1,
		"class": "LMP1",
		"number": "1",
		"team": "Porsche Team",
		"drivers":[
			{"name": "Timo Bernhard", "country":"Germany" },
			{"name": "Mark Webber", "country":"Australia" },
			{"name": "Brendon Hartley", "country":"New Zealand" }
		],
		"chassis": "Porsche 919 Hybrid",
		"engine": "Porsche 2.0 L Turbo V4",
		"tire": "Michelin",
		"lapsCompleted": "194"
		 };

    
    context.done(null,JSON.stringify(raceResult));
	
};