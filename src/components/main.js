import React, { useState, useCallback } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Button } from 'antd';
import update from 'immutability-helper';
import { getNewGroupe, GROUPS } from '../utils';
import Groupe from './group';

const Main = () => {
    const [groups, setGroups] = useState(GROUPS);
    const moveGroup = useCallback(
        (dragIndex, hoverIndex) => {
            const dragGroup = groups[dragIndex];
            setGroups(
                update(groups, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragGroup],
                    ],
                }),
            );
        },
        [groups],
    );

    const handleAddNewGroupe = () => {
        setGroups(
            update(groups, {
                $push: getNewGroupe(),
            }),
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            {groups.map((item, idx) => (
                <Groupe
                    key={item.id}
                    index={idx}
                    id={item.id}
                    group={item}
                    setGroups={setGroups}
                    moveGroup={moveGroup}
                />
            ))}
            <div className="add-new-groupe">
                <Button
                    type="primary"
                    onClick={handleAddNewGroupe}
                >
                    New Group
                </Button>
            </div>
        </DndProvider>
    );
};

export default Main;
