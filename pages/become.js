import React, { useEffect, useState } from 'react';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Nav from 'components/Nav';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';

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

function Become() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({});
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

  const onSubmit = (data) => console.log(data);

  function toFeet(n) {
    const realFeet = (n * 0.3937) / 12;

    const feet = Math.floor(realFeet);
    const inches = (realFeet - feet) * 12;
    let add = '';
    let realInches = Math.floor(inches);
    const fraction = inches - realInches;
    if (fraction > 0.25 && fraction < 0.75) {
      add = ' 1/2';
    }
    if (fraction >= 0.75) {
      realInches++;
    }
    return `${feet}′ ${realInches ? `${realInches}″` : ''} ${add}`;
  }
  return (
    <>
      <Nav className="relative" />
      <Header img="/images/become.jpg" className="static">
        <>
          <div className="relative z-10">
            <h1 className="text-center">
              Become a<br />
              Model
            </h1>
          </div>
          <div className="absolute left-0 right-0  bottom-[75px]">
            <div className="wrap text">
              <div className="max-w-[600px]">
                Women Management is constantly looking for new faces. Our expectations are as varied as the number of models we represent. You are in the right place if you want to
                give you this adventure a try and maybe become our future tops !
              </div>
            </div>
          </div>
        </>
      </Header>
      <div className="content">
        <main>
          <div className="wrap py-20 text-lg text">
            <div className="max-w-[600px]">
              <form action="#" className="text-gray-500" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <div className="flex space-x-10">
                    <label>
                      <input type="radio" name="genreOption" value="Male" {...register('gender')} /> <span>Male</span>
                    </label>
                    <label>
                      <input type="radio" name="genreOption" value="Female" {...register('gender')} /> <span>Female</span>
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="ir">
                    <input type="text" placeholder="First name" {...register('firstName', { required: true })} />
                    {errors.firstName && <div className="error">First name is required</div>}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="ir">
                    <input type="text" placeholder="Last name" {...register('lastName', { required: true })} />
                    {errors.lastName && <div className="error">Last name is required</div>}
                  </div>
                </div>

                <div className="mb-4 flex space-x-10">
                  <div className="flex-1">
                    <div className="ir">
                      <input type="tel" placeholder="Phone" {...register('phone', { required: true })} />
                      {errors.lastName && <div className="error">Phone is required</div>}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="ir">
                      <input type="email" placeholder="Email" {...register('email', { required: true })} />
                      {errors.lastName && <div className="error">Email is required</div>}
                    </div>
                  </div>
                </div>
                <div className="mb-4 flex space-x-10">
                  <div className="flex-1">
                    <input type="text" placeholder="City" {...register('city')} />
                  </div>
                  <div className="flex-1">
                    <input type="text" placeholder="Country" {...register('country')} />
                  </div>
                </div>
                <div className="mb-4 flex space-x-10">
                  <div className="flex-1">
                    <input type="text" placeholder="Agency (if already modeling)" {...register('agency')} />
                  </div>
                  <div className="flex-1">
                    <select placeholder="Height" {...register('height')}>
                      {(function (rows, i, len) {
                        rows.push(
                          <option disabled value selected>
                            Height
                          </option>
                        );
                        while (++i <= len) {
                          const value = `${i} cm - ${toFeet(i)}`;
                          rows.push(
                            <option key={i} value={value}>
                              {value}
                            </option>
                          );
                        }
                        return rows;
                      })([], 149, 200)}
                    </select>
                  </div>
                </div>
                <div className="mb-4 flex space-x-10">
                  <div className="flex-1">
                    <input type="text" placeholder="Waist" {...register('waist')} />
                  </div>
                  <div className="flex-1">
                    <input type="text" placeholder="Bust/Chest" {...register('bustAndChest')} />
                  </div>
                </div>
                <div className="mb-4 flex space-x-10">
                  <div className="flex-1">
                    <input type="text" placeholder="Hips" {...register('hips')} />
                  </div>
                  <div className="flex-1">
                    <input type="text" placeholder="Shoe size" {...register('shoeSize')} />
                  </div>
                </div>
                <div className="mb-4 flex space-x-10">
                  <div className="flex-1">
                    <input type="text" placeholder="Hair color" {...register('hairColor')} />
                  </div>
                  <div className="flex-1">
                    <input type="text" placeholder="Eye color" {...register('eyeColor')} />
                  </div>
                </div>

                <div className="mb-4">
                  <input type="date" placeholder="Date of birth" {...register('dob')} />
                </div>
                <div className="mt-14 mb-3">3 files, up to 5mb each</div>

                <div className="mb-14">
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                  <aside style={thumbsContainer}>{thumbs}</aside>
                </div>

                <div className="mb-4 flex">
                  <label className="mr-3">
                    <input type="checkbox" value="On" {...register('terms')} />
                  </label>
                  <div>
                    I have read and I accept the Terms & Conditions.
                    <br />
                    Information to the applicant
                  </div>
                </div>

                <div className="mb-4 flex">
                  <label className="mr-3">
                    <input type="checkbox" value="On" {...register('sms')} />
                  </label>
                  <div>
                    I understand and agree that, upon my acceptance (that is not compulsory) you will also send me information by email and/or SMS about existing and new services
                    and special offers.
                  </div>
                </div>

                <div className="mb-4 flex">
                  <label className="mr-3">
                    <input type="checkbox" value="On" {...register('offer')} />
                  </label>
                  <div>
                    I understand and agree that upon my acceptance (that is not compulsory) you will be entitled to transfer my data to third parties with whom you have a
                    contractual relationship (partners, sponsors, etc.) so that I may receive special offers or other information from them.
                  </div>
                </div>
                <div className="mt-20">
                  <button className="link-follow">
                    Submit application{' '}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Become;
