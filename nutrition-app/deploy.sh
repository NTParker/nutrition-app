#!/bin/bash

rm -rf dist/ nodemodules/
npm ci

export VITE_APP_API_URL=https://3yxyu5z5hl.execute-api.us-east-1.amazonaws.com
export VITE_APP_TYPE=dev
export VITE_DEPLOYMENT_BUCKET=s3://nutrition-app-ui-dev
export AWS_PROFILE=dev-local
export CLOUDFRONT_DISTRIBUTION_ID=E1VDJF2L0JN9QC

echo "Building for dev"
npm run build

aws s3 sync dist/ $VITE_DEPLOYMENT_BUCKET --delete

aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
