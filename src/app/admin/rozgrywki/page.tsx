import Link from "next/link";
import OnGoingCompetitions from "@/components/competitions/onGoingCompetitions/onGoingCompetitions";

export default function tournaments() {
    return (
        <div>
            <button>
                <Link href={`/admin/rozgrywki/stworz-nowe-rozgrywki`}>
                    Stwórz nowe wydarzenie
                </Link>
            </button>
            <div>
                <h1>Trwające Rozgrywki</h1>
                <OnGoingCompetitions />
            </div>
            <div>
                <h1>Zakończone Rozgrywki</h1>
            </div>
        </div>
    );
}
