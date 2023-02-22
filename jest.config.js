module.exports = async () => {
    return {
      verbose: true,
      testEnvironment: "jsdom",
      collectCoverageFrom: [
        "src/tests/*.{js,jsx,ts,tsx}",
        "!**/node_modules/**",
        "!**/vendor/**"
      ],
      moduleNameMapper: {
        "\\.(css|scss)$": "<rootDir>/src/tests/fileMock.js",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4)$":
          "<rootDir>/src/tests/fileMock.js"
   },

   reporters: [
    "default",
    ["./node_modules/jest-html-reporter", {
      "pageTitle": "Test Report"
    }]
  ]

    };
  };