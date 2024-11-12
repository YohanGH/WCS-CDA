// components/ErrorTest.tsx
const ErrorTest = () => {
    throw new Error("Intentional error for testing purposes.");
    return <div>Should not reach here.</div>;
  };
  
  export default ErrorTest;
  