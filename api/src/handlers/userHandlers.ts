import { APIGatewayProxyHandler } from "aws-lambda";
import dynamoDb from "../db/dynamoClient.js";
import {
  GetItemCommand,
  PutItemCommand,
  ReturnValue,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuidv4 } from "uuid";
import validateToken, { makeResponse } from "../utils/index.js";

export const createUser: APIGatewayProxyHandler = async (event) => {
  try {
    const { username, email, roles, userId } = JSON.parse(event!.body!);
    const bearerToken = event.headers.Authorization;

    if (!username || !roles) {
      return { statusCode: 400, body: "Missing required user information." };
    }
    if (!bearerToken) {
      return { statusCode: 401, body: "Unauthorized" };
    }
    // console.log(bearerToken);

    const token = bearerToken.split("Bearer ")[1];
    // console.log(token);

    const decodedToken = await validateToken(token);
    console.log(decodedToken);

    const item = marshall({
      PK: `USER#${userId}`,
      SK: `USER#${userId}`,
      Type: "User",
      username: username,
      email: email,
      roles: roles,
      createdAt: new Date().toISOString(),
      preferences: {},
    });

    const newUser = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: item,
    };

    console.log(newUser);

    const command = new PutItemCommand(newUser);

    await dynamoDb.send(command);

    return makeResponse(200, newUser.Item);
  } catch (error) {
    console.error(error);
    return makeResponse(500, {}, "An error occurred while creating the user.");
  }
};

export const getUser: APIGatewayProxyHandler = async (event) => {
  try {
    const userId = event.pathParameters?.userId;

    if (!userId) {
      // return { statusCode: 400, body: "User ID is required." };
      return makeResponse(400, {}, "User ID is required.");
    }
    const decodedUserId = decodeURIComponent(userId);

    const key = marshall({
      PK: `USER#${decodedUserId}`,
      SK: `USER#${decodedUserId}`,
    });
    console.log(userId);

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: key,
    };

    console.log("params: ", params);
    const command = new GetItemCommand(params);
    const result = await dynamoDb.send(command);

    console.log("result: ", result);

    if (!result.Item) {
      return makeResponse(404, {}, "User not found.");
      // return { statusCode: 404, body: "User not found." };
    }

    const item = unmarshall(result.Item);

    return makeResponse(200, item);
  } catch (error) {
    console.error(error);
    return makeResponse(
      500,
      {},
      "An error occurred while retrieving the user."
    );
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

    const decodedUserId = decodeURIComponent(userId);

    const key = marshall({
      PK: `USER#${decodedUserId}`,
      SK: `USER#${decodedUserId}`,
    });

    const expressionAttributeValues = marshall({
      ":u": username,
      ":e": email,
    });

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: key,
      UpdateExpression: "set username = :u, email = :e",
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "UPDATED_NEW" as ReturnValue,
    };

    const command = new UpdateItemCommand(params);
    await dynamoDb.send(command);

    return makeResponse(200, { message: "User updated successfully" });
    // return {
    //     statusCode: 200,
    //     body: JSON.stringify({ message: "User updated successfully" }),
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": "*",
    //     },
    // };
  } catch (error) {
    console.error(error);
    return makeResponse(500, {}, "An error occurred while updating the user.");
    // return {
    //     statusCode: 500,
    //     body: "An error occurred while updating the user.",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // };
  }
};
