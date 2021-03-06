console.log('Loading function');

var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "products-lambda-table"
var tags = 'tags'

function formatTagFilterExpression(tagsArray)
{
    var returnArray = []
    tagsArray.forEach(function(v, i){ returnArray.push(`(tags, :tag${i+1})`)})
    returnArray.join(" OR contains ")
    return "contains " + returnArray
}

function formatExpressionAttrributeValues(tagsArray)
{
    var values = {}
    tagsArray.forEach(function(v, i){
        values[`:tag${i+1}`] = v
    })
    return values
}

exports.handler = function(event, context, callback) {
    console.log('Received event:', JSON.stringify(event['tags'], null, 2));
    var tagsArray = event[tags].split(',');
    var params = {
        TableName : tableName,
        FilterExpression: formatTagFilterExpression(tagsArray),
        ExpressionAttributeValues : formatExpressionAttrributeValues(tagsArray)
    };
    console.log('Searching db with params:', JSON.stringify(params, null, 2))
    dynamo.scan(params, function(err, data) {
      if (err) console.log(err);
      else callback(null, {"_records" : data.Items});
    });
};
