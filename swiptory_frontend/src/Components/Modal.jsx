import React from 'react';
import styles from './components.module.css';

const Modal = ({ children, onOpen, onClose, title }) => {

    return (
        <div>
            {onOpen && (
                <div className={styles.modal_overlay}>
                    <div className={styles.modal}>
                        <button className={styles.modal_close_button} onClick={onClose}>x</button>
                        <h3>{title}</h3>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
