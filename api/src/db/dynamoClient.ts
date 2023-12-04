import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const dynamoDb = new DynamoDBClient({
    // You can add specific configuration here if needed
    // For example, specify a region or convert empty values:
    region: process.env.AWS_REGION,
    endpoint: process.env.DYNAMODB_ENDPOINT,
    // convertEmptyValues: true
});

export default dynamoDb;
