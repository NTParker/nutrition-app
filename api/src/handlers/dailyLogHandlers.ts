import {
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
  ReturnValue,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyHandler } from "aws-lambda";
import dynamoDb from "../db/dynamoClient.js";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuidv4 } from 'uuid';

export const createDailyLog: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.body || !event.queryStringParameters) {
        return { statusCode: 400, body: "Missing required log information." };
    }

    const { userId } = event.queryStringParameters;

    const { date, meals, exercises, nutrients, note } = JSON.parse(event.body);
    const logId = uuidv4(); // Generate a unique UUID for the log

    if (!userId || !date) {
        return { statusCode: 400, body: "User ID and date are required." };
    }

    const item = {
        PK: `USER#${userId}`,
        SK: `LOG#${logId}`,
        Type: "dailyLog",
        UserId: userId,
        Date: date,
        Meals: meals,
        Exercises: exercises,
        Nutrients: nutrients,
        Note: note,
    };

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: marshall(item)
    };

    await dynamoDb.send(new PutItemCommand(params));

    return {
        statusCode: 200,
        body: JSON.stringify({ logId, message: "Daily log created successfully" }),
        headers: {
            "Content-Type": "application/json",
        },
    };
} catch (error) {
    console.error(error);
    return {
        statusCode: 500,
        body: "An error occurred while creating the daily log.",
        headers: {
            "Content-Type": "application/json",
        },
    };
}
};

export const getDailyLog: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.queryStringParameters) {
      return { statusCode: 400, body: "Missing required query parameters." };
    }

    const { logId, userId } = event.queryStringParameters;

    if (!logId || !userId) {
      return { statusCode: 400, body: "Missing required query parameters." };
    }

    const key = marshall({
      PK: `USER#${userId}`,
      SK: `LOG#${logId}`,
    });

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: key,
    };

    const command = new GetItemCommand(params);
    const result = await dynamoDb.send(command);

    if (!result.Item) {
      return { statusCode: 404, body: "log not found." };
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
      body: "An error occurred while retrieving the nutrition log.",
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

export const updateDailyLog: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.queryStringParameters) {
      return { statusCode: 400, body: "Missing required query parameters." };
    }

    const { logId, userId } = event.queryStringParameters;
    if (!event.body) {
      return {
        statusCode: 400,
        body: "Missing required nutrition log information.",
      };
    }

    const { date, meals, exercises, nutrients, note } = JSON.parse(
      event.body
    );

    if (!userId || !date) {
      return { statusCode: 400, body: "User ID and date are required." };
    }
    let updateExpression = "";
    let expressionAttributeValues: any = {};

    // Construct the UpdateExpression and ExpressionAttributeValues
    if (meals !== undefined) {
      updateExpression += `${updateExpression ? ',' : 'set'} Meals = :m`;
      expressionAttributeValues[":m"] = meals;
    }
    if (exercises !== undefined) {
      updateExpression += `${updateExpression ? ',' : 'set'} Exercises = :e`;
      expressionAttributeValues[":e"] = exercises;
    }
    if (nutrients !== undefined) {
      updateExpression += `${updateExpression ? ',' : 'set'} Nutrients = :n`;
      expressionAttributeValues[":n"] = nutrients;
    }

    if (note !== undefined) {
      updateExpression += `${updateExpression ? ',' : 'set'} Note = :note`;
      expressionAttributeValues[":note"] = note;
    }

    if (!updateExpression) {
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
      SK: `LOG#${logId}`,
    });

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: key,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: marshall(expressionAttributeValues),
      ReturnValues: "UPDATED_NEW" as ReturnValue,
    };

    const command = new UpdateItemCommand(params);
    await dynamoDb.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Nutrition log updated successfully" }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: "An error occurred while updating the nutrition log.",
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

export const deleteDailyLog: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.queryStringParameters) {
      return { statusCode: 400, body: "Missing required query parameters." };
    }

    const { logId, userId } = event.queryStringParameters;

    if (!logId || !userId) {
      return { statusCode: 400, body: "Missing required query parameters." };
    }

    const key = marshall({
      PK: `USER#${userId}`,
      SK: `LOG#${logId}`,
    });

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: key,
    };

    const command = new DeleteItemCommand(params);
    await dynamoDb.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Nutrition log deleted successfully" }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: "An error occurred while deleting the nutrition log.",
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};
