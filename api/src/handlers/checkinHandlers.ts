import {
  GetItemCommand,
  PutItemCommand,
  ReturnValue,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyHandler } from "aws-lambda";
import dynamoDb from "../db/dynamoClient.js";
import { v4 as uuidv4 } from "uuid";

export const createCheckin: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.body || !event.queryStringParameters) {
      return {
        statusCode: 400,
        body: "Missing required checkin information.",
      };
    }
    const { userId } = event.queryStringParameters;
    if (!userId) {
      return { statusCode: 400, body: "Missing required user ID." };
    }

    const checkinId = uuidv4(); // Generate a unique UUID for the check-in
    const checkinDate = new Date().toISOString();

    const item = {
      PK: `USER#${userId}`,
      SK: `CHECKIN#${checkinId}`,
      Type: "CheckIn",
      UserId: userId,
      Date: checkinDate,
      Status: "Pending",
      Notes: [],
    };

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: marshall(item),
    };

    await dynamoDb.send(new PutItemCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({
        checkinId,
        message: "Check-in created successfully",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: "An error occurred while creating the check-in.",
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

export const getCheckin: APIGatewayProxyHandler = async (event) => {
  try {
    // Ensure the necessary parameters are present
    if (!event.queryStringParameters) {
      return { statusCode: 400, body: "Missing required query parameters." };
    }

    const { checkinId, userId } = event.queryStringParameters;

    if (!checkinId || !userId) {
      return { statusCode: 400, body: "User ID and timestamp are required." };
    }

    // Prepare the key to fetch the item
    const key = marshall({
        PK: `USER#${userId}`,
        SK: `CHECKIN#${checkinId}`,
    });

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: key,
    };

    // Retrieve the check-in item from DynamoDB
    const command = new GetItemCommand(params);
    const result = await dynamoDb.send(command);

    // Check if the item was found
    if (!result.Item) {
      return { statusCode: 404, body: "Check-in not found." };
    }

    // Unmarshall and return the item
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
      body: "An error occurred while retrieving the check-in.",
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

export const updateCheckin: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.queryStringParameters) {
      return { statusCode: 400, body: "Missing required query parameters." };
    }

    const { checkinId, userId } = event.queryStringParameters;
    if (!checkinId || !userId) {
      return { statusCode: 400, body: "Missing required checkinId." };
    }

    if (!event.body) {
      return {
        statusCode: 400,
        body: "Missing required check-in information.",
      };
    }

    const { status, notes } = JSON.parse(event.body);
    let updateExpression = "set";
    let expressionAttributeValues: any = {};
    let hasAttributesToUpdate = false;

    if (status) {
      updateExpression += ` Status = :status,`;
      expressionAttributeValues[":status"] = status;
      hasAttributesToUpdate = true;
    }

    if (notes) {
      updateExpression += ` Notes = :notes,`;
      expressionAttributeValues[":notes"] = notes;
      hasAttributesToUpdate = true;
    }

    updateExpression = updateExpression.replace(/,\s*$/, ""); // Remove trailing comma

    if (!hasAttributesToUpdate) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "No updateable fields provided" }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    const key = marshall({
      PK: `USER#${userId}`,
      SK: `CHECKIN#${checkinId}`,
    });

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: key,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: marshall(expressionAttributeValues),
      ReturnValues: "UPDATED_NEW" as ReturnValue,
    };

    await dynamoDb.send(new UpdateItemCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Check-in updated successfully" }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: "An error occurred while updating the check-in.",
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};
