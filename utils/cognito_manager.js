const amazon_cognito_identity = require('amazon-cognito-identity-js');

const pool_data = {
    UserPoolId : 'us-east-1_5s9MrXUJA',
    ClientId : '79tl47sqdmpfp7hnoc7105r0cb'
};

const create_cognito_attribute = (key, value) => {
    return new amazon_cognito_identity.CognitoUserAttribute({
        Name: key,
        Value: value
    })
};

const create_cognito_attribute_list = (email) => {
    const attributeList = []
    attributeList.push(create_cognito_attribute('email', email))

    return attributeList
}

const get_cognito_user = (email) => {
    const userData = {
        Username: email,
        Pool: get_user_pool()
    }

    return new amazon_cognito_identity.CognitoUser(userData)
}

const get_user_pool = () => {
    return new amazon_cognito_identity.CognitoUserPool(pool_data)
}

const get_auth_details = (email, password) => {
    const authenticationData = {
        Username: email,
        Password: password,
    }

    return new amazon_cognito_identity.AuthenticationDetails(authenticationData)
}

const login = (email, password, success, error) => {
    get_cognito_user(email).authenticateUser(get_auth_details(email, password), {
        onSuccess: (result) => {
            const token = {
                access_token: result.getAccessToken().getJwtToken(),
                id_token: result.getIdToken().getJwtToken(),
                refresh_token: result.getRefreshToken().getToken(),
                is_valid: result.isValid()
            }

            success(token)
        },

        onFailure: (err) => {
            error(err)
        },
    });
}

const register = (email, password, success, error) => {
    const attribute_list = create_cognito_attribute_list(email)
    get_user_pool().signUp(email, password, attribute_list, null, (err, result) => {
        if (err) {
            error(err)
        } else {
            const data = {
                username: result.user.username,
                user_confirmed: result.userConfirmed,
                user_agent: result.user.client.userAgent,
            }
            success(data)
        }
    });
}

const verify = (email, code, success, error) => {
    get_cognito_user(email).confirmRegistration(code, true, (err, result) => {
        if (err) {
            error(err)
        } else {
            success(result)
        }
    })
}

module.exports = {
    login,
    register,
    verify
}

/*register('sebastianruedaolarte@gmail.com', 'Test123456!', 'name', 'lastname', 'address',
         (data) => {
            console.log(data)
        }, (err) => {
            console.log(err)
        }
)*/

/*verify('sebastianruedaolarte@gmail.com', '480778', (data) => {
    console.log(data)
}, (err) => {
    console.log(err)
})*/

/*login('sebastianruedaolarte@gmail.com', 'Test123456!', (data) => {
        console.log(data)
    },(err) => {
        console.log(err)
    }
)*/
