import { useRef, useState } from "react";
import { supabase } from "../utils/api";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Auth = () => {
  const [helperText, setHelperText] = useState({ error: null, text: null });
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (type) => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const { user, error } =
      type === "LOGIN"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (error) {
      setHelperText({ error: true, text: error.message });
    } else if (!user && !error) {
      setHelperText({
        error: false,
        text: "An email has been sent to you for verification!",
      });
    }
  };

  const handleOAuthLogin = async (provider) => {
    // You need to enable the third party auth you want in Authentication > Settings
    // Read more on: https://supabase.com/docs/guides/auth#third-party-logins
    let { error } = await supabase.auth.signInWithOAuth({ provider: provider });
    if (error) console.log("Error: ", error.message);
  };

  const forgotPassword = async (e) => {
    // Read more on https://supabase.com/docs/reference/javascript/reset-password-email#notes
    e.preventDefault();
    const email = prompt("Please enter your email:");

    if (email === null || email === "") {
      setHelperText({ error: true, text: "You must enter your email." });
    } else {
      let { error } = await supabase.auth.api.resetPasswordForEmail(email);
      if (error) {
        console.error("Error: ", error.message);
      } else {
        setHelperText({
          error: false,
          text: "Password recovery email has been sent.",
        });
      }
    }
  };

  return (
    <>
      <Header />
      <div
        className={
          "bg-white d-lg-flex justify-content-between align-items-center"
        }
      >
        <div className="col-lg-6 p-5">
          <img
            src="./auth-img-2.png"
            alt="EngageTrk"
            className="img-fluid d-block mx-auto"
            width="450px"
            height="450px"
          />
        </div>
        <div className="col-lg-6 p-5">
          <h1 className="fw-bold">Welcome Back!</h1>
          <p className="h6 fw-bold text-muted mb-5">Login to continue</p>
          <div className="input-group border border-primary border-2 p-2 mb-4">
            <span className="input-group-text bg-transparent border-0 text-primary">
              <FontAwesomeIcon icon={solid("user")} />
            </span>
            <input
              className={"py-1 px-3 form-control shadow-none border-0"}
              type={"email"}
              name={"email"}
              ref={emailRef}
              placeholder="username@email.com"
              required
            />
          </div>
          <div className="input-group border border-primary border-2 p-2 mb-4">
            <span className="input-group-text bg-transparent border-0 text-primary">
              <FontAwesomeIcon icon={solid("lock")} />
            </span>
            <input
              className={"py-1 px-3 form-control shadow-none border-0"}
              type={"password"}
              name={"password"}
              ref={passwordRef}
              placeholder="Enter Password"
              required
            />
          </div>
          <span className={"mt-2 cursor-pointer"} onClick={forgotPassword}>
            Forgot Password?
          </span>
          {!!helperText.text && (
            <div
              className={`border px-1 py-2 my-2 text-center fs-6 mb-3 ${
                helperText.error
                  ? "bg-danger border-danger text-white"
                  : "bg-success border-success text-white"
              }`}
            >
              {helperText.text}
            </div>
          )}
          <div className="input-group mt-3 flex">
            <button
              onClick={() => handleLogin("LOGIN")}
              type="submit"
              className=" py-2 px-4"
            >
              Log In
            </button>
          </div>
          <button
            type="button"
            onClick={() => handleLogin("REGISTER").catch(console.error)}
            className={"w-full flex justify-center py-2 px-4"}
          >
            Sign Up
          </button>
          <div className="mt-3">
            <div className="relative">
              <div className="flex items-center">
                <div className="" />
              </div>
              <div className="flex justify-center">
                <span className="px-2 bg-white ">Or continue with</span>
              </div>
            </div>

            <div>
              <div className="mt-3">
                <span className="">
                  <button
                    onClick={() => handleOAuthLogin("github")}
                    type="button"
                    className="mx-auto flex justify-center py-2 px-4"
                  >
                    GitHub
                  </button>
                </span>
              </div>
              <div className="mt-3">
                <span className="block rounded-md shadow-sm">
                  <button
                    onClick={() => handleOAuthLogin("google")}
                    type="button"
                    className="w-3/4 mx-auto flex justify-center py-2 px-4"
                  >
                    Google
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
