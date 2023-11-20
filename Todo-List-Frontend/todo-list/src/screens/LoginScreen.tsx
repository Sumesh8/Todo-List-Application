// To importing necessary dependencies and components from React and other fliuent ui,
import { SyntheticEvent, useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TodoStyle from "../styleSheets/Todo.style";
import TodoString from "../displayTexts/String.json";
import { useNavigate } from 'react-router-dom';

// Functional component representing for the login screen
const LoginScreen = () => {
  // For intialize state variables to store email, password, and error message
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Create hook to navigate to different pages in the app
  const navigate = useNavigate();

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
        navigate('/home', { state: { token , email} });
      } else {
        // To handle invalid credentials or other errors
        //console.log(email);
        //console.log(password);
        if (!email.trim() && !password.trim()) {
          setErrorMessage('Please Enter Email and Password!!!');
        }
        else if (!email.trim()) {
          setErrorMessage('Please Enter the Email!!!');
        }
        else if (!password.trim()) {
          setErrorMessage('Please Enter the password!!!');
        }
        else{
          setErrorMessage('Invalid Email or Password!!!');
        }
      }
    } catch (error) {
      // To handle errors during the fetch or JSON parsing or sever error
      setErrorMessage('An error occurred during login. Please try again later!!!');
    }
  }

  // This is JSX structure for the login screen component
  return (
      <div className={TodoStyle.appContainerForLogin}>
        <Header />
        <body className={TodoStyle.bodyStyleForLogin}>
          <div className={TodoStyle.inputsFormStyle}>
            <h3 className={TodoStyle.textRed}>{TodoString.headerLogin}</h3>
            <form onSubmit={submitHandler}>
              <input
                className={TodoStyle.emailStyle}
                placeholder={TodoString.textEmailBox}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                className={TodoStyle.passwordStyle}
                placeholder={TodoString.textPasswordBox}
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <div className={TodoStyle.submitAreaStyle}>
                <button type="submit" className={TodoStyle.submitButtonStyle}>
                  {TodoString.submitLogin}
                </button>
              </div>
            </form>
            {errorMessage && <p className={TodoStyle.errorMessage}>{errorMessage}</p>}
          </div>
        </body>
        <Footer />
      </div>
  );
}

export default LoginScreen;
