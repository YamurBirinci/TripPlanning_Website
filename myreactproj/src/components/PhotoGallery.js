import React, { useState } from 'react';
import '../styles/PhotoGallery.css';

function PhotoGallery({ images }) {
  const [visibleIndex, setVisibleIndex] = useState(0); //İlk etapta görünen resimlerin başında olan fotoğrafının 0. olan olmasını sağlar.
  const [selectedImage, setselectedImage] = useState(images[0]); //Üstüne tıklandığında büyüyecek resmi tutar. (Başlangıçta 0. olan resimdir.)
  const [modal, setModal] = useState(false); //Üstüne tıklandığında modalın açılmasını sağlar, ilk etapta modal kapalı

  const ClickingImage = (img) => { //Görsele tıkladığında modal olarak resmin açılmasını sağlar
    setselectedImage(img);
    setModal(true);
  };

  const scrollingImage = (direction) => {
    let newIndex = visibleIndex + (direction === 'left' ? -1 : 1);
    setVisibleIndex(newIndex);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="gallery">
      {modal && (
        <div className="modal" onClick={closeModal}>
          <div className="close">x</div>
          <img src={selectedImage} alt="Seçili" className="modal-content"/>
        </div>
      )}

      <button className="scroll-button left" onClick={() => scrollingImage('left')} disabled={visibleIndex === 0}>
        &lt;
      </button>

      <div className="img-scrollingImage">
        <div className="scrollingImage-container" style={{ transform:`translateX(${-visibleIndex * (100/3)}%)` }}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Resim ${index}`}
              className="scrollingImage"
              onClick={() => ClickingImage(img)}
            />
          ))}
        </div>
      </div>

      <button className="scroll-button right" onClick={() => scrollingImage('right')} disabled={visibleIndex === images.length-3}>
        &gt;
      </button>
    </div>
  );
}

export default PhotoGallery;
