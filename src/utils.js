import { v4 as uuidv4 } from 'uuid';

export const DND_TYPES = {
    group: 'group',
    groupItems: 'group_items',
};

export const getNewGroupe = (name = 'Group Details') => [
    {
        id: uuidv4(),
        name,
        fields: [
            {
                type: 'Input',
                label: 'Group name 2',
                value: 'Toast it',
                name: 'groupName',
            },
            {
                type: 'Select',
                label: 'Item Choice',
                value: 'Toast it',
                name: 'itemChoice',
                options: [
                    {
                        label: 'Multiple items',
                        value: '1',
                    },
                    {
                        label: 'Multiple items 2',
                        value: '2',
                    },
                ],
            },
            {
                type: 'Switch',
                label: 'Show images',
                value: false,
                name: 'switch1',
            },
            {
                type: 'Switch',
                label: 'Visible if other items selected',
                value: true,
                name: 'switch2',
            },
            {
                type: 'Select',
                value: 'and',
                name: 'select1',
                options: [
                    {
                        label: 'And',
                        value: 'and',
                    },
                ],
            },
            {
                type: 'Select',
                value: '1',
                name: 'select2',
                options: [
                    {
                        label: 'Bread/Rye',
                        value: '1',
                    },
                ],
            },
        ],
        items: getNewGroupItem(),
    },
];

export const getNewGroupField = () => [
    {
        type: 'Select',
        value: '',
        name: 'select1',
        options: [
            {
                label: 'And',
                value: 'and',
            },
        ],
    },
    {
        type: 'Select',
        value: '',
        name: 'select2',
        options: [
            {
                label: 'Bread/Rye',
                value: '',
            },
        ],
    },
];

export const getNewGroupItem = () => [
    {
        id: uuidv4(),
        fields: [
            {
                type: 'Checkbox',
                value: false,
                name: 'default',
            },
            {
                type: 'upload',
                value: '',
                name: 'image',
            },
            {
                type: 'Input',
                value: '',
                name: 'itemName',
            },
            {
                type: 'Input',
                value: '',
                name: 'price',
                prefix: '$',
            },
            {
                type: 'Switch',
                value: true,
                name: 'stock',
            },
            {
                type: 'Switch',
                value: false,
                name: 'subcategory',
            },
        ],
    },
];

export const GROUPS = [
    {
        id: uuidv4(),
        name: 'Group Details',
        fields: [
            {
                type: 'Input',
                label: 'Group name 2',
                value: 'Toast it',
                name: 'groupName',
            },
            {
                type: 'Select',
                label: 'Item Choice',
                value: '1',
                name: 'itemChoice',
                options: [
                    {
                        label: 'Multiple items',
                        value: '1',
                    },
                    {
                        label: 'Multiple items 2',
                        value: '2',
                    },
                ],
            },
            {
                type: 'Switch',
                label: 'Show images',
                value: false,
                name: 'switch1',
            },
            {
                type: 'Switch',
                label: 'Visible if other items selected',
                value: true,
                name: 'switch2',
            },
            {
                type: 'Select',
                value: 'and',
                name: 'select1',
                options: [
                    {
                        label: 'And',
                        value: 'and',
                    },
                ],
            },
            {
                type: 'Select',
                value: '1',
                name: 'select2',
                options: [
                    {
                        label: 'Bread/Rye',
                        value: '1',
                    },
                ],
            },
        ],
        items: [
            {
                id: uuidv4(),
                fields: [
                    {
                        type: 'Checkbox',
                        value: true,
                        name: 'default',
                    },
                    {
                        type: 'upload',
                        value: 'data:image/png;base64,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',
                        name: 'image',
                    },
                    {
                        type: 'Input',
                        value: '',
                        name: 'itemName',
                    },
                    {
                        type: 'Input',
                        value: '1.5',
                        name: 'price',
                        prefix: '$',
                    },
                    {
                        type: 'Switch',
                        value: true,
                        name: 'stock',
                    },
                    {
                        type: 'Switch',
                        value: false,
                        name: 'subcategory',
                    },
                ],
            },
            {
                id: uuidv4(),
                fields: [
                    {
                        type: 'Checkbox',
                        value: false,
                        name: 'default',
                    },
                    {
                        type: 'upload',
                        value: '',
                        name: 'image',
                    },
                    {
                        type: 'Input',
                        value: '',
                        name: 'itemName',
                    },
                    {
                        type: 'Input',
                        value: '1.5',
                        name: 'price',
                        prefix: '$',
                    },
                    {
                        type: 'Switch',
                        value: true,
                        name: 'stock',
                    },
                    {
                        type: 'Switch',
                        value: false,
                        name: 'subcategory',
                    },
                ],
            },

            {
                id: uuidv4(),
                fields: [
                    {
                        type: 'Checkbox',
                        value: false,
                        name: 'default',
                    },
                    {
                        type: 'upload',
                        value: '',
                        name: 'image',
                    },
                    {
                        type: 'Input',
                        value: '',
                        name: 'itemName',
                    },
                    {
                        type: 'Input',
                        value: '1.5',
                        name: 'price',
                        prefix: '$',
                    },
                    {
                        type: 'Switch',
                        value: true,
                        name: 'stock',
                    },
                    {
                        type: 'Switch',
                        value: false,
                        name: 'subcategory',
                    },
                ],
            },
        ],
    },
    {
        id: uuidv4(),
        name: 'Group Details 2',
        fields: [
            {
                type: 'Input',
                label: 'Group name 2',
                value: 'Toast it',
                name: 'groupName',
            },
            {
                type: 'Select',
                label: 'Item Choice',
                value: '2',
                name: 'itemChoice',
                options: [
                    {
                        label: 'Multiple items',
                        value: '1',
                    },
                    {
                        label: 'Multiple items 2',
                        value: '2',
                    },
                ],
            },
            {
                type: 'Switch',
                label: 'Show images',
                value: false,
                name: 'switch1',
            },
            {
                type: 'Switch',
                label: 'Visible if other items selected',
                value: false,
                name: 'switch2',
            },
            {
                type: 'Select',
                value: 'and',
                name: 'select1',
                options: [
                    {
                        label: 'And',
                        value: 'and',
                    },
                ],
            },
            {
                type: 'Select',
                value: '1',
                name: 'select2',
                options: [
                    {
                        label: 'Bread/Rye',
                        value: '1',
                    },
                ],
            },
        ],
        items: [
            {
                id: uuidv4(),
                fields: [
                    {
                        type: 'Checkbox',
                        value: true,
                        name: 'default',
                    },
                    {
                        type: 'upload',
                        value: 'data:image/png;base64,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',
                        name: 'image',
                    },
                    {
                        type: 'Input',
                        value: '',
                        name: 'itemName',
                    },
                    {
                        type: 'Input',
                        value: '1.5',
                        name: 'price',
                        prefix: '$',
                    },
                    {
                        type: 'Switch',
                        value: true,
                        name: 'stock',
                    },
                    {
                        type: 'Switch',
                        value: false,
                        name: 'subcategory',
                    },
                ],
            },
            {
                id: uuidv4(),
                fields: [
                    {
                        type: 'Checkbox',
                        value: false,
                        name: 'default',
                    },
                    {
                        type: 'upload',
                        value: '',
                        name: 'image',
                    },
                    {
                        type: 'Input',
                        value: '',
                        name: 'itemName',
                    },
                    {
                        type: 'Input',
                        value: '1.5',
                        name: 'price',
                        prefix: '$',
                    },
                    {
                        type: 'Switch',
                        value: true,
                        name: 'stock',
                    },
                    {
                        type: 'Switch',
                        value: false,
                        name: 'subcategory',
                    },
                ],
            },
            {
                id: uuidv4(),
                fields: [
                    {
                        type: 'Checkbox',
                        value: false,
                        name: 'default',
                    },
                    {
                        type: 'upload',
                        value: 'data:image/png;base64,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',
                        name: 'image',
                    },
                    {
                        type: 'Input',
                        value: '',
                        name: 'itemName',
                    },
                    {
                        type: 'Input',
                        value: '1.5',
                        name: 'price',
                        prefix: '$',
                    },
                    {
                        type: 'Switch',
                        value: true,
                        name: 'stock',
                    },
                    {
                        type: 'Switch',
                        value: false,
                        name: 'subcategory',
                    },
                ],
            },
        ],
    },
];
