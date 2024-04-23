import React from 'react';
import Signup from './Signup';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import connectologo from './assets/connecto-logo-color-removebg-preview.png';

const clientId =
  '598048758838-enhddjp4p7aecbg815on7utseok98276.apps.googleusercontent.com';

function Login() {
  const navigate = useNavigate();

  const onSuccess = (res) => {
    console.log('login success', res.profileObj);
  };
  const onFailure = (res) => {
    console.log('login is unsuccessful', res);
  };

  useEffect(() => {
    async function start() {
      try {
        await gapi.load('client:auth2', async () => {
          await gapi.client.init({
            clientId: clientId,
            scope: 'email profile',
          });
        });
      } catch (error) {
        console.error('Error loading or initializing Google API client', error);
      }
    }
    start();
  }, []);

  return (
    <div className="bg-[#ffffff] h-screen ">
      <form className=" flex justify-around items-center">
        <div className="relative py-3 w-1/3">
          <div className="relative px-4 py-10 mx-8 md:mx-0 shadow rounded-3xl sm:p-10 border ">
            <div className='flex items-center justify-center'>
              <h1 className="font-bold text-sky-500 text-4xl">Connecto</h1>
            </div>
            <br />
            <h2 className="text-2xl font-bold text-sky-500 ">Login</h2>
            <div className="max-w-md mx-auto text-white">
              <div className="flex items-center space-x-5 justify-center"></div>
              <div className="mt-5">
                <label
                  className="font-semibold text-sm text-gray-400 pb-1 block"
                  htmlFor="login"
                >
                  E-mail
                </label>
                <input
                  className="border border-black bg-gray-100 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full  text-black"
                  type="text"
                  id="login"
                />
                <label
                  className="font-semibold text-sm text-gray-400 pb-1 block"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="border border-black bg-gray-100 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-black"
                  type="password"
                  id="password"
                />
              </div>
              <div className="text-right mb-4">
                <a
                  className="text-xs font-display font-semibold text-gray-500 hover:text-gray-400 cursor-pointer"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="flex justify-center items-center">
                <div id="loginButton">
                  <GoogleLogin
                    clientId={clientId}
                    buttonText="Login with google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single-host-origin'}
                    isSignedIn={true}
                  ></GoogleLogin>
                </div>
              </div>
              <div className="mt-5">
                <button
                  className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  type="submit"
                  onClick={()=>{
                    navigate(`/Mainpg`)
                  }}
                >
                  Log in
                </button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                <p
                  className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                  onClick={() => {
                    navigate(`/Signup`);
                  }}
                >
                  or sign up
                </p>
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="border border-black"></div>
    </div>
  );
}
export default Login;
