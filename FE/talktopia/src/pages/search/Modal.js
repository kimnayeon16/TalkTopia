  import React from 'react';
import './Modal.css'; // 모달 스타일을 위한 CSS 파일을 임포트하세요.
import useTokenValidation from '../../utils/useTokenValidation';

function Modal({ isOpen, closeModal, children }) {
  useTokenValidation();
  
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={closeModal}>닫기</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
