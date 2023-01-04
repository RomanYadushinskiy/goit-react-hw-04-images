import PropTypes from 'prop-types';
// import { Component } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({largeImageURL, onClose}) => {

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
      <div className={styles.overlay} onClick={handleBackDropClick}>
        <div className={styles.modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>,
      modalRoot
    );
}

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackDropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={styles.overlay} onClick={this.handleBackDropClick}>
//         <div className={styles.modal}>
//           <img src={this.props.largeImageURL} alt="" />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// };

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};