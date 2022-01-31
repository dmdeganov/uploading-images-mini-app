import React, { useRef, useState, useEffect } from "react";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState();

  const nameInput = useRef();
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    //NOTE: FileReader is built in Browser API
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    //NOTE: second, this file is going to be used. this is just how this API works
    fileReader.readAsDataURL(file);
    //NOTE: firt, this file will be readed
  }, [file]);

  const changeHandler = () => {
    setName(nameInput.current.value);
  };

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
  };

  const pickImageHandler = (e) => {
    e.preventDefault();
    filePickerRef.current.click();
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      console.log(file);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", file);

      const response = await fetch("http://localhost:5001/", {
        method: "POST",
        body: formData,
        headers: {},
      });

      const responseData = await response.json();
      console.log(responseData);
    } catch (err) {}
  };

  return (
    <div>
      <div className='upload-form'>
        <div className='preview-container'>
          {previewUrl && <img src={previewUrl} alt='Preview' />}
          {/* //NOTE: here we are using this preview image */}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>

        <div className='upload-fields' action='' method='post'>
          <input
            ref={filePickerRef}
            style={{ display: "none" }}
            type='file'
            accept='.jpg,.png,.jpeg'
            onChange={pickedHandler}
          />
          <button className='field btn' onClick={pickImageHandler}>
            Choose an image
          </button>
          <input
            ref={nameInput}
            className='field'
            type='text'
            placeholder="input picture's name"
            onChange={changeHandler}
          />
          <button
            type='submit'
            className='invert field btn'
            onClick={submitHandler}
          >
            UPLOAD
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
