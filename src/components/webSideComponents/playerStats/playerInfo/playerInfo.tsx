import { IPlayerDetails } from "@/types/IPlayer";
import Image from "next/image";
import { Shirt } from "lucide-react";
import { RedCard, YellowCard } from "@/components/icons/matchIcons";
import { statIcons } from "@/components/icons/matchIcons";

export default function PlayerInfo({ player }: { player: IPlayerDetails }) {
    return (
        <div>
            <div>
                <Image
                    src={player.photo}
                    alt={player.name}
                    width={150}
                    height={200}
                    className="imageStyle"
                />
                <div>
                    <div>
                        <h4 className="toolTip">
                            <span className="toolTipText">Rozegrane mecze</span>
                            {statIcons.appearance}: {player.appearances}
                        </h4>
                        <h4 className="toolTip">
                            {statIcons.goal}: {player.goals}
                            <span className="toolTipText">Bramki</span>
                        </h4>
                        <h4 className="toolTip">
                            {statIcons.assist}: {player.assists}
                            <span className="toolTipText">Asysty</span>
                        </h4>
                    </div>
                    <div>
                        <h4 className="toolTip">
                            {statIcons.cleanSheet}: {player.cleanSheet}
                            <span className="toolTipText">Czyste konta</span>
                        </h4>
                        <h4 className="toolTip">
                            <YellowCard /> {player.yellowCards}
                            <span className="toolTipText">Żółte kartki</span>
                        </h4>
                        <h4 className="toolTip">
                            <RedCard /> {player.redCards}
                            <span className="toolTipText">Czerwone Kartki</span>
                        </h4>
                    </div>
                </div>
            </div>
            <div>
                <h4>Imie: {player.name}</h4>
                <h4>Data Ur. : {player.dateBirth}</h4>
                <h4>Pozycja: {player.position}</h4>
                <h4>
                    {statIcons.number}: {player.shirtNumber}
                </h4>
            </div>
        </div>
    );
}
