import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import GroupFields from './groupFields';
import GroupItems from './groupItems';
import { DND_TYPES } from '../utils';

const Groupe = ({ id, index, group, setGroups, moveGroup }) => {
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: DND_TYPES.group,
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
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveGroup(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag, dragPreview] = useDrag({
        type: DND_TYPES.group,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div ref={dragPreview} className="groupe-content">
            <div className="groupe-content-block">
                <div className="left-block" ref={ref}>
                    <div
                        className="groupe-drag-icon"
                        data-handler-id={handlerId}
                    >
                        <span />
                        <span />
                        <span />
                    </div>
                </div>

                <div className="center-block">
                    <div className="groupe-name">
                        {group.name}
                        <div>
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.149 6.475L8.519 7.119C8.015 7.623 7.7 8.05 7.7 9.1H6.3V8.75C6.3 7.973 6.615 7.273 7.119 6.769L7.987 5.887C8.246 5.635 8.4 5.285 8.4 4.9C8.4 4.123 7.77 3.5 7 3.5C6.6287 3.5 6.2726 3.6475 6.01005 3.91005C5.7475 4.1726 5.6 4.5287 5.6 4.9H4.2C4.2 4.15739 4.495 3.4452 5.0201 2.9201C5.5452 2.395 6.25739 2.1 7 2.1C7.74261 2.1 8.4548 2.395 8.9799 2.9201C9.505 3.4452 9.8 4.15739 9.8 4.9C9.8 5.516 9.548 6.069 9.149 6.475ZM7.7 11.9H6.3V10.5H7.7V11.9ZM7 0C6.08075 0 5.17049 0.18106 4.32122 0.532843C3.47194 0.884626 2.70026 1.40024 2.05025 2.05025C0.737498 3.36301 0 5.14348 0 7C0 8.85652 0.737498 10.637 2.05025 11.9497C2.70026 12.5998 3.47194 13.1154 4.32122 13.4672C5.17049 13.8189 6.08075 14 7 14C8.85652 14 10.637 13.2625 11.9497 11.9497C13.2625 10.637 14 8.85652 14 7C14 3.129 10.85 0 7 0Z"
                                    fill="#CCCCCC"
                                />
                            </svg>
                        </div>
                    </div>

                    <GroupFields
                        data={group.fields}
                        setGroups={setGroups}
                        groupIndex={index}
                    />
                </div>
                <div className="rigth-block">
                    <div className="groupe-delete-icon">
                        <svg
                            width="16"
                            height="20"
                            viewBox="0 0 16 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.04447 8.54272C5.87792 8.54916 5.71963 8.63248 5.6018 8.77574C5.48397 8.919 5.41545 9.11145 5.41016 9.31396V14.1727C5.41016 14.3773 5.47699 14.5734 5.59594 14.7181C5.7149 14.8627 5.87624 14.944 6.04447 14.944C6.12857 14.9475 6.21237 14.93 6.29066 14.8926C6.36896 14.8551 6.44007 14.7984 6.49957 14.7261C6.55907 14.6537 6.60569 14.5672 6.63652 14.4721C6.66735 14.3769 6.68174 14.275 6.67879 14.1727V9.31396C6.67879 9.10941 6.61196 8.91325 6.493 8.76861C6.37404 8.62398 6.2127 8.54272 6.04447 8.54272Z"
                                fill="#696969"
                            />
                            <path
                                d="M9.84954 8.54272C9.68131 8.54272 9.51997 8.62398 9.40101 8.76861C9.28205 8.91325 9.21522 9.10941 9.21522 9.31396V14.1727C9.21227 14.275 9.22666 14.3769 9.25749 14.4721C9.28832 14.5672 9.33494 14.6537 9.39444 14.7261C9.45394 14.7984 9.52505 14.8551 9.60334 14.8926C9.68164 14.93 9.76544 14.9475 9.84954 14.944C10.0178 14.944 10.1791 14.8627 10.2981 14.7181C10.417 14.5734 10.4839 14.3773 10.4839 14.1727V9.31396C10.4786 9.11145 10.41 8.919 10.2922 8.77574C10.1744 8.63248 10.0161 8.54916 9.84954 8.54272Z"
                                fill="#696969"
                            />
                            <path
                                d="M15.2767 3.54767H12.0721V2.05662C12.0721 1.51117 11.869 0.988061 11.5075 0.60237C11.146 0.216679 10.6557 0 10.1445 0H5.85554C5.3443 0 4.85401 0.216679 4.49251 0.60237C4.13102 0.988061 3.92793 1.51117 3.92793 2.05662V3.54767H0.723283C0.531571 3.54767 0.347711 3.62892 0.212149 3.77356C0.0765882 3.91819 0.000430573 4.11436 0.000430573 4.3189C-0.00293513 4.42115 0.01346 4.52304 0.0485957 4.61823C0.0837313 4.71343 0.136856 4.79989 0.204661 4.87223C0.272467 4.94458 0.353504 5.00126 0.442727 5.03874C0.53195 5.07623 0.62745 5.09372 0.723283 5.09013H1.20518V17.6863C1.20518 18.2999 1.43366 18.8884 1.84034 19.3223C2.24702 19.7562 2.79861 20 3.37374 20H12.6263C13.2014 20 13.753 19.7562 14.1597 19.3223C14.5663 18.8884 14.7948 18.2999 14.7948 17.6863V5.09013H15.2767C15.3726 5.09372 15.4681 5.07623 15.5573 5.03874C15.6465 5.00126 15.7275 4.94458 15.7953 4.87223C15.8631 4.79989 15.9163 4.71343 15.9514 4.61823C15.9865 4.52304 16.0029 4.42115 15.9996 4.3189C15.9996 4.11436 15.9234 3.91819 15.7879 3.77356C15.6523 3.62892 15.4684 3.54767 15.2767 3.54767ZM5.37364 2.05662C5.37364 1.92026 5.42441 1.78948 5.51478 1.69306C5.60516 1.59663 5.72773 1.54246 5.85554 1.54246H10.1445C10.2723 1.54246 10.3948 1.59663 10.4852 1.69306C10.5756 1.78948 10.6264 1.92026 10.6264 2.05662V3.54767H5.37364V2.05662ZM13.3491 17.6863C13.3491 17.8908 13.273 18.087 13.1374 18.2316C13.0018 18.3763 12.818 18.4575 12.6263 18.4575H3.37374C3.18203 18.4575 2.99817 18.3763 2.86261 18.2316C2.72705 18.087 2.65089 17.8908 2.65089 17.6863V5.09013H13.3491V17.6863Z"
                                fill="#696969"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <GroupItems
                data={group.items}
                setGroups={setGroups}
                groupIndex={index}
                groupId={group.id}
            />
        </div>
    );
};

export default Groupe;
