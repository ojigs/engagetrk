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
    window.history.replaceState({}, null, "/");
  };

  const handleOAuthLogin = async (provider) => {
    // You need to enable the third party auth you want in Authentication > Settings
    // Read more on: https://supabase.com/docs/guides/auth#third-party-logins
    let { error } = await supabase.auth.signInWithOAuth({ provider: provider });
    if (error) console.log("Error: ", error.message);
  };

  const forgotPassword = async (e) => {
    e.preventDefault();
    const email = emailRef.current?.value;

    if (email === null || email === "") {
      setHelperText({ error: true, text: "You must enter your email." });
    } else {
      let { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        console.error("Error: ", error.message);
        setHelperText({
          error: true,
          text: error.message,
        });
      } else {
        setHelperText({
          error: false,
          text: "Password recovery email has been sent.",
        });
      }
    }
    window.history.replaceState({}, null, "/");
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

          <form
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin("LOGIN");
            }}
          >
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
            <div className="input-group mt-3 d-flex align-items-center justify-content-between">
              <button
                type="submit"
                className="btn btn-primary rounded-pill mt-3 py-3 px-5 fw-bold"
              >
                LOGIN
              </button>
              <div className="signup mt-3">
                <span>New User?</span>
                <span
                  role="button"
                  onClick={() => handleLogin("REGISTER").catch(console.error)}
                  className={"text-primary px-2"}
                >
                  Sign Up
                </span>
              </div>
              <span
                role="button"
                className={"cursor-pointer mt-3 fs-6"}
                onClick={forgotPassword}
              >
                Forgot Password?
              </span>
            </div>
          </form>

          <div className="mt-5 d-flex gap-5">
            <span className="">Or continue with</span>

            <div className="">
              <span onClick={() => handleOAuthLogin("google")} role="button">
                <img
                  src="./google.jpg"
                  alt="Google"
                  className="img-fluid"
                  width={"24px"}
                  height={"24px"}
                />
              </span>
            </div>
            <div className="">
              <span className="">
                <span onClick={() => handleOAuthLogin("github")} role="button">
                  <img
                    src="./github.png"
                    alt="Github"
                    width={"24px"}
                    height={"24px"}
                  />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
