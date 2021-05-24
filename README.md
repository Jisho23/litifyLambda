# litifyLambda

Demo simple product service. Infra on aws, created via CLI tool and UI.

Api gateway endpoint: https://ajg8slh030.execute-api.us-east-1.amazonaws.com/prod/products

Structure: client -> api gateway -> lambda (3 methods)
                                  
Request body validation: productsModel.json
Single lambda execution role: lambda-products-apigateway-role
