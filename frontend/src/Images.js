import React, { useEffect, useState } from "react";
import Image from "./Image.js";

export default function Images() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:5001/");
        const responseDate = await response.json();
        console.log(responseDate);

        setImages(responseDate);
      } catch (err) {}
    };
    fetchImages();
  }, []);

  return (
    <div className='images-gallery '>
      {images.map((img) => {
        return <Image key={img._id} name={img.name} path={img.path} />;
      })}
    </div>
  );
}

// {products.map((product) => {
//           return <Product key={product.id} {...product} />
//         })}
