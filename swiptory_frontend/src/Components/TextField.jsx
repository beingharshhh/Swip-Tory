import React from 'react'
import styles from './components.module.css'

const TextField = ({ type, label, placeholder, helperText, value, onChange }) => {
    return (
        <>
            <div className={styles.input_box}>
                <div className={styles.input_label_box}>
                    <label className={styles.input_label}>{label}</label>
                </div>
                <div className={styles.input_field_box}>
                    <input
                        className={styles.input_field}
                        type={type}
                        name={label}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                    />
                    <span style={{ color: 'red', fontFamily: "\"DM Sans\", sans-serif" }}>{helperText}</span>
                </div>
            </div>
        </>
    )
}

export default TextField