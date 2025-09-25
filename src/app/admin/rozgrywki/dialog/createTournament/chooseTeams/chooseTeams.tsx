"use client";

import { Dispatch, SetStateAction } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";
import { ITournamentTeam } from "@/types/ITeam";
import Image from "next/image";

type chooseTeamsParams = {
    availableTeams: ITournamentTeam[];
    setAvailableTeams: Dispatch<SetStateAction<ITournamentTeam[]>>;
    selectedTeams: ITournamentTeam[];
    setSelectedTeams: Dispatch<SetStateAction<ITournamentTeam[]>>;
    teamLimits: number;
    currentTeamsSize: number;
};
export default function ChooseTeams({
    availableTeams,
    setAvailableTeams,
    selectedTeams,
    setSelectedTeams,
    teamLimits,
    currentTeamsSize,
}: chooseTeamsParams) {
    const handleDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        // upuszczone poza listę
        if (!destination) return;

        // przeciągamy między różnymi listami
        if (source.droppableId !== destination.droppableId) {
            const sourceList =
                source.droppableId === "available"
                    ? Array.from(availableTeams)
                    : Array.from(selectedTeams);

            const destList =
                destination.droppableId === "available"
                    ? Array.from(availableTeams)
                    : Array.from(selectedTeams);

            const [moved] = sourceList.splice(source.index, 1);
            destList.splice(destination.index, 0, moved);

            if (source.droppableId === "available") {
                setAvailableTeams(sourceList);
                setSelectedTeams(destList);
            } else {
                setSelectedTeams(sourceList);
                setAvailableTeams(destList);
            }
        } else {
            // przeciąganie w tej samej liście (zmiana kolejności)
            if (source.droppableId === "available") {
                const newAvailable = Array.from(availableTeams);
                const [moved] = newAvailable.splice(source.index, 1);
                newAvailable.splice(destination.index, 0, moved);
                setAvailableTeams(newAvailable);
            } else {
                const newSelected = Array.from(selectedTeams);
                const [moved] = newSelected.splice(source.index, 1);
                newSelected.splice(destination.index, 0, moved);
                setSelectedTeams(newSelected);
            }
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            {/* Dostępne drużyny */}
            <h2 className="mb-4 font-bold">Dostępne drużyny</h2>
            <Droppable droppableId="available">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {availableTeams.map((team, index) => (
                            <Draggable
                                key={team._id}
                                draggableId={team._id}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <Image
                                            src={team.logo}
                                            alt={team.name}
                                            width={50}
                                            height={45}
                                        />
                                        <p>{team.name}</p>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            {/* Wybrane drużyny */}
            <h1>
                {currentTeamsSize}/{teamLimits}
            </h1>
            <h2 className="mb-4 font-bold">Wybrane drużyny</h2>
            <Droppable droppableId="selected">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {selectedTeams.map((team, index) => (
                            <Draggable
                                key={team._id}
                                draggableId={team._id}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <Image
                                            src={team.logo}
                                            alt={team.name}
                                            width={50}
                                            height={45}
                                        />
                                        <p>{team.name}</p>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
