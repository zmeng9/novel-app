module.exports = {
  root: true,
  plugins: ["react-hooks"],
  rules: {
    "react-hooks/rules-of-hooks": 'error',
    "react-hooks/exhaustive-deps": 'warn' // <--- THIS IS THE NEW RULE
  },
  extends: '@react-native-community'
};
