import React from 'react';
import update from 'immutability-helper';
import InputField from './InputField';

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

    let fields = Array.isArray(data) ? data : [];

    if (data[3] && !data[3].value) {
        fields = data.slice(0, 4);
    }

    return (
        <div className="groupe-fields">
            {fields.map((item, idx) => (
                <InputField key={idx} item={item} onChange={onChange(idx)} />
            ))}
        </div>
    );
}
