import React from 'react';
import { Input, Checkbox, Switch, Select, Upload } from 'antd';

export default function InputField({ item, onChange = () => {} }) {
    const { type = '', name, value, options = [], prefixe, label } = item;

    const handleChangeInput = (e) => {
        const value = e.target ? e.target.value || e.target.checked : e;
        onChange(name, value);
    };

    const handleChangeUpload = (info) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            onChange(name, value);
        }
    };

    if (type.toLowerCase() === 'input') {
        return (
            <div className="input-field">
                {label && <p className="label">{label}</p>}
                <Input
                    onChange={handleChangeInput}
                    name={name}
                    value={value}
                    prefixe={prefixe}
                />
            </div>
        );
    }

    if (type.toLowerCase() === 'checkbox') {
        return (
            <Checkbox
                onChange={handleChangeInput}
                name={name}
                checked={value}
                className="checkbox-field"
            />
        );
    }

    if (type.toLowerCase() === 'switch') {
        return (
            <div className="switch-field">
                {label && <p className="label">{label}</p>}
                <Switch onChange={handleChangeInput} checked={value} />
            </div>
        );
    }

    if (type.toLowerCase() === 'select') {
        return (
            <div className="select-field">
                {label && <p className="label">{label}</p>}
                <Select
                    onChange={handleChangeInput}
                    value={value}
                    options={options}
                />
            </div>
        );
    }

    if (type.toLowerCase() === 'upload') {
        return (
            <Upload
                name="image"
                listType="picture-card"
                className="upload-field"
                showUploadList={false}
                onChange={handleChangeUpload}
                accept="image/*"
            >
                {value ? (
                    <img src={value} alt="img-alt" />
                ) : (
                    <div>
                        <svg
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.6261 3.78892C16.1814 3.34434 15.6451 3.12199 15.0166 3.12199H13.0248L12.5713 1.91272C12.4586 1.62228 12.2527 1.37177 11.9532 1.16123C11.6538 0.950771 11.347 0.845467 11.0328 0.845467H6.47985C6.16565 0.845467 5.85883 0.950771 5.55942 1.16123C5.26001 1.37177 5.05408 1.62228 4.94142 1.91272L4.48793 3.12199H2.49605C1.86756 3.12199 1.33116 3.34434 0.886486 3.78892C0.441907 4.23353 0.219618 4.76999 0.219618 5.39843V13.366C0.219618 13.9945 0.441907 14.531 0.886486 14.9755C1.33116 15.4201 1.86759 15.6425 2.49605 15.6425H15.0164C15.6449 15.6425 16.1812 15.4201 16.6259 14.9755C17.0704 14.531 17.2928 13.9945 17.2928 13.366V5.39843C17.2929 4.76999 17.0706 4.23353 16.6261 3.78892ZM11.5707 12.1967C10.7911 12.9763 9.85306 13.3662 8.75625 13.3662C7.65944 13.3662 6.72145 12.9763 5.94183 12.1967C5.16221 11.4173 4.77248 10.479 4.77248 9.38244C4.77248 8.28554 5.16234 7.34758 5.94183 6.56796C6.72135 5.78834 7.65947 5.39861 8.75625 5.39861C9.85303 5.39861 10.7911 5.78844 11.5707 6.56796C12.3503 7.34748 12.74 8.28554 12.74 9.38244C12.74 10.479 12.3503 11.4172 11.5707 12.1967Z"
                                fill="#DDE0E7"
                            />
                            <path
                                d="M8.75629 6.82121C8.0508 6.82121 7.4476 7.07169 6.94664 7.57271C6.44569 8.07366 6.19521 8.67677 6.19521 9.38242C6.19521 10.0878 6.44569 10.691 6.94664 11.1919C7.4476 11.6928 8.05077 11.9433 8.75629 11.9433C9.46169 11.9433 10.065 11.6928 10.5659 11.1919C11.0669 10.691 11.3174 10.0878 11.3174 9.38242C11.3174 8.6768 11.0669 8.07369 10.5659 7.57271C10.065 7.07172 9.46169 6.82121 8.75629 6.82121Z"
                                fill="#DDE0E7"
                            />
                        </svg>
                    </div>
                )}
            </Upload>
        );
    }
}
