import { useContext } from 'react';
import AuthContext from 'contexts/AWSCognitoContext'; // This should point to the Cognito context

// ==============================|| HOOKS - AUTH ||============================== //

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AWSCognitoProvider');
  }

  return context;
}
