import {React, useState, useEffect }  from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from './firebase.config';
import { Link } from 'react-router-dom';
import { GridLoader} from 'react-spinners';


// const YourComponent = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');


// }

const Login = () => {


    const [loading, setLoading] = useState(false);
    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }, []);


  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const handleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        // Redirect to the App component after successful authentication
        window.location.href = '/App'; // Navigate to the "/App" route
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
        // Handle errors during login
      });
  };

  return (
    <div className={'mainContainer'}>
        {loading ? (
          <div className="flex justify-center m-60">
            <GridLoader
              color={"rgb(21, 94, 228)"}
              loading={loading}
              size={60}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : ( <div>
      <div className={'titleContainer'}>
        <div> Health<span className="lol">Ginie</span></div>
      </div>
      <br />


      <div className='ipkabox'>
      
      <div className={"inputContainer"}>
        <input
        //   value={email}
          placeholder="Enter your email here"
        //   onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{""}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
        //   value={password}
          placeholder="Enter your password here"
        //   onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
          type="password"
        />
        <label className="errorLabel">{""}</label>
      </div>
      </div>
        <br />


        <div className='btkabox'>
        <div className={'inputContainer'}>

        <Link to="/App">
        <input
          className={'inputButton'}
          type="button"
        //   onClick={handleLogin}
          value={'Log in / Sign up'}
        />
        </Link>
      </div>
      <div className={'inputContainer'}>
        <input
          className={'inputButton1'}
          type="button"
          onClick={handleLogin}
          value={'Log in with Google'} 
       
 
        />
      </div>
      </div>
      </div>
)}
    </div>
  );
};

export default Login;



