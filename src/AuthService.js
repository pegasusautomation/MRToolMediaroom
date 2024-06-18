// AuthService.js
const mockCredentialsList = [
    { email: 'a@gmail.com', password: 'a123' },
    { email: 'u@gmail.com', password: 'u123' },
    // { email: 'u@gmail.com', password: 'u123' },
    // Add more sets of mock credentials as needed
  ];
  
  const AuthService = {
    login: async (email, password) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const matchedCredentials = mockCredentialsList.find(
            (credentials) => credentials.email === email && credentials.password === password
          );
  
          if (matchedCredentials) {
            // Successful login
            const authToken = 'your_generated_token';
            localStorage.setItem('authToken', authToken);
            resolve(authToken);
          } else {
            // Failed login
            reject(new Error('Invalid email or password'));
          }
        }, 1000); // Simulating a delay for the sake of example
      });
    },
  
    logout: () => {
      // In a real scenario, you might want to perform cleanup and revoke the token.
      // For simplicity, we'll just remove the token from localStorage.
      localStorage.removeItem('authToken');
    },
  };
  
  export default AuthService;
  