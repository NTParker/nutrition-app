import { APIGatewayProxyHandler } from "aws-lambda";
import dynamoDb from "../db/dynamoClient.js";
import { GetItemCommand, PutItemCommand, ReturnValue, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuidv4 } from 'uuid';

export const createUser: APIGatewayProxyHandler = async (event) => {
  try {
    const { username, email, roles } = JSON.parse(event!.body!);

    if (!username || !roles) {
      return { statusCode: 400, body: "Missing required user information." };
    }
    const userId = uuidv4();

    const item = marshall({
      PK: `USER#${userId}`,
      SK: `USER#${userId}`,
      Type: "User",
      username: username,
      email: email,
      roles: roles,
    });

    const newUser = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: item,
    };
    
    const command = new PutItemCommand(newUser);

    await dynamoDb.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify(newUser.Item),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: "An error occurred while creating the user.",
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

export const getUser: APIGatewayProxyHandler = async (event) => {
  try {
    const userId = event.pathParameters?.userId;

    if (!userId) {
        return { statusCode: 400, body: "User ID is required." };
    }

    const key = marshall({
      PK: `USER#${userId}`,
      SK: `USER#${userId}`
  });

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: key
    };

    const command = new GetItemCommand(params);
    const result = await dynamoDb.send(command);

    if (!result.Item) {
        return { statusCode: 404, body: "User not found." };
    }

    const item = unmarshall(result.Item);

    return {
        statusCode: 200,
        body: JSON.stringify(item),
        headers: {
            "Content-Type": "application/json",
        },
    };
} catch (error) {
    console.error(error);
    return {
        statusCode: 500,
        body: "An error occurred while retrieving the user.",
        headers: {
            "Content-Type": "application/json",
        },
    };
}
};

export const updateUser: APIGatewayProxyHandler = async (event) => {
  try {
    const userId = event.pathParameters?.userId;
    if (!event.body) {
        return { statusCode: 400, body: "Missing required user information." };
    }
    const { username, email } = JSON.parse(event.body);

    if (!userId) {
        return { statusCode: 400, body: "User ID is required." };
    }

    const key = marshall({
      PK: `USER#${userId}`,
      SK: `USER#${userId}`
  });

  const expressionAttributeValues = marshall({
    ":u": username,
    ":e": email
});

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: key,
        UpdateExpression: "set username = :u, email = :e",
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "UPDATED_NEW" as ReturnValue
    };

    const command = new UpdateItemCommand(params);
    await dynamoDb.send(command);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "User updated successfully" }),
        headers: {
            "Content-Type": "application/json",
        },
    };
} catch (error) {
    console.error(error);
    return {
        statusCode: 500,
        body: "An error occurred while updating the user.",
        headers: {
            "Content-Type": "application/json",
        },
    };
}
};
