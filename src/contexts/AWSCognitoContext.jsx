import { createContext, useEffect, useReducer, useState } from 'react';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { DynamoDBClient, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';

import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';
import authReducer from 'contexts/auth-reducer/auth';
import Loader from 'components/Loader';

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

// Cognito User Pool initialization
export const userPool = new CognitoUserPool({
  UserPoolId: import.meta.env.VITE_APP_AWS_POOL_ID || '',
  ClientId: import.meta.env.VITE_APP_AWS_APP_CLIENT_ID || '',
});

// AWS SDK v3 Client configuration for DynamoDB
const dynamoDbClient = new DynamoDBClient({
  region: 'us-west-2',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

// Function to fetch user data from DynamoDB
const getUserFromDynamoDB = async (email) => {
  const params = {
    TableName: 'Register_Data',
    Key: {
      email: { S: email },
    },
  };

  try {
    const command = new GetItemCommand(params);
    const data = await dynamoDbClient.send(command);
    if (data.Item) {
      return {
        firstName: data.Item.firstName?.S || 'User',
        lastName: data.Item.lastName?.S || '',
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching user from DynamoDB:', error);
    throw error;
  }
};

// Function to update user data in DynamoDB
const updateUserInDynamoDB = async (email, profileData) => {
  const params = {
    TableName: 'Register_Data',
    Item: {
      email: { S: email },
      firstName: { S: profileData.firstName },
      lastName: { S: profileData.lastName },
      Gender: { S: profileData.gender || 'Not Specified' },
    },
  };

  try {
    const command = new PutItemCommand(params);
    await dynamoDbClient.send(command);
    console.log('Profile updated in DynamoDB');
  } catch (error) {
    console.error('Error updating user in DynamoDB:', error);
    throw error;
  }
};

// ==============================|| AWS COGNITO - CONTEXT & PROVIDER ||============================== //

const AWSCognitoContext = createContext(null);

export const AWSCognitoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [newPasswordRequired, setNewPasswordRequired] = useState(false); // Track if new password is needed
  const [newPasswordCallback, setNewPasswordCallback] = useState(null); // Hold the callback for completing the flow


  useEffect(() => {
    const init = async () => {
      try {
        const storedUser = localStorage.getItem('user');  // Retrieve the stored user
  
        if (storedUser) {
          const user = JSON.parse(storedUser);
  
          const userData = await getUserFromDynamoDB(user.email);
  
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: { ...user, ...userData },
            },
          });
        } else {
          dispatch({ type: LOGOUT });
        }
      } catch (err) {
        console.error(err);
        dispatch({ type: LOGOUT });
      }
    };
  
    init();
  }, []);

  // Register Function for AWS Cognito
  const register = async (email, password, firstname, lastname) => {
    return new Promise((resolve, reject) => {
      const attributeList = [
        new CognitoUserAttribute({ Name: 'email', Value: email }),
        new CognitoUserAttribute({ Name: 'name', Value: `${firstname} ${lastname}` }),
      ];

      userPool.signUp(email, password, attributeList, null, async (err, result) => {
        if (err) {
          console.error('Error during sign up:', err);
          reject(err);
          return;
        }
        console.log('Sign up success:', result);

        // Store user in DynamoDB
        const profileData = {
          firstName: firstname,
          lastName: lastname,
          gender: null,
        };

        try {
          await updateUserInDynamoDB(email, profileData);
          resolve(result);
        } catch (dynamoError) {
          console.error('Error updating DynamoDB after registration:', dynamoError);
          reject(dynamoError);
        }
      });
    });
  };

  // Code verification function for AWS Cognito
  const codeVerification = async (email, code) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      user.confirmRegistration(code, true, (err, result) => {
        if (err) {
          console.error('Error during code verification:', err);
          reject(err);
        } else {
          console.log('Code verification successful:', result);
          resolve(result);
        }
      });
    });
  };

  // Resend confirmation code for AWS Cognito
  const resendConfirmationCode = async (email) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      user.resendConfirmationCode((err, result) => {
        if (err) {
          console.error('Error resending confirmation code:', err);
          reject(err);
        } else {
          console.log('Resend confirmation code successful:', result);
          resolve(result);
        }
      });
    });
  };

  // Login function that uses Cognito Username instead of UUID
  const login = async (email, password) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });
  
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
  
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: async (session) => {
          try {
            const userData = await getUserFromDynamoDB(email);
  
            const user = {
              email: authDetails.getUsername(),
              name: userData ? userData.firstName : 'User',
            };
  
            localStorage.setItem('user', JSON.stringify(user));
  
            dispatch({
              type: LOGIN,
              payload: {
                isLoggedIn: true,
                user: { ...user, ...userData },
              },
            });
  
            resolve(session);
          } catch (error) {
            console.error('Error fetching user details:', error);
            reject(error);
          }
        },
        onFailure: (err) => {
          reject(err);
        },
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          console.log('New password required for user:', userAttributes);
          setNewPasswordRequired(true); // Notify the UI to render the new password form
          setNewPasswordCallback(() => async (newPassword) => {
            return new Promise((resolveNewPassword, rejectNewPassword) => {
              cognitoUser.completeNewPasswordChallenge(
                newPassword,
                {}, // Any additional attributes, if required
                {
                  onSuccess: (session) => {
                    console.log('New password set successfully', session);
                    setNewPasswordRequired(false); // Reset the state
                    setNewPasswordCallback(null); // Reset the callback
                    resolveNewPassword(session);
                  },
                  onFailure: (error) => {
                    console.error('Error completing new password challenge:', error);
                    rejectNewPassword(error);
                  },
                }
              );
            });
          });
        },
        
      });
    });
  };
  

  const logout = () => {
    const loggedInUser = userPool.getCurrentUser();
    if (loggedInUser) {
      loggedInUser.signOut();
      localStorage.removeItem('user');
      dispatch({ type: LOGOUT });
    }
  };

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }
  
  return (
    <AWSCognitoContext.Provider
      value={{
        ...state,
        login,
        register,
        codeVerification,
        resendConfirmationCode,
        logout,
        newPasswordRequired, // Add to let the UI know if a new password is required
        newPasswordCallback, // Add to handle the "complete new password" action
      }}
    >
      {children}
    </AWSCognitoContext.Provider>
  );
};

export default AWSCognitoContext;
