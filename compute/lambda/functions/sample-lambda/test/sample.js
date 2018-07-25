var expect    = require("chai").expect;
var sample = require("../sample-lambda");

/* Mock objects for AWS Lamdba */
var context = {
  done: function(param1, param2){}
};

var event = {
  body: "",
  headers: "",
  method: "",
  params: "",
  query: ""
};

describe("Sample AWS Lambda", function() {
  describe("Race Results", function() {
      it("Get Race Results", function() {
        var redHex   = sample.handler(event, context);
        //expect(context).to.equal("");
      });
    });
});
