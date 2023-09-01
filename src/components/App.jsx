import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { searchImages } from 'api';

  export const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState(null);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);

  const onSubmit = e => {
    e.preventDefault();
    const query = e.target.elements.searchWord.value.trim().toLowerCase();
    if (!query.length) {
      alert('Please, write a search word');
      return;
    }
    setSearchTerm(query);
    setImages([]);
    setPage(1);
    e.target.reset();
  };

  const showModal = url => {
    setIsShowModal(true);
    setModalImage(url);
  };

  const closeModal = () => setIsShowModal(false);

  const handleLoadMoreButton = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    setIsLoading(true);
    searchImages(searchTerm, page)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error(`Nothing found for ${searchTerm}`));
      })
      .then(images => {
        if (!images.hits.length) {
          alert('Nothing found');
        } else {
          setImages(prevImages => [...prevImages, ...images.hits]);
          setTotalImages(images.totalHits);
        }
      })
      .catch(error => {
        setErrorType(error);
        console.log(errorType);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchTerm, page, errorType]);

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {searchTerm && images.length > 0 && (
        <ImageGallery images={images} showModal={showModal} />
      )}
      {isLoading && <Loader />}
      {isShowModal && <Modal image={modalImage} closeModal={closeModal} />}
      {searchTerm && totalImages > images.length && !isLoading && (
        <Button onClick={handleLoadMoreButton} />
      )}
    </>
  );
};
