import { useRef, useState } from "react";
import { supabase } from "../utils/api";

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
    <div className={"p-5 bg-white shadow flex col"}>
      <span className={"text-center pb-2 mb-1 border-b mx-4 align-center"}>
        Login
      </span>
      <label className={"mt-3 mb-2 text-lg"} htmlFor={"email"}>
        <span className={"mr-1"}>*</span>Email:
      </label>
      <input
        className={"border py-1 px-3"}
        type={"email"}
        name={"email"}
        ref={emailRef}
        required
      />
      <label className={"mt-3 mb-2 text-lg"} htmlFor={"password"}>
        <span className={"mr-1 text-red-400"}>*</span>
        Password:
      </label>
      <input
        className={"border py-1 px-3"}
        type={"password"}
        name={"password"}
        ref={passwordRef}
        required
      />
      <span className={"mt-2 text-sm"} onClick={forgotPassword}>
        Forgot Password?
      </span>
      {!!helperText.text && (
        <div
          className={`border px-1 py-2 my-2 text-center text-sm ${
            helperText.error
              ? "bg-red-100 border-red-300 text-red-400"
              : "bg-green-100 border-green-300 text-green-500"
          }`}
        >
          {helperText.text}
        </div>
      )}
      <div className="mt-2 flex">
        <span className="mx-1.5 shadow-sm">
          <button
            type="submit"
            onClick={() => handleLogin("REGISTER").catch(console.error)}
            className={"w-full flex justify-center py-2 px-4"}
          >
            Sign Up
          </button>
        </span>
        <span className="">
          <button
            onClick={() => handleLogin("LOGIN")}
            type="button"
            className="flex w-full justify-center py-2 px-4"
          >
            Sign In
          </button>
        </span>
      </div>
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
  );
};

export default Auth;
