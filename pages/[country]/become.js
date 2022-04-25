import React, { useEffect, useState, useRef } from 'react';
import Header from 'components/frontend/Header';
import Nav from 'components/frontend/Nav';
import Meta from 'components/frontend/Meta';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { convertMetric } from 'hooks/utils';
import { useRouter } from 'next/router';

function Become({ data }) {
  const router = useRouter();
  const [accept, setAccept] = useState({ terms: true, sms: true, offers: true });
  const [disabled, setDisabled] = useState(false);
  const [showInformation, setShowInformation] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dragWidget, setDragWidget] = useState();

  const dragStartHandler = (e, widget) => {
    setDragWidget(widget);
  };

  const dropHandler = (e, dropWidget) => {
    e.preventDefault();
    if (dropWidget.id === dragWidget.id) return;
    const tmp = [...files];
    const dragIdx = tmp.findIndex((widget) => widget.id === dragWidget.id);
    const dropIdx = tmp.findIndex((widget) => widget.id === dropWidget.id);
    [tmp[dragIdx], tmp[dropIdx]] = [tmp[dropIdx], tmp[dragIdx]];
    setFiles(tmp);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setDisabled(Object.values(accept).some((item) => !item));
  }, [accept]);
  const formRef = useRef();

  const [files, setFiles] = useState([]);
  const [uploadError, setUploadErrror] = useState(null);
  const deleteFile = (index) => {
    setFiles(files.filter((file, fileIndex) => fileIndex !== index));
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      try {
        setUploadErrror(null);
        const canAccepth = 3 - files.length;
        acceptedFiles = acceptedFiles.slice(0, canAccepth);
        acceptedFiles.map((file) => {
          if (+file.size > 5000000) {
            throw new Error("File can't be larger than 5mb");
          }
        });
        setFiles(
          files.concat(
            acceptedFiles.map((file, index) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
                id: index,
              })
            )
          )
        );
      } catch (error) {
        setUploadErrror(error.message);
      }
    },
    // onDropRejected: (e) => {
    //   console.log(e);
    //   if (e[0].errors[0].code === 'file-too-large') setUploadErrror("File can't be larger than 5mb");
    //   if (e[0].errors[0].code === 'too-many-files') setUploadErrror('Upload up to 4 photos');
    // },
  });

  const thumbs = files.map((file, index) => (
    <div
      className="thumb"
      key={file.name}
      draggable={true}
      onDragStart={(e) => dragStartHandler(e, file)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => dropHandler(e, file)}
    >
      <div className="thumbInner">
        <div className="delete-thumb" onClick={(e) => deleteFile(index)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <img src={file.preview} alt="" />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const onSubmit = async (data) => {
    setLoading(true);
    const body = new FormData(formRef.current);
    files.map((file) => {
      body.append('photos', file, file.name);
    });

    const res = await fetch('/api/sendmail', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body,
    }).then((res) => res.json());

    setLoading(false);
    reset();
    setFiles([]);
    setShowNotification('Your application was sent');
    setTimeout(() => {
      setShowNotification(null);
    }, 3000);
  };

  return (
    <>
      {loading && (
        <div className="fixed z-[20000] bg-[rgba(255,255,255,.9)] top-0 left-0 right-0 bottom-0 w-screen h-screen flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-16 h-16 animate-spin	 text-gray-600">
            <path
              fill="currentColor"
              d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"
            ></path>
          </svg>
        </div>
      )}
      <Meta>
        <title>{`${data.pages.become.metatitle} | ${data.info.company}`}</title>
        <meta name="description" content={data.pages.become.metadescription} />
      </Meta>
      <Nav className="relative theme-img" data={data.info} />
      <Header img={data.pages.become.cover} className="static">
        <>
          <div className="relative z-10">
            <h1 className="text-center">
              Become a<br />
              Model
            </h1>
          </div>
        </>
      </Header>
      <div className="content">
        <main>
          <div className="container">
            <div className="about-text">
              <div className="wrap text">
                <div className="max-w-[600px]">
                  <div className="content" dangerouslySetInnerHTML={{ __html: data.pages.become.text }}></div>
                </div>
              </div>
            </div>
            <div className="wrap py-20 text-lg text">
              <div className="max-w-[600px]">
                <form action="#" className="text-gray-500" onSubmit={handleSubmit(onSubmit)} ref={formRef} method="post" encType="multipart/form-data" noValidate>
                  <input type="hidden" name="page" value={router.query.country} />
                  <div className="mb-6">
                    <div className="flex space-x-10">
                      <label>
                        <input type="radio" name="genreOption" value="Male" {...register('gender')} /> <span>Male</span>
                      </label>
                      <label>
                        <input type="radio" name="genreOption" value="Female" checked="checked" {...register('gender')} /> <span>Female</span>
                      </label>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="ir">
                      <input type="text" placeholder="First name" {...register('firstName', { required: true })} />
                      {errors.firstName && <div className="error">This field is required</div>}
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="ir">
                      <input type="text" placeholder="Last name" {...register('lastName', { required: true })} />
                      {errors.lastName && <div className="error">This field is required</div>}
                    </div>
                  </div>
                  <div className="mb-6 flex space-x-10">
                    <div className="flex-1">
                      <div className="ir">
                        <input type="tel" placeholder="Phone" {...register('phone', { required: true })} />
                        {errors.phone && <div className="error">This field is required</div>}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="ir">
                        <input
                          type="email"
                          placeholder="Email"
                          {...register('email', {
                            required: 'This field is required',
                            pattern: {
                              value:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: 'Please enter a valid email',
                            },
                          })}
                        />
                        {errors.email && <div className="error">{errors.email.message}</div>}
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 flex space-x-10">
                    <div className="flex-1">
                      <div className="ir">
                        <input type="text" placeholder="City" {...register('modelcity', { required: true })} />
                        {errors.modelcity && <div className="error">This field is required</div>}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="ir">
                        <input type="text" placeholder="Country" {...register('modelcountry', { required: true })} />
                        {errors.modelcountry && <div className="error">This field is required</div>}
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 flex space-x-10">
                    <div className="flex-1">
                      <input type="text" placeholder="Agency (if already modeling)" {...register('agency')} />
                    </div>
                    <div className="flex-1">
                      <div className="ir">
                        <select
                          placeholder="Height"
                          {...register('height', {
                            minLength: 7,
                          })}
                        >
                          {(function (rows, i, len) {
                            rows.push(
                              <option key="-1" disabled selected>
                                Height
                              </option>
                            );
                            while (++i <= len) {
                              const value = `${i} cm - ${convertMetric(i)}`;
                              rows.push(
                                <option key={i} value={value}>
                                  {value}
                                </option>
                              );
                            }
                            return rows;
                          })([], 149, 200)}
                        </select>
                        {errors.height && <div className="error">This field is required</div>}
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 flex space-x-10">
                    <div className="flex-1">
                      <div className="ir">
                        <input type="text" placeholder="Waist" {...register('waist', { required: true })} />
                        {errors.waist && <div className="error">This field is required</div>}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="ir">
                        <input type="text" placeholder="Bust/Chest" {...register('bustAndChest', { required: true })} />
                        {errors.bustAndChest && <div className="error">This field is required</div>}
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 flex space-x-10">
                    <div className="flex-1">
                      <div className="ir">
                        <input type="text" placeholder="Hips" {...register('hips', { required: true })} />
                        {errors.hips && <div className="error">This field is required</div>}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="ir">
                        <input type="text" placeholder="Shoe size" {...register('shoeSize', { required: true })} />
                        {errors.shoeSize && <div className="error">This field is required</div>}
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 flex space-x-10">
                    <div className="flex-1">
                      <div className="ir">
                        <input type="text" placeholder="Hair color" {...register('hairColor', { required: true })} />
                        {errors.hairColor && <div className="error">This field is required</div>}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="ir">
                        <input type="text" placeholder="Eye color" {...register('eyeColor', { required: true })} />
                        {errors.eyeColor && <div className="error">This field is required</div>}
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="ir">
                      <input type="date" placeholder="Date of birth" {...register('dob', { required: true })} />
                      {errors.dob && <div className="error">This field is required</div>}
                    </div>
                  </div>
                  <div className="mt-14 mb-3">3 files, up to 5mb each</div>
                  <div className="mb-14">
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
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
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG files only</p>
                      </div>
                    </div>

                    <aside className="thumbsContainer">{thumbs}</aside>
                    {uploadError && (
                      <div className="mt-4">
                        <div className="error text-lg -mt-6">{uploadError}</div>
                      </div>
                    )}
                  </div>
                  <div className="mb-6 flex">
                    <label className="mr-3">
                      <input type="checkbox" checked={accept['terms']} onChange={(e) => setAccept({ ...accept, terms: e.target.checked })} />
                    </label>
                    <div>
                      I have read and I accept the Terms & Conditions.
                      <br />
                      <div className="cursor-pointer relative pr-10">
                        <div className="cursor-pointer" onClick={(e) => setShowInformation(true)}>
                          Information to the applicant
                        </div>
                        {showInformation && (
                          <div className="absolute right-0 top-0 cursor-pointer transition hover:text-black" onClick={(e) => setShowInformation(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {showInformation && <div className="text-xs" dangerouslySetInnerHTML={{ __html: data.pages.become.information?.split('\n').join('<br/>') }}></div>}
                    </div>
                  </div>
                  <div className="mb-6 flex">
                    <label className="mr-3">
                      <input type="checkbox" checked={accept['sms']} onChange={(e) => setAccept({ ...accept, sms: e.target.checked })} />
                    </label>
                    <div>
                      I understand and agree that, upon my acceptance (that is not compulsory) you will also send me information by email and/or SMS about existing and new services
                      and special offers.
                    </div>
                  </div>
                  <div className="mb-6 flex">
                    <label className="mr-3">
                      <input type="checkbox" checked={accept['offers']} onChange={(e) => setAccept({ ...accept, offers: e.target.checked })} />
                    </label>
                    <div>
                      I understand and agree that upon my acceptance (that is not compulsory) you will be entitled to transfer my data to third parties with whom you have a
                      contractual relationship (partners, sponsors, etc.) so that I may receive special offers or other information from them.
                    </div>
                  </div>

                  <div className="mt-20">
                    <button className="link-follow" type="submit" disabled={disabled}>
                      Submit application{' '}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                  {showNotification && (
                    <div className="mt-4">
                      <div className="error text-lg">{showNotification}</div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
Become.layout = 'default';
export async function getServerSideProps(context) {
  try {
    const { country } = context.params;

    const response = await fetch(`${process.env.HOST}/api/country/${country}/become`).then((res) => res.json());
    return {
      props: { data: response.data },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}
export default Become;
