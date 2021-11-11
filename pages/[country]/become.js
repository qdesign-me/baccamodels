import React, { useEffect, useState, useRef } from 'react';
import Header from 'components/frontend/Header';
import Nav from 'components/frontend/Nav';
import Meta from 'components/frontend/Meta';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { convertMetric } from 'hooks/utils';
import { useRouter } from 'next/router';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

function Become({ data }) {
  const router = useRouter();
  const [accept, setAccept] = useState({ terms: true, sms: true, offers: true });
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
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
  const [showInformation, setShowInformation] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
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
    setShowNotification('Your application was sent');
    setTimeout(() => {
      setShowNotificationx(null);
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
        <title>{data.pages.become.metatitle}</title>
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
                <form action="#" className="text-gray-500" onSubmit={handleSubmit(onSubmit)} ref={formRef} method="post" enctype="multipart/form-data" noValidate>
                  <input type="hidden" name="country" value={router.query.country} />
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
                              <option disabled value selected>
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
                      <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    <aside style={thumbsContainer}>{thumbs}</aside>
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
                      {showInformation && (
                        <div className="text-xs">
                          Information to the applicant Women Model Management Inc. belongs to an important group of companies worldwide, acting in the field of model management.
                          <br />
                          <br />
                          We are always looking for new faces/new looks. If you believe you have the necessary skills and physical characteristics, please feel free to submit your
                          application.
                          <br />
                          <br />
                          We will do a first screening based on the information supplied by you and, should we deem it interesting to go further, we will propose you a meeting in
                          our offices. Please consider that, in case you are under the age of 18, your application must be approved by your parents/legal guardian. We will not be
                          in a position to consider your application, unless we receive your parental/legal guardian’s approval. This is why we ask you to provide us with an email
                          address, telephone number and other data of your parent/legal guardian. In case of his/her refusal, or in the event the approval is not granted within 15
                          days from our request, we will delete all the data supplied by you in the application. Please remember that your parent/legal guardian contact information
                          will be the only ones we will utilize, should we intend to contact you to propose a meeting. Please also remember that we will require that your
                          parent/legal guardian attend any meeting we might propose to you in the future.
                          <br />
                          <br />
                          We will utilize the information, the photographs and the personal data provided by you for the sole scope of a preliminary evaluation of your potential as
                          a model. It is important you give us true and complete information in order to allow us to do such an evaluation. In particular, please verify you are
                          legally in a position to provide us with the photos you are annexing herewith and that no third party (the photographer or others) may object to this.
                          <br />
                          <br />
                          Your personal data will be stored in the EU and will be treated electronically or physically for the purposes indicated above. The storage and the
                          treatment of your data will last for the period that is reasonably necessary in order to do the evaluation described above, not to exceed 6 (six) months.
                          Thereafter, your data will be deleted, should your application be unsuccessful. There might be exceptions, in cases in which, though we not be immediately
                          interested, we might wish to meet you in the future. We will inform you and your parent/legal guardian, should this be the case.
                          <br />
                        </div>
                      )}
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
  const { country } = context.params;

  const response = await fetch(`${process.env.HOSTNAME}/api/country/${country}/become`).then((res) => res.json());
  return {
    props: { data: response.data },
  };
}
export default Become;
