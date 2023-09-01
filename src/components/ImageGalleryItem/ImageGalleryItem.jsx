import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, showModal }) => {
  const { webformatURL, largeImageURL } = image;

  return (
    <li className={css.galleryItem}>
      <img
        src={webformatURL}
        alt=""
        className={css.image}
        onClick={() => showModal(largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
};
