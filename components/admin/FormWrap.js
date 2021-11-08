import React, { useState } from 'react';
import { useRouter } from 'next/router';
function FormWrap({ children, validators, onSubmit }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const back = () => router.back();
  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrors([]);
    let errorCount = 0;
    const data = new FormData(event.target);
    if (validators) {
      validators?.required?.map((field) => {
        const value = data.get(field);

        if (!value)
          setErrors((old) => {
            return old.concat(field);
          });
        errorCount++;
      });
    }
    //if (errorCount) return false;
    console.log('submit');
    await onSubmit(data);
    setLoading(false);
  };
  const childrenWithProps = (children) =>
    children.map((child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { errors });
      }
      return child;
    });
  return (
    <form action="#" method="POST" onSubmit={submit}>
      {childrenWithProps(children)}
      <div className="py-6 bg-gray-50 text-right flex items-center justify-end">
        <button type="button" onClick={back} className="manager-btn">
          Back
        </button>
        <button disabled={loading} type="submit" className="manager-btn manager-btn-info">
          {loading && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {!loading && 'Save'}
        </button>
      </div>
    </form>
  );
}
export default FormWrap;
