import React from 'react';
import update from 'immutability-helper';
import { Button } from 'antd';
import InputField from './InputField';
import { getNewGroupField } from '../utils';

export default function GroupFields({ data, setGroups, groupIndex }) {
    const onChange = (index) => (name, value) => {
        setGroups((prevGroups) =>
            update(prevGroups, {
                [groupIndex]: {
                    fields: {
                        [index]: {
                            $apply: (obj) => ({ ...obj, value }),
                        },
                    },
                },
            }),
        );
    };

    const handleAddField = () => {
        setGroups((prevGroups) =>
            update(prevGroups, {
                [groupIndex]: {
                    fields: { $push: getNewGroupField() },
                },
            }),
        );
    };

    let fields = Array.isArray(data) ? data : [];

    if (data[3] && !data[3].value) {
        fields = data.slice(0, 4);
    }

    return (
        <>
            <div className="groupe-fields">
                {fields.map((item, idx) => (
                    <InputField
                        key={idx}
                        item={item}
                        onChange={onChange(idx)}
                    />
                ))}
            </div>

            {fields[3] && fields[3].value ? (
                <Button
                    type="primary"
                    className="add-variable"
                    onClick={handleAddField}
                >
                    Add Variable
                </Button>
            ) : (
                ''
            )}
            <div className="group-divider"></div>
        </>
    );
}
