/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": "ap-northeast-2",
    "aws_cognito_identity_pool_id": "ap-northeast-2:dff8465a-da4b-4808-9741-253ff1668303",
    "aws_cognito_region": "ap-northeast-2",
    "aws_user_pools_id": "ap-northeast-2_Dp8Jagnaa",
    "aws_user_pools_web_client_id": "5ct0804c6fodinigao4ibnicmf",
    "oauth": {
        "domain": "testmachlake.auth.ap-northeast-2.amazoncognito.com",
        "scope": [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "https://test.machlake.com/login",
        "redirectSignOut": "https://test.machlake.com/login",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS",
    "aws_cognito_login_mechanisms": [
        "PREFERRED_USERNAME"
    ],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ]
};


export default awsmobile;
