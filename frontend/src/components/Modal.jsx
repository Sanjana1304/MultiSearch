import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-opacity-0 flex justify-center items-center z-50">
      <div className="">
        <button className="absolute top-7 right-12 text-purple-500 text-9xl" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;