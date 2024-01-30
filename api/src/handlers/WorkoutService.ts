import { APIGatewayProxyHandler } from "aws-lambda";
import dynamoDb from "../db/dynamoClient.js";
import {
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
  ReturnValue,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuidv4 } from "uuid";
import validateToken, { makeResponse } from "../utils/index.js";

export const createWorkout: APIGatewayProxyHandler = async (event) => {
  try {
    const { userId } = JSON.parse(event!.body!);
    const bearerToken = event.headers.Authorization;

    if (!bearerToken) {
      return { statusCode: 401, body: "Unauthorized" };
    }
    // console.log(bearerToken);

    const token = bearerToken.split("Bearer ")[1];
    // console.log(token);

    const decodedToken = await validateToken(token);

    const workoutId = uuidv4();

    const item = marshall({
      PK: `USER#${userId}`,
      SK: `WORKOUT#${workoutId}`,
      Type: "Workout",
      workoutId,
      name: "",
      time: "",
      exercises: [],
      notes: "",
      createdAt: new Date().toISOString(),
    });

    const newWorkout = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: item,
    };

    console.log(newWorkout);

    const command = new PutItemCommand(newWorkout);

    await dynamoDb.send(command);

    return makeResponse(200, newWorkout.Item);
  } catch (error) {
    console.error(error);
    return makeResponse(
      500,
      {},
      "An error occurred while creating the workout."
    );
  }
};

export const getWorkouts: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.pathParameters) {
      return { statusCode: 400, body: "Missing required user id." };
    }

    const { userId } = event.pathParameters;

    if (!userId) {
      return { statusCode: 400, body: "Missing required user id." };
    }

    const bearerToken = event.headers.Authorization;

    if (!bearerToken) {
      return { statusCode: 401, body: "Unauthorized" };
    }

    const token = bearerToken.split("Bearer ")[1];

    const decodedToken = await validateToken(token);

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      KeyConditionExpression: "PK = :pk and begins_with(SK, :sk)",
      ExpressionAttributeValues: marshall({
        ":pk": `USER#${userId}`,
        ":sk": "WORKOUT#",
      }),
    };

    const command = new QueryCommand(params);
    const data = await dynamoDb.send(command);

    const workouts = data.Items
      ? data.Items.map((item) => unmarshall(item))
      : [];

    return makeResponse(200, workouts);
  } catch (error) {
    console.error(error);
    return makeResponse(
      500,
      {},
      "An error occurred while retrieving the workout."
    );
  }
};

export const getWorkoutById: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.pathParameters) {
      return { statusCode: 400, body: "Missing required path parameters." };
    }
    const { userId, workoutId } = event.pathParameters;
    if (!userId || !workoutId) {
      return makeResponse(400, {}, "User ID and Workout ID are required.");
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
        PK: `USER#${userId}`,
        SK: `WORKOUT#${workoutId}`,
      }),
    };

    const command = new GetItemCommand(params);
    const result = await dynamoDb.send(command);

    if (!result.Item) {
      return makeResponse(404, {}, "Workout not found.");
    }

    const workout = unmarshall(result.Item);

    return makeResponse(200, workout);
  } catch (error) {
    console.error(error);
    return makeResponse(500, {}, "An error occurred while retrieving the workout.");
  }
};

export const updateWorkout: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.queryStringParameters) {
      return { statusCode: 400, body: "Missing required path parameters." };
    }
    const { userId, workoutId } = event.queryStringParameters;
    if (!userId || !workoutId) {
      return makeResponse(400, {}, "User ID and Workout ID are required.");
    }

    const bearerToken = event.headers.Authorization;

    if (!bearerToken) {
      return { statusCode: 401, body: "Unauthorized" };
    }

    const token = bearerToken.split("Bearer ")[1];

    const decodedToken = await validateToken(token);
    const { name, time, exercises, notes } = JSON.parse(event.body!);

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: marshall({
        PK: `USER#${userId}`,
        SK: `WORKOUT#${workoutId}`,
      }),
      UpdateExpression: 'set #name = :n, #time = :t, #exercises = :e, #notes = :no',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#time': 'time',
        '#exercises': 'exercises',
        '#notes': 'notes',
      },
      ExpressionAttributeValues: marshall({
        ':n': name,
        ':t': time,
        ':e': exercises,
        ':no': notes,
      }),
      ReturnValues: "UPDATED_NEW" as ReturnValue,
    };

    const command = new UpdateItemCommand(params);
    await dynamoDb.send(command);

    return makeResponse(200, { message: "Workout updated successfully" });
  } catch (error) {
    console.error(error);
    return makeResponse(500, {}, "An error occurred while updating the workout.");
  }
};

export const deleteWorkout: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.queryStringParameters) {
      return { statusCode: 400, body: "Missing required path parameters." };
    }
    const { userId, workoutId } = event.queryStringParameters;
    if (!userId || !workoutId) {
      return makeResponse(400, {}, "User ID and Workout ID are required.");
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
        PK: `USER#${userId}`,
        SK: `WORKOUT#${workoutId}`,
      }),
    };

    const command = new DeleteItemCommand(params);
    await dynamoDb.send(command);

    return makeResponse(200, { message: "Workout deleted successfully" });
  } catch (error) {
    console.error(error);
    return makeResponse(500, {}, "An error occurred while deleting the workout.");
  }
};
