echo off
REM ================================================================
REM  Deploys vehs-client to S3 via AWS CLI
REM  --- Need to execute: "aws configure" to set up deployment keys for the first time ---
REM  Param 1: environment to process
REM  Param 2:
REM ================================================================
REM echo on


REM ---Check script usage
if "%1"=="" (
  goto end_usage_fail
)

if "%1"=="dev" (
  goto check_action
)

if "%1"=="alpha" (
  goto check_action
)

if "%1"=="beta" (
  goto check_action
)

if "%1"=="prod" (
  goto check_action
)

:CHECK_ACTION
if "%2"=="" (
  %2% = "push"
  goto deploy
)

if "%2"=="sync" (
  goto deploy
)

if "%2"=="push" (
  goto deploy
)

exit /B

:DEPLOY

if "%1"=="dev" (
  if "%2"=="sync" (
    aws s3 sync %cd%/src s3://dev.autouplinktech.com/vehs-client --acl public-read --exclude "js/properties/properties.js" --exclude "js/apiGateway-js-sdk/apigClient.js"
    echo dev sync complete
  )

  if "%2"=="push" (
    aws s3 cp %cd%/src s3://dev.autouplinktech.com/vehs-client --acl public-read --recursive --exclude "js/properties/properties.js" --exclude "js/apiGateway-js-sdk/apigClient.js"
    echo dev push complete
  )
  exit /B
)

if "%1"=="alpha" (
    aws s3 sync s3://dev.autouplinktech.com/vehs-client s3://alpha.autouplinktech.com/vehs-client --acl public-read --exclude "js/properties/properties.js" --exclude "js/apiGateway-js-sdk/apigClient.js"
    echo alpha promote complete
  exit /B
)

if "%1"=="beta" (
    aws s3 sync s3://alpha.autouplinktech.com/vehs-client s3://beta.autouplinktech.com/vehs-client --acl public-read --exclude "js/properties/properties.js" --exclude "js/apiGateway-js-sdk/apigClient.js"
    echo beta promote complete
  exit /B
)

if "%1"=="prod" (
    aws s3 sync s3://beta.autouplinktech.com/vehs-client s3://prod.autouplinktech.com/vehs-client --acl public-read --exclude "js/properties/properties.js" --exclude "js/apiGateway-js-sdk/apigClient.js"
    echo prod push complete
  exit /B
)

:END_USAGE_FAIL
echo Usage: deploy.bat [env to process] ["sync" or "push"].
echo Valid env values: "dev", "alpha", "beta", "prod"
exit /B
