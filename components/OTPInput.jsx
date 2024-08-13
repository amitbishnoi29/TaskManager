import React from "react";

export default function OTPInput({
  code,
  setCode,
  handleVerification,
  loading,
  errors,
}) {
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d$/.test(value) && value !== "") return;

    const newCode = [...code];
    newCode[index] = value;

    setCode(newCode.join(""));

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !code[index]) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  return (
    <form onSubmit={handleVerification} className="space-y-4">
      <div>
        <label
          htmlFor="otp"
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Enter your verification code
        </label>
        <div className="flex justify-center space-x-2">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={code[index] || ""}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-10 text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          ))}
        </div>
      </div>
      <button
        type="submit"
        className={`w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify"}
      </button>
    </form>
  );
}
