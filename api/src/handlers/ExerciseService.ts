import {
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
  ReturnValue,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyHandler } from "aws-lambda";
import dynamoDb from "../db/dynamoClient.js";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuidv4 } from 'uuid';
import validateToken, { makeResponse } from "../utils/index.js";


export const createExercise: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.pathParameters) {
      return { statusCode: 400, body: "Missing required path parameters." };
    }
    const { workoutId } = event.pathParameters;
    if (!workoutId) {
      return makeResponse(400, {}, "User ID is required.");
    }

    const bearerToken = event.headers.Authorization;

    if (!bearerToken) {
      return { statusCode: 401, body: "Unauthorized" };
    }

    const token = bearerToken.split("Bearer ")[1];

    const decodedToken = await validateToken(token);

    const exerciseId = uuidv4();

    const item = marshall({
      PK: `WORKOUT#${workoutId}`,
      SK: `EXERCISE#${exerciseId}`,
      Type: "Exercise",
      exerciseId,
      name: "",
      time: "",
      sets: 0,
      reps: 0,
      notes: "",
    });

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: item,
    };

    const command = new PutItemCommand(params);

    await dynamoDb.send(command);

    return makeResponse(200, item);
  } catch (error) {
    console.error(error);
    return makeResponse(500, {}, "An error occurred while creating the exercise.");
  }
};

export const getExercises: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.pathParameters) {
      return { statusCode: 400, body: "Missing required path parameters." };
    }
    const { workoutId } = event.pathParameters;
    if (!workoutId) {
      return makeResponse(400, {}, "User ID is required.");
    }

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      KeyConditionExpression: "PK = :pkand begins_with(SK, :sk)",
      ExpressionAttributeValues: marshall({
        ":pk": `WORKOUT#${workoutId}`,
        ":sk": "EXERCISE#",
      }),
    };

    const command = new QueryCommand(params);

    const data = await dynamoDb.send(command);

    const exercises = data.Items
      ? data.Items.map((item) => unmarshall(item))
      : [];

    return makeResponse(200, exercises);
  } catch (error) {
    console.error(error);
    return makeResponse(500, {}, "An error occurred while getting the workout.");
  }
}

export const getExercise: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.pathParameters) {
      return { statusCode: 400, body: "Missing required path parameters." };
    }
    const { exerciseId } = event.pathParameters;
    if (!exerciseId) {
      return makeResponse(400, {}, "Exercise ID is required.");
    }
    if (!event.queryStringParameters) {
      return { statusCode: 400, body: "Missing required path parameters." };
    }
    const { workoutId } = event.queryStringParameters;
    if (!workoutId) {
      return makeResponse(400, {}, "workout ID is required.");
    }

    const key = marshall({
      PK: `WORKOUT#${workoutId}`,
      SK: `EXERCISE#${exerciseId}`,
      Type: "Exercise",
    })

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: key,
    };

    const command = new GetItemCommand(params);

    const data = await dynamoDb.send(command);

    if (!data.Item) {
      return { statusCode: 404, body: "exercise not found." };
    }

    const exercise = unmarshall(data.Item);

    return makeResponse(200, exercise);
  } catch (error) {
    console.error(error);
    return makeResponse(500, {}, "An error occurred while getting the exercise.");
  }
};

export const updateExercise: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.pathParameters) {
      return { statusCode: 400, body: "Missing required path parameters." };
    }
    const { workoutId, exerciseId } = event.pathParameters;
    if (!workoutId || !exerciseId) {
      return makeResponse(400, {}, "Workout ID and Exercise ID are required.");
    }

    const bearerToken = event.headers.Authorization;

    if (!bearerToken) {
      return { statusCode: 401, body: "Unauthorized" };
    }

    const token = bearerToken.split("Bearer ")[1];

    const decodedToken = await validateToken(token);

    if (!event.body) {
      return makeResponse(400, {}, "Missing required body parameters.");
    }

    const { name, time, sets, reps, notes } = JSON.parse(event.body);

    const item = marshall({
      PK: `WORKOUT#${workoutId}`,
      SK: `EXERCISE#${exerciseId}`,
      Type: "Exercise",
      exerciseId,
      name: name,
      time: time,
      sets: sets,
      reps: reps,
      notes: notes,
    });

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: item,
    };

    const command = new PutItemCommand(params);

    await dynamoDb.send(command);

    return makeResponse(200, item);
  } catch (error) {
    console.error(error);
    return makeResponse(500, {}, "An error occurred while updating the exercise.");
  }
};

export const deleteExercise: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.pathParameters) {
      return { statusCode: 400, body: "Missing required path parameters." };
    }
    const { workoutId, exerciseId } = event.pathParameters;
    if (!workoutId || !exerciseId) {
      return makeResponse(400, {}, "Workout ID and Exercise ID are required.");
    }

    const bearerToken = event.headers.Authorization;

    if (!bearerToken) {
      return { statusCode: 401, body: "Unauthorized" };
    }

    const token = bearerToken.split("Bearer ")[1];

    const decodedToken = await validateToken(token);

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: marshall({
        PK: `WORKOUT#${workoutId}`,
        SK: `EXERCISE#${exerciseId}`,
      }),
    };

    const command = new DeleteItemCommand(params);

    await dynamoDb.send(command);

    return makeResponse(200, {});
  } catch (error) {
    console.error(error);
    return makeResponse(500, {}, "An error occurred while deleting the exercise.");
  }
};
