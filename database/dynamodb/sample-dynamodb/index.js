var AWS = require('aws-sdk'),
    dynamodb = new AWS.DynamoDB({
        endpoint: new AWS.Endpoint('http://localhost:8000'),
        "region": "us-east-1"
    });

var docClient = new AWS.DynamoDB.DocumentClient({
    endpoint: new AWS.Endpoint('http://localhost:8000'),
    "region": "us-east-1"
});

console.log("\n");

switch (process.argv[2]) {
    case "list":
        console.log(" ===================== Get List of Tables ===================== ");
        var params = {};
        dynamodb.listTables(params, function(err, data) {
            if (err)
                console.log(JSON.stringify(err, null, 2));
            else
                console.log(JSON.stringify(data, null, 2));
        });

        break;
    case "create":
        console.log(" ===================== Create Table ===================== ");
        var params = {
            TableName : "RaceResults",
            KeySchema: [
                { AttributeName: "eventId", KeyType: "HASH" },  //Partition key
                { AttributeName: "position", KeyType: "RANGE" } //Sort keyz
            ],
            AttributeDefinitions: [
                { AttributeName: "eventId", AttributeType: "S" },
                { AttributeName: "position", AttributeType: "S" }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            }
        };

        dynamodb.createTable(params, function(err, data) {
            if (err)
                console.log(JSON.stringify(err, null, 2));
            else
                console.log(JSON.stringify(data, null, 2));
        });
        break;
    case "details":
        console.log(" ===================== Get table description ===================== ");
        var params = {
            TableName: "RaceResults"
        };

        dynamodb.describeTable(params, function(err, data) {
            if (err)
                console.log(JSON.stringify(err, null, 2));
            else
                console.log(JSON.stringify(data, null, 2));
        });

        break;
    case "delete":
        console.log(" ===================== Delete an Table ===================== ");
        var params = {
        TableName: "RaceResults"
        };

        dynamodb.deleteTable(params, function(err, data) {
        if (err)
            console.log(JSON.stringify(err, null, 2));
        else
            console.log(JSON.stringify(data, null, 2));
        });


        break;
    case "scan":
        console.log(" ===================== Table Scan ===================== ");
        var params = {
            TableName: "RaceResults"
        };

        docClient.scan(params, function(err, data) {
            if (err)
                console.log(JSON.stringify(err, null, 2));
            else
                console.log(JSON.stringify(data, null, 2));
        });

        break;
    case "write":
        console.log(" ===================== Write Single Entry ===================== ");
        var params = {
        TableName: "RaceResults",
        Item: {
            "eventId":"1",
            "position":"1",
            "class":"LMP1",
            "number":"22",
            "team":"Test Team",
            "drivers":{
                "name":"Me",
                "country":"USA"
            },
            "chassis":"Porsche",
            "engine":"Porsche",
            "tire":"Michelin",
            "lapsCompleted":"97"
        }
        };

        docClient.put(params, function(err, data) {
        if (err)
            console.log(JSON.stringify(err, null, 2));
        else
            console.log(JSON.stringify(data, null, 2));
        });


        break;
        case "seed":
        console.log(" ===================== Write Multiple Items ===================== ");
        var params = {
            RequestItems: {
                "RaceResults": [
                    {
                        PutRequest: {
                            Item: {
                                "eventId":"1",
                                "position":"1",
                                "class":"LMP1",
                                "number":"2",
                                "team":"Porsche Team",
                                "drivers":[
                        			{"name": "Marc Lieb", "country":"Germany" },
                        			{"name": "Romain Dumas", "country":"France" },
                        			{"name": "Neel Jani", "country":"Switzerland" }
                        		],
                                "chassis":"Porsche 919 Hybrid",
                                "engine":"Porsche 2.0 L Turbo V4",
                                "tire":"Michelin",
                                "lapsCompleted":"384"
                            }
                        }
                    },
                    {
                        PutRequest: {
                            Item: {
                                "eventId":"1",
                                "position":"2",
                                "class":"LMP1",
                                "number":"6",
                                "team":"Toyota Gazoo Racing",
                                "drivers":[
                        			{"name": "Stéphane Sarrazin", "country":"France" },
                        			{"name": "Mike Conway", "country":"United Kingdom" },
                        			{"name": "Kamui Kobayashi", "country":"Japan" }
                        		],
                                "chassis":"Toyota TS050 Hybrid",
                                "engine":"Toyota 2.4 L Turbo V6",
                                "tire":"Michelin",
                                "lapsCompleted":"381"
                            }
                        }
                    },
                    {
                        PutRequest: {
                            Item: {
                                "eventId":"1",
                                "position":"3",
                                "class":"LMP1",
                                "number":"8",
                                "team":"Audi Sport Team Joest",
                                "drivers":[
                        			{"name": "Loïc Duval", "country":"France" },
                        			{"name": "Lucas di Grassi", "country":"Brazil" },
                        			{"name": "Oliver Jarvis", "country":"United Kingdom" }
                        		],
                                "chassis":"Audi R18",
                                "engine":"Audi TDI 4.0 L Turbo Diesel V6",
                                "tire":"Michelin",
                                "lapsCompleted":"372"
                            }
                        }
                    },
                    {
                        PutRequest: {
                            Item: {
                                "eventId":"1",
                                "position":"4",
                                "class":"LMP1",
                                "number":"7",
                                "team":"Audi Sport Team Joest",
                                "drivers":[
                        			{"name": "André Lotterer", "country":"Germany" },
                        			{"name": "Marcel Fässler", "country":"Switzerland" },
                        			{"name": "Benoît Tréluyer", "country":"France" }
                        		],
                                "chassis":"Audi R18",
                                "engine":"Audi TDI 4.0 L Turbo Diesel V6",
                                "tire":"Michelin",
                                "lapsCompleted":"367"
                            }
                        }
                    },
                    {
                        PutRequest: {
                            Item: {
                                "eventId":"1",
                                "position":"5",
                                "class":"LMP2",
                                "number":"7",
                                "team":"Signatech Alpine",
                                "drivers":[
                        			{"name": "Nicolas Lapierre", "country":"France" },
                        			{"name": "Gustavo Menezes", "country":"United States" },
                        			{"name": "Stéphane Richelmi", "country":"Monaco" }
                        		],
                                "chassis":"Alpine A460",
                                "engine":"Nissan VK45DE 4.5 L V8",
                                "tire":"Dunlop",
                                "lapsCompleted":"357"
                            }
                        }
                    },
                    {
                        PutRequest: {
                            Item: {
                                "eventId":"2",
                                "position":"1",
                                "class":"LMP1",
                                "number":"7",
                                "team":"Audi Sport Team Joest",
                                "drivers":[
                        			{"name": "André Lotterer", "country":"Germany" },
                        			{"name": "Marcel Fässler", "country":"Switzerland" },
                        			{"name": "Benoît Tréluyer", "country":"France" }
                        		],
                                "chassis":"Audi R18",
                                "engine":"Audi TDI 4.0 L Turbo Diesel V6",
                                "tire":"Michelin",
                                "lapsCompleted":"367"
                            }
                        }
                    }
                ]
            }
        };

        docClient.batchWrite(params, function (err, data) {
            if (err)
                console.log(JSON.stringify(err, null, 2));
            else
                console.log(JSON.stringify(data, null, 2));
        });

        break;
        case "read":
            console.log(" ===================== Read an Item ===================== ");
            var params = {
                TableName: "RaceResults",
                Key: {
                    "eventId": "1",
                    "position": "2"
                }
            };

            docClient.get(params, function(err, data) {
                if (err)
                    console.log(JSON.stringify(err, null, 2));
                else
                    console.log(JSON.stringify(data, null, 2));
            });
        break;

        case "query":
            console.log(" ===================== Query an Item ===================== ");
            var params = {
            TableName: "RaceResults",
            KeyConditionExpression: "eventId = :eventValue",
            ExpressionAttributeValues: {
                ":eventValue": "1"
            }
            };

            docClient.query(params, function(err, data) {
            if (err)
                console.log(JSON.stringify(err, null, 2));
            else
                console.log(JSON.stringify(data, null, 2));
            });
        break;

        case "search":
            console.log(" ===================== Query Item with Filter ===================== ");
            var params = {
                TableName: "RaceResults",
                ProjectionExpression: "team, chassis, engine, tire, lapsCompleted",
                KeyConditionExpression: "eventId = :eventValue",
                FilterExpression: "chassis = :chassisValue OR engine = :engineValue",
                ExpressionAttributeValues: {
                    ":eventValue": "1",
                    ":chassisValue": "Alpine A460",
                    ":engineValue": "Audi TDI 4.0 L Turbo Diesel V6"
                },
            };

            docClient.query(params, function(err, data) {
                if (err)
                    console.log(JSON.stringify(err, null, 2));
                else
                    console.log(JSON.stringify(data, null, 2));
            });
        break;
    default:
        /* ===================== Comamnd List ===================== */
        console.log("Need to provide parameter:  \n=====================");
        console.log("list - List tables \n" +
                    "create - Create table\n" +
                    "details - View table details\n" +
                    "delete - Remove table\n" +
                    "scan - View all records in table\n" +
                    "write - Create entry in table\n" +
                    "seed - Add muliple seed data records to table\n" +
                    "read - Read specific record by partition and sort key\n" +
                    "query - View all records by partition key\n" +
                    "search - View all records by partition key and other expressions.");

}
