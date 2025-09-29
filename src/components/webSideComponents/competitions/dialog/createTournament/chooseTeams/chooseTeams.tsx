"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";
import { ITournamentTeam } from "@/types/ITeam";
import Image from "next/image";
import TeamsLayout from "./chooseTeams.module.css";

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

        // Jeśli upuszczono poza listę, nic nie robimy
        if (!destination) return;

        // Sprawdzamy, czy element zmienił listę
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
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            {/* Dostępne drużyny */}
            <div>
                <h2 className="mb-4 font-bold">Dostępne drużyny</h2>
                <Droppable droppableId="available">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={TeamsLayout.teamBox}
                        >
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
                                            className={TeamsLayout.teamItem}
                                        >
                                            <Image
                                                src={team.logo}
                                                alt={team.name}
                                                width={60}
                                                height={50}
                                                className="imageStyle"
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
            </div>

            {/* Wybrane drużyny */}
            <div>
                <h2 className="mb-4 font-bold">
                    Wybrane drużyny{" "}
                    <span>
                        {currentTeamsSize}/{teamLimits}
                    </span>
                </h2>
                <Droppable droppableId="selected">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={TeamsLayout.teamBox}
                        >
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
                                            className={TeamsLayout.teamItem}
                                        >
                                            <Image
                                                src={team.logo}
                                                alt={team.name}
                                                width={60}
                                                height={50}
                                                className="imageStyle"
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
            </div>
        </DragDropContext>
    );
}
