// To importing necessary dependencies and components from React and other fliuent ui,
import { SyntheticEvent, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TodoStyle from "../styleSheets/Todo.style";
import TodoString from "../displayTexts/String.json";
import { useNavigate } from 'react-router-dom';
import { DefaultButton, MessageBar, MessageBarType, TextField } from '@fluentui/react';

// Functional component representing for the login screen
const LoginScreenNew = () => {
  // For intialize state variables to store email, password, and error message
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // State to manage the display of success or error messages,
  const [showMessage, setShowMessage] = useState<{ type: MessageBarType; message: string }>({
    type: MessageBarType.success,
    message: '',
  });

  // Create hook to navigate to different pages in the app
  const navigate = useNavigate();

  // useEffect to clear the success message after a certain time,
  useEffect(() => {
    if (showMessage.message) {
      setTimeout(() => {
        setShowMessage({ type: MessageBarType.success, message: '' });
      }, 1500);
    }
  }, [showMessage.message]);

  // Created event handler for the form submission
  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault(); // To prevent the default form submission behavior

    try {
      // To interact with the backend using a GET request to get JWT token
      const response = await fetch(`https://localhost:44332/api/users?email=${email}&pw=${password}`, {
        method: 'GET',
      });

      if (response.ok) {
        // If the response is successful, extract the token from the JSON data
        const data = await response.json();
        const token = data.token;

        //console.log(email);

        // To pass the token and email to the home page using React Router's navigate function
        navigate('/home', { state: { token, email } });
      } else {
        // To handle invalid credentials or other errors
        //console.log(email);
        //console.log(password);
        if (!email.trim() && !password.trim()) {
          // To show error message for login without email and password,
          setShowMessage({ type: MessageBarType.error, message: TodoString.messageBodyForLoginError1 });
        }
        else if (!email.trim()) {
          // To show error message for login without email,
          setShowMessage({ type: MessageBarType.error, message: TodoString.messageBodyForLoginError2 });
        }
        else if (!password.trim()) {
          // To show error message for login without password,
          setShowMessage({ type: MessageBarType.error, message: TodoString.messageBodyForLoginError3 });
        }
        else {
          // To show error message for login with wrong email or password,
          setShowMessage({ type: MessageBarType.error, message: TodoString.messageBodyForLoginError4 });
        }
      }
    } catch (error) {
      // To handle errors during the fetch or JSON parsing or sever error
      setShowMessage({ type: MessageBarType.error, message: TodoString.messageBodyForLoginErrorSever });
    }
  }

  // Fot the return the structure for the login screen component
  return (
    <div className={TodoStyle.appContainerForLogin}>
      <Header />
      <body className={TodoStyle.bodyStyleForLogin}>
        <div className={TodoStyle.inputsFormStyle}>
          <h3 className={TodoStyle.textRed}>{TodoString.headerLogin}</h3>
          <form onSubmit={submitHandler}>
            <TextField label="Email :"
              className={TodoStyle.emailStyle}
              placeholder={TodoString.textEmailBox}
              value={email}
              onChange={(e, newValue) => {
                if (typeof newValue === 'string') {
                  setEmail(newValue);
                }
              }}
            />
            <TextField
              label="Password :"
              type="password"
              canRevealPassword
              revealPasswordAriaLabel="Show password"
              className={TodoStyle.passwordStyle}
              placeholder={TodoString.textPasswordBox}
              onChange={(e, newValue) => {
                if (typeof newValue === 'string') {
                  setPassword(newValue);
                }
              }}
            />
            <div className={TodoStyle.submitAreaStyle}>
              <DefaultButton text={TodoString.submitLogin} type="submit" className={TodoStyle.submitButtonStyle} />
            </div>
          </form>
          {showMessage.message && (
            <MessageBar messageBarType={showMessage.type} className={TodoStyle.errorMessageLogin}>{showMessage.message}</MessageBar>
          )}
          {errorMessage && <p className={TodoStyle.errorMessage}>{errorMessage}</p>}
        </div>
      </body>
      <Footer />
    </div>
  );
}

export default LoginScreenNew;