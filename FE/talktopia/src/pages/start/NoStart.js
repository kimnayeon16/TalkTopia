import React, { useState } from 'react';
import style from './NoStart.module.css';

const imagesData = [
    process.env.PUBLIC_URL + '/img/cute1.png',
    process.env.PUBLIC_URL + '/img/cute2.png',
    process.env.PUBLIC_URL + '/img/cute3.png',
    process.env.PUBLIC_URL + '/img/cute4.png',
    // process.env.PUBLIC_URL + '/img/login1.jpg',
    // process.env.PUBLIC_URL + '/img/login3.jpg',
    // process.env.PUBLIC_URL + '/img/login6.jpg',
    // process.env.PUBLIC_URL + '/img/login7.jpg',
    // process.env.PUBLIC_URL + '/img/login8.jpg',
    // process.env.PUBLIC_URL + '/img/login9.jpg',
    // process.env.PUBLIC_URL + '/img/ocean1.jpg',
    // process.env.PUBLIC_URL + '/img/ocean2.jpg',
];

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  let globalIndex = 0;
  let last = { x: 0, y: 0 };
  let images = [];

  const handleMouseMove = (e) => {
    if (distanceFromLast(e.clientX, e.clientY) > window.innerWidth / 20) {
      const lead = images[globalIndex % images.length];
      const tail = images[(globalIndex - 5) % images.length];

      activate(lead, e.clientX, e.clientY);

      if (tail) tail.dataset.status = "inactive";

      globalIndex++;
    }
  };

  const distanceFromLast = (x, y) => {
    return Math.hypot(x - last.x, y - last.y);
  };

  const activate = (image, x, y) => {
    image.style.left = `${x}px`;
    image.style.top = `${y}px`;
    image.style.zIndex = globalIndex;

    image.dataset.status = "active";

    last = { x, y };
  };

  const renderedImages = imagesData.map((imageUrl, index) => (
    <img
      key={index}
      className={`${style.image} ${index === activeIndex ? style.active : style.inactive}`}
      src={imageUrl}
      alt={`Image ${index}`}
      ref={(img) => images[index] = img}
    />
  ));

  return (
    <div className={style["gallery-container"]} onMouseMove={handleMouseMove}>
      {renderedImages}
    </div>
  );
};

export default Gallery;
