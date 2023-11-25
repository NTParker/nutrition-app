import jwt, { JwtHeader, JwtPayload } from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const client = jwksClient({
  jwksUri: `https://dev-2rko82p1b0rpb0i8.us.auth0.com/.well-known/jwks.json`, // Replace with your Auth0 domain
});

const getKey = (
  header: JwtHeader,
  callback: (err: Error | null, signingKey?: string) => void
) => {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key!.getPublicKey();
    callback(null, signingKey);
  });
};

const validateToken = async (token: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    if (!token) {
      return reject(new Error("No token provided"));
    }

    console.log(token);
    const decodedToken = jwt.decode(token, { complete: true });
    console.log('token: ', decodedToken);
    if (!decodedToken) {
      return reject(new Error("Invalid token"));
    }
    

    jwt.verify(
      token,
      getKey,
      {
        audience: 'https://nutrition-api', 
        issuer: `https://dev-2rko82p1b0rpb0i8.us.auth0.com/`, 
        algorithms: ["RS256"],
      },
      (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          // Ensure that the decoded token is of type JwtPayload
          if (typeof decoded === "object" && decoded !== null) {
            resolve(decoded as JwtPayload);
          } else {
            reject(new Error("Invalid token payload"));
          }
        }
      }
    );
  });
};

export const makeResponse = (statusCode: number, body: any, error?: string | undefined) => {
  const response = {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  if (error) {
    response.body = JSON.stringify({ error });
  }
  return response;
};

export default validateToken;
