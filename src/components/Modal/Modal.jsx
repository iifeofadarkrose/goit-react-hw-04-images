import css from './Modal.module.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handlePressOnESC);
  }

  handlePressOnESC = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePressOnESC);
  }

  render() {
    const { image, closeModal } = this.props;
    return (
      <div className={css.overlay} onClick={closeModal}>
        <div className={css.modal}>
          <img src={image} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
