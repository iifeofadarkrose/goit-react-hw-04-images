import css from './Modal.module.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ image, closeModal }) => {
  useEffect(() => {
    const handlePressOnESC = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handlePressOnESC);
    return window.removeEventListener('keydown', handlePressOnESC);
  }, [closeModal]);

  return (
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal}>
        <img src={image} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
