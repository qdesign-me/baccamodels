import React, { useState, useRef, useEffect } from 'react';

function checkDepend(field, data) {
  if (!field.showOnly) return true;
  const temp = field.showOnly.split('===');
  if (temp.length === 2) {
    return data[temp[0]] === temp[1];
  }
  return true;
}

function MediaInput({ field, errors, data, setData }) {
  const inputFileRef = useRef();

  const [selectedFile, setSelectedFile] = useState();

  const onBtnClick = () => {
    inputFileRef.current.click();
  };

  const onFileSelect = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setData({ ...data, [field.field]: objectUrl });
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <div className={`col-span-3 ${errors[field.field] && 'has-error'}`}>
      <div className="mt-1 flex items-center">
        <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 indicator inline-flex items-center justify-center" onClick={onBtnClick}>
          {data[field.field] ? (
            <>
              {field.allow === 'image' && <img src={data[field.field]} className="w-12 h-12 object-cover" />}
              {field.allow === 'video' && <video autoPlay={true} muted={true} loop playsInline src={data[field.field]} className="w-12 h-12 object-cover" />}
            </>
          ) : (
            <>
              {field.allow === 'image' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
              {field.allow === 'video' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
            </>
          )}
        </span>
        <button
          type="button"
          onClick={onBtnClick}
          className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Change
        </button>
        <input name={field.newname} type="file" className="sr-only" ref={inputFileRef} accept={field.accept} onChange={onFileSelect} />
        <input type="hidden" name={field.field} value={data[field.field]} />

        {field.allow === 'image' && <p className="ml-auto text-xs text-gray-500">PNG, JPG up to 10MB</p>}
        {field.allow === 'video' && <p className="ml-auto text-xs text-gray-500">MP4</p>}
      </div>
      {errors[field.field] && <div className="error">{errors[field.field]}</div>}
    </div>
  );
}
function SelectInput({ field, errors, data }) {
  const [val, setVal] = useState(data[field.field]);
  const spans = { 6: 'col-span-6', 3: 'col-span-6 sm:col-span-3' };
  return (
    <div className={`${spans[field.span]} ${errors[field.field] && 'has-error'}`}>
      <label htmlFor={field.field} className="block text-sm font-medium text-gray-700">
        {field.title}
      </label>
      <select
        name={field.field}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      >
        {field.variants.map((variant) => (
          <option key={variant}>{variant}</option>
        ))}
      </select>
      {errors[field.field] && <div className="error">{errors[field.field]}</div>}
    </div>
  );
}
function TextInput({ field, errors, data, setData }) {
  const handleChange = (e) => {
    setData({ ...data, [field.field]: e.target.value });
  };
  const spans = { 12: 'col-span-12', 6: 'col-span-6', 3: 'col-span-6 sm:col-span-3' };
  return (
    <div className={`${spans[field.span]} ${errors[field.field] && 'has-error'}`}>
      <label htmlFor={field.field} className="block text-sm font-medium text-gray-700">
        {field.title}
      </label>
      <input
        type={field.input ?? 'text'}
        name={field.field}
        value={data[field.field]}
        onChange={handleChange}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />
      {errors[field.field] && <div className="error">{errors[field.field]}</div>}
    </div>
  );
}
function SocialInput({ field, errors, data, setData }) {
  const handleChange = (e) => {
    setData({ ...data, [field.field]: e.target.value });
  };
  return (
    <div className={`col-span-3 ${errors[field.field] && 'has-error'}`}>
      <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
        {field.title}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">https://</span>
        <input
          type="text"
          name={field.field}
          value={data[field.field]}
          onChange={handleChange}
          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
          placeholder={field.placeholder}
        />
      </div>
      {errors[field.field] && <div className="error">{errors[field.field]}</div>}
    </div>
  );
}

function CheckboxesInput({ field, errors, data, setData }) {
  const spans = { 12: 'col-span-12', 6: 'col-span-6', 3: 'col-span-6 sm:col-span-3' };
  const getRealValue = (val) => {
    if (val) return field.values[0];
    return field.values[1];
  };
  const handleChange = (e) => {
    setData({ ...data, [field.field]: getRealValue(e.target.checked) });
  };
  return (
    <fieldset className={`${spans[field.span]} ${errors[field.field] && 'has-error'}`}>
      <legend className="text-base font-medium text-gray-900">{field.title}</legend>
      <div className="mt-4 space-y-4">
        <input type="hidden" value={data[field.field]} name={field.field} />
        {field.variants.map((variant) => (
          <div className="flex items-start" key={variant.value}>
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                defaultChecked={data[field.field] === field.values[0]}
                onChange={handleChange}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="comments" className="font-medium text-gray-700">
                {variant.title}
              </label>
              <p className="text-gray-500">{variant.subtitle}</p>
            </div>
          </div>
        ))}
        {errors[field.field] && <div className="error">{errors[field.field]}</div>}
      </div>
    </fieldset>
  );
}
function RadiobuttonsInput({ field, errors, data, setData }) {
  const handleChange = (e) => {
    setData({ ...data, [field.field]: e.target.value });
  };

  return (
    <fieldset className={`${errors[field.field] && 'has-error'}`}>
      <legend className="text-base font-medium text-gray-900">{field.title}</legend>
      <div className="mt-4 space-y-4">
        {field.variants.map((variant) => (
          <div className="flex items-start" key={variant.value}>
            <div className="flex items-center h-5">
              <input
                name={field.field}
                type="radio"
                onChange={handleChange}
                value={variant.value}
                checked={data[field.field] === variant.value}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="comments" className="font-medium text-gray-700">
                {variant.title}
              </label>
              <p className="text-gray-500">{variant.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      {errors[field.field] && <div className="error">{errors[field.field]}</div>}
    </fieldset>
  );
}
function TextareaInput({ field, errors, data }) {
  const spans = { 12: 'col-span-12', 6: 'col-span-6', 3: 'col-span-6 sm:col-span-3' };

  const [val, setVal] = useState(data[field.field]);
  return (
    <div className={`${spans[field.span] ?? ''} ${errors[field.field] && 'has-error'}`}>
      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
        {field.title}
      </label>
      <div className="mt-1">
        <textarea
          name={field.field}
          rows={field.rows ?? 8}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          placeholder={field.placeholder ?? ''}
        ></textarea>
      </div>
      {field.description && <p className="mt-2 text-sm text-gray-500">{field.description}</p>}
      {errors[field.field] && <div className="error">{errors[field.field]}</div>}
    </div>
  );
}
function UploadInput({ field, errors, data }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{field.title}</label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <span>Upload a file</span>
              <input name={field.field} type="file" className="sr-only" />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          {field.media === 'images' && <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>}
          {field.media === 'videos' && <p className="text-xs text-gray-500">MP4</p>}
        </div>
      </div>
      {errors[field.field] && <div className="error">{errors[field.field]}</div>}
    </div>
  );
}
function PasswordInput({ field, errors, data }) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <label htmlFor={field.field} className="block text-sm font-medium text-gray-700">
        {field.title}
      </label>
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          name={field.field}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
        <div className="pointer absolute top-2 right-2">
          {visible === true && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={(e) => setVisible(false)}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
          {visible === false && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={(e) => setVisible(true)}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
export default function Form({ title, subtitle, groups, data, errors }) {
  const [userData, setUserData] = useState(data.data);
  return (
    <>
      <div>
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
              <p className="mt-1 text-sm text-gray-600">{subtitle}.</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 col-span-3">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                {groups?.map((group, groupIndex) => (
                  <div className={group.className} key={groupIndex}>
                    {group.fields.map((field) => (
                      <React.Fragment key={field.field}>
                        {field.type === 'social' && checkDepend(field, userData) && <SocialInput field={field} errors={errors} data={userData} setData={setUserData} />}
                        {field.type === 'text' && checkDepend(field, userData) && <TextInput field={field} errors={errors} data={userData} setData={setUserData} />}
                        {field.type === 'select' && checkDepend(field, userData) && <SelectInput field={field} errors={errors} data={userData} setData={setUserData} />}
                        {field.type === 'password' && checkDepend(field, userData) && <PasswordInput field={field} errors={errors} data={userData} setData={setUserData} />}
                        {field.type === 'textarea' && checkDepend(field, userData) && <TextareaInput field={field} errors={errors} data={userData} setData={setUserData} />}
                        {field.type === 'checkboxes' && checkDepend(field, userData) && <CheckboxesInput field={field} errors={errors} data={userData} setData={setUserData} />}
                        {field.type === 'radiobuttons' && checkDepend(field, userData) && <RadiobuttonsInput field={field} errors={errors} data={userData} setData={setUserData} />}
                        {field.type === 'upload' && checkDepend(field, userData) && <UploadInput field={field} errors={errors} data={userData} setData={setUserData} />}
                        {field.type === 'media' && checkDepend(field, userData) && <MediaInput field={field} errors={errors} data={userData} setData={setUserData} />}
                      </React.Fragment>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
