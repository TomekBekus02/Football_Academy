"use Client";

import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { fetchTeamSquad } from "@/services/PlayersFetches/usePlayers";
import { IPlayer, IStatPlayer } from "@/types/IPlayer";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import carouselLayout from "./playersCarousel.module.css";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function PlayersCarousel({ teamId }: { teamId: string }) {
    const { data, error, isLoading } = useQuery<IPlayer[], Error>({
        queryKey: ["players", teamId],
        queryFn: ({ queryKey }) => {
            const [, teamId] = queryKey;
            return fetchTeamSquad(teamId as string);
        },
    });

    function translateCategoryName(category: string): string {
        switch (category) {
            case "goals":
                return "Bramki";
            case "assists":
                return "Asysty";
            case "cleanSheet":
                return "Czyste konta";
            case "yellowCards":
                return "Żółte kartki";
            case "redCards":
                return "Czerw. kartki";
            default:
                return "";
        }
    }

    function getBestCategoryPlayer(
        category: keyof IPlayer,
        players: IPlayer[]
    ): IStatPlayer {
        const bestPlayer = players.reduce((top, player) => {
            return (player[category] as number) > (top[category] as number)
                ? player
                : top;
        });

        return {
            _id: bestPlayer._id as string,
            name: bestPlayer.name,
            photo: bestPlayer.photo,
            statCategory: translateCategoryName(category),
            statNumber: bestPlayer[category] as number,
        };
    }

    const [bestPlayers, setBestPlayers] = useState<IStatPlayer[]>([]);

    useEffect(() => {
        if (data) {
            const categories: (keyof IPlayer)[] = [
                "goals",
                "assists",
                "cleanSheet",
                "yellowCards",
                "redCards",
            ];

            const newBestPlayers = categories.map((cat) =>
                getBestCategoryPlayer(cat, data)
            );

            setBestPlayers(newBestPlayers);
        }
    }, [data]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % bestPlayers.length);
    };

    const prev = () => {
        setCurrentIndex(
            (prev) => (prev - 1 + bestPlayers.length) % bestPlayers.length
        );
    };

    return (
        <LoadProvider isLoading={isLoading} error={error}>
            {bestPlayers.length > 0 && (
                <div>
                    <h2 className={carouselLayout.header}>Najlepsi piłkarze</h2>
                    <div className={carouselLayout.carouselBox}>
                        <button onClick={prev}>
                            <ArrowLeft />
                        </button>
                        <div className={carouselLayout.carousel}>
                            <div
                                className={carouselLayout.carouselTrack}
                                style={{
                                    transform: `translateX(-${
                                        currentIndex * 260
                                    }px)`,
                                }}
                            >
                                {bestPlayers.map((player: IStatPlayer, idx) => (
                                    <div
                                        key={idx}
                                        className={carouselLayout.carouselItem}
                                    >
                                        <div
                                            className={carouselLayout.imageBox}
                                        >
                                            <div
                                                className={
                                                    carouselLayout.playerNameBox
                                                }
                                            >
                                                <p>{player.name}</p>
                                            </div>
                                            <Image
                                                src={player.photo}
                                                alt={player.name}
                                                width={170}
                                                height={190}
                                            />
                                            <div
                                                className={
                                                    carouselLayout.playerStat
                                                }
                                            >
                                                <p>
                                                    {player.statCategory} :{" "}
                                                    {player.statNumber}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button onClick={next}>
                            <ArrowRight />
                        </button>
                    </div>
                </div>
            )}
        </LoadProvider>
    );
}
