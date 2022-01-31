import React from "react";
function Image({ name, path }) {
  console.log(path);

  return (
    <div className='card'>
      <div className='image-container'>
        <img
          className='image'
          src={`http://localhost:5001/${path}`}
          alt={name}
        />
      </div>

      <div class='name-container'>
        <p>{name}</p>
      </div>
    </div>
  );
}

export default Image;
