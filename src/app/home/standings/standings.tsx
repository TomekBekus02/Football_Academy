import { Swords, CircleX, Trophy, Handshake, Volleyball, Hand, Footprints, Diff } from 'lucide-react';
import classes from './standings.module.css'
import Card from './card/card';
import { statIcons } from "@/components/icons/matchIcons";

export default function standings() {
    return (
        <div className={classes.standingsBox}>
            <h1>Statystyki Klubu</h1>
            <div className={classes.cardsBox}>
                <Card title="Mecze" icon={statIcons.match} values={22} />
                <Card title="Zwycięstwa" icon={statIcons.win} values={12} />
                <Card title="Remisy" icon={statIcons.draw} values={6} />
                <Card title="Porażki" icon={statIcons.lose} values={4} />

                <Card title="Bramki" icon={statIcons.goal} values={70} />
                <Card title="Asysty" icon={statIcons.assist} values={55} />
                <Card title="Zdobyte" icon={statIcons.goalsFor} values={7} />
                <Card
                    title="Stracone"
                    icon={statIcons.goalsAgainst}
                    values={50}
                />
            </div>
        </div>
    );
}