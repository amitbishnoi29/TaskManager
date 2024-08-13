"use client";

import * as React from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import OTPInput from "@/components/OTPInput"; // Import the OTPInput component
import Link from "next/link";

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState();
  const router = useRouter();

  async function handleSubmit(e) {
    setErrors(null);
    setLoading(true);
    e.preventDefault();
    if (!isLoaded && !signUp) return null;

    try {
      await signUp.create({
        phoneNumber: phone,
      });

      await signUp.preparePhoneNumberVerification();

      setVerifying(true);
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error("Error:", JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  }

  async function handleVerification(e) {
    setErrors(null);
    setLoading(true);
    e.preventDefault();

    if (!isLoaded && !signUp) return null;

    try {
      const signInAttempt = await signUp.attemptPhoneNumberVerification({
        code,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });

        router.push("/");
      } else {
        console.error(signInAttempt);
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error("Error:", JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h4 className="mb-2 text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          Create Your Account
        </h4>
        <p className="mb-6 text-center text-xs text-gray-600 dark:text-gray-400">
          Please sign up to continue.
        </p>

        {verifying ? (
          <OTPInput
            code={code}
            setCode={setCode}
            handleVerification={handleVerification}
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Enter phone number
              </label>
              <input
                value={phone}
                id="phone"
                name="phone"
                type="tel"
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Continue"}
            </button>
          </form>
        )}

        {errors && (
          <ul className="text-center text-red-400 text-xs mt-4">
            {errors.map((el, index) => (
              <li key={index}>{el.longMessage}</li>
            ))}
          </ul>
        )}

        {!verifying && (
          <>
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-sm text-center text-blue-500 hover:text-blue-600"
              >
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
