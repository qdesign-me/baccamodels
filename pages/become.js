import React, { useEffect, useState } from 'react';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Nav from 'components/Nav';
import { useDropzone } from 'react-dropzone';

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
  const [files, setFiles] = useState([]);
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
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

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
              <form action="#" className="text-gray-500">
                <div className="mb-4">
                  <div className="flex space-x-10">
                    <label>
                      <input type="radio" id="radio1" name="genreOption" value="m" /> <span>Male</span>
                    </label>
                    <label>
                      <input type="radio" id="radio1" name="genreOption" value="m" /> <span>Femile</span>
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <input type="text" placeholder="First name" />
                </div>
                <div className="mb-4">
                  <input type="text" placeholder="First name" />
                </div>

                <div className="mb-4 flex space-x-10">
                  <div className="flex-1">
                    <input type="tel" placeholder="Phone" />
                  </div>
                  <div className="flex-1">
                    <input type="email" placeholder="Email" />
                  </div>
                </div>
                <div className="mb-4 flex space-x-10">
                  <div className="flex-1">
                    <input type="text" placeholder="City" />
                  </div>
                  <div className="flex-1">
                    <input type="text" placeholder="Country" />
                  </div>
                </div>
                <div className="mb-4 flex space-x-10">
                  <div className="flex-1">
                    <input type="text" placeholder="Agency (if already modeling)" />
                  </div>
                  <div className="flex-1">
                    <input type="text" placeholder="Height" />
                  </div>
                </div>
                <div className="mb-4 flex space-x-10">
                  <div className="flex-1">
                    <input type="text" placeholder="Waist" />
                  </div>
                  <div className="flex-1">
                    <input type="text" placeholder="Bust/Chest" />
                  </div>
                </div>
                <div className="mb-4 flex space-x-10">
                  <div className="flex-1">
                    <input type="text" placeholder="Hips" />
                  </div>
                  <div className="flex-1">
                    <input type="text" placeholder="Shoe size" />
                  </div>
                </div>
                <div className="mb-4 flex space-x-10">
                  <div className="flex-1">
                    <input type="text" placeholder="Hair color" />
                  </div>
                  <div className="flex-1">
                    <input type="text" placeholder="Eye color" />
                  </div>
                </div>

                <div className="mb-4">
                  <input type="date" placeholder="Date of birth" />
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
                    <input type="radio" id="radio1" name="genreOption" value="m" />
                  </label>
                  <div>
                    I have read and I accept the Terms & Conditions.
                    <br />
                    Information to the applicant
                  </div>
                </div>

                <div className="mb-4 flex">
                  <label className="mr-3">
                    <input type="radio" id="radio1" name="genreOption" value="m" />
                  </label>
                  <div>
                    I understand and agree that, upon my acceptance (that is not compulsory) you will also send me information by email and/or SMS about existing and new services
                    and special offers.
                  </div>
                </div>

                <div className="mb-4 flex">
                  <label className="mr-3">
                    <input type="radio" id="radio1" name="genreOption" value="m" />
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
