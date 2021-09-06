import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Button } from 'antd';
import update from 'immutability-helper';
import InputField from './InputField';
import { DND_TYPES, getNewGroupItem } from '../utils';

function GroupItem({ id, index, moveItem, data, groupId, handleChange }) {
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: DND_TYPES.groupItems + groupId,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag, dragPreview] = useDrag({
        type: DND_TYPES.groupItems + groupId,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <tr ref={dragPreview}>
            <th ref={ref} data-handler-id={handlerId}>
                <div className="groupe-drag-icon">
                    <span />
                    <span />
                    <span />
                </div>
            </th>
            {Array.isArray(data.fields)
                ? data.fields.map((item, idx) => (
                      <th key={idx}>
                          <InputField
                              item={item}
                              onChange={(name, value) =>
                                  handleChange(name, value, idx)
                              }
                          />
                      </th>
                  ))
                : ''}
        </tr>
    );
}

export default function GroupItems({ data, setGroups, groupIndex, groupId }) {
    const moveItem = (dragIndex, hoverIndex) => {
        const dragItem = data[dragIndex];
        setGroups((prevGroups) =>
            update(prevGroups, {
                [groupIndex]: {
                    items: {
                        $splice: [
                            [dragIndex, 1],
                            [hoverIndex, 0, dragItem],
                        ],
                    },
                },
            }),
        );
    };

    const handleChange = (index) => (name, value, idx) => {
        setGroups((prevGroups) =>
            update(prevGroups, {
                [groupIndex]: {
                    items: {
                        [index]: {
                            fields: {
                                [idx]: {
                                    $apply: (obj) => ({ ...obj, value }),
                                },
                            },
                        },
                    },
                },
            }),
        );
    };

    const handleAddItem = () => {
        setGroups((prevGroups) =>
            update(prevGroups, {
                [groupIndex]: {
                    items: { $push: getNewGroupItem() },
                },
            }),
        );
    };

    return (
        <div className="groupe-items">
            <div className="groupe-items-name">Group item</div>
            <table className="groupe-items-list">
                <thead>
                    <tr className="groupe-items-list-header">
                        <th></th>
                        <th>Default</th>
                        <th>Item image</th>
                        <th>Item name</th>
                        <th>Additional price (opt)</th>
                        <th>In stock</th>
                        <th>Subcategory (o</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data)
                        ? data.map((item, index) => {
                              return (
                                  <GroupItem
                                      key={item.id}
                                      index={index}
                                      id={item.id}
                                      data={item}
                                      handleChange={handleChange(index)}
                                      moveItem={moveItem}
                                      groupId={groupId}
                                  />
                              );
                          })
                        : ''}
                </tbody>
            </table>
            <Button type="link" block onClick={handleAddItem}>
                Add New Item
            </Button>
        </div>
    );
}
