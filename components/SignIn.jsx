"use client";

import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { countries } from "@/data/countries";
import OTPInput from "@/components/OTPInput";
import Link from "next/link";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";

export default function SignIn() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [verifying, setVerifying] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("+91");
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState();
  const router = useRouter();

  async function handleSubmit(e) {
    setErrors(null);
    setLoading(true);
    e.preventDefault();

    if (!isLoaded && !signIn) return null;

    try {
      const { supportedFirstFactors } = await signIn.create({
        identifier: `${countryCode}${phone}`,
      });

      const isPhoneCodeFactor = (factor) => {
        return factor.strategy === "phone_code";
      };
      const phoneCodeFactor = supportedFirstFactors?.find(isPhoneCodeFactor);

      if (phoneCodeFactor) {
        const { phoneNumberId } = phoneCodeFactor;

        await signIn.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId,
        });

        setVerifying(true);
      }
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

    if (!isLoaded && !signIn) return null;

    try {
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: "phone_code",
        code,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/");
      } else {
        if (isClerkAPIResponseError(err)) setErrors(err.errors);
        console.error(signInAttempt);
      }
    } catch (err) {
      console.error("Error:", JSON.stringify(err, null, 2));
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 dark:bg-darkBg">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h4 className="mb-2 text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          Welcome to Task Manager
        </h4>
        <p className="mb-6 text-center text-xs text-gray-600 dark:text-gray-400">
          Welcome back! Please sign in to continue.
        </p>

        {verifying ? (
          <OTPInput
            errors={errors}
            code={code}
            setCode={setCode}
            handleVerification={handleVerification}
            loading={loading}
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
              <div className="flex space-x-2">
                <div>
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="py-2 w-[58px] text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.dial_code}>
                        {country.dial_code} -{country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <input
                    value={phone}
                    id="phone"
                    name="phone"
                    type="tel"
                    maxLength={10}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full flex-1 px-4 py-2 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="10-digit mobile number"
                    required
                  />
                </div>
              </div>
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
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-blue-500 hover:text-blue-600"
            >
              Sign up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
