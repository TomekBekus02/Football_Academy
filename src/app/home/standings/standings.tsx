import { Swords, CircleX, Trophy, Handshake, Volleyball, Hand, Footprints, Diff } from 'lucide-react';
import classes from './standings.module.css'
import Card from './card/card';

export default function standings() {
    return (
        <div className={classes.standingsBox}>
            <h1>Statystyki Klubu</h1>
            <div className={classes.cardsBox}>
                <Card title='Mecze' icon={Swords} values={22}/>
                <Card title='Zwycięstwa' icon={Trophy} values={12}/>
                <Card title='Remisy' icon={Handshake} values={6}/>
                <Card title='Porażki' icon={CircleX} values={4}/>

                <Card title='Bramki' icon={Volleyball} values={70}/>
                <Card title='Asysty' icon={Footprints} values={55}/>
                <Card title='Czyste Konta' icon={Hand} values={7}/>
                <Card title='Bilans Bramek' icon={Diff} values={50}/>
            </div>
        </div>
    )
}