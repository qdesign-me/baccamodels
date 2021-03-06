import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { validateEmail } from 'hooks/utils';
function FormWrap({ children, validators, onSubmit, previewUrl, useId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [errors, setErrors] = useState([]);
  const [scrollElement, setScrollElement] = useState(null);
  useEffect(() => {
    if (!scrollElement) return;
    let element = document?.querySelector(`[name="${scrollElement}"]`);
    if (element) {
      if (element.getAttribute('type') === 'hidden') {
        element = element.closest('div');
      }
      element?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      setScrollElement(null);
    }
  }, [scrollElement]);
  const back = () => router.back();
  const change = (e) => {
    const name = e.target.name;
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };
  const submit = async (event) => {
    event.preventDefault();

    setErrors([]);
    let errorCount = 0;

    const data = new FormData(event.target);
    if (validators) {
      validators?.required?.map((field) => {
        const value = data.get(field);
        if (!value) {
          setErrors((old) => {
            return { ...old, [field]: 'This field is required' };
          });
          if (!errorCount) setScrollElement(field);
          errorCount++;
        }
      });
      validators?.email?.map((field) => {
        const value = data.get(field);
        if (value && !validateEmail(value)) {
          setErrors((old) => {
            return { ...old, [field]: 'Please provide valid email' };
          });
          if (!errorCount) setScrollElement(field);
          errorCount++;
        }
      });
      validators?.domain?.map((field) => {
        const value = data.get(field);
        if (value) {
          let message = '';
          if (field.includes('instagram') && !value.startsWith('instagram')) message = 'Link should start with instagram.com';
          if (field.includes('facebook') && !value.startsWith('facebook')) message = 'Link should start with facebook.com';
          if (field.includes('vk') && !value.startsWith('vk')) message = 'Link should start with vk.com';
          if (message) {
            setErrors((old) => {
              return { ...old, [field]: message };
            });
            if (!errorCount) setScrollElement(field);
            errorCount++;
          }
        }
      });

      validators?.password?.map((field) => {
        const value = data.get(field);
        if (value) {
          let message = '';
          if (!value.match(/(?=.*\d)/)) message = 'Password should contain at least one digit';
          if (!value.match(/(?=.*[a-z])/)) message = 'Password should contain at least one lower case';
          if (!value.match(/(?=.*[A-Z])/)) message = 'Password should contain at least one upper case';
          if (!value.match(/(?=.*[!@#\$%\^\&*\)\(+=._-])/)) message = 'Password should contain at least one special character';
          if (value.length < 6) message = 'Password should be at least 6 characters';

          if (message) {
            setErrors((old) => {
              return { ...old, [field]: message };
            });
            if (!errorCount) setScrollElement(field);
            errorCount++;
          }
        }
      });

      if (validators?.server) {
        const pairs = {};
        validators.server.fields.map((field) => {
          pairs[field] = data.get(field);
        });

        const found = await fetch(`${process.env.HOST}${validators.server.url}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...pairs, mode: 'validate', id: router.query.id }),
        }).then((res) => res.json());

        if (found.data.message !== 'ok') {
          setErrors((old) => {
            return { ...old, [validators.server.fields[0]]: found.data.message };
          });
          if (!errorCount) setScrollElement(validators.server.fields[0]);
          errorCount++;
        }
      }
    }

    if (errorCount) {
      return false;
    }
    setLoading(true);
    await onSubmit(data);
    setLoading(false);
  };
  const childrenWithProps = (children) =>
    children.map((child, key) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { errors, key });
      }
      return child;
    });
  useEffect(() => {
    setInitialized(true);
  }, []);
  return (
    <>
      {initialized && (
        <form action="#" method="POST" onSubmit={submit} noValidate onChange={change}>
          {childrenWithProps(children)}
          <div className=" py-6 bg-gray-50 text-right flex items-center justify-end">
            <button type="button" onClick={back} className="manager-btn">
              Back
            </button>
            {previewUrl && (
              <Link href={previewUrl}>
                <a className="manager-btn manage-btn-success" target="_blank">
                  Preview
                </a>
              </Link>
            )}
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
      )}
    </>
  );
}
export default FormWrap;
