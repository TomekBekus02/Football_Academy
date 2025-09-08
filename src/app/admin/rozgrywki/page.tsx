import Link from "next/link";
import Competitions from "@/app/admin/rozgrywki/competitions/Competitions";

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
                <Competitions isOnGoing={true} />
            </div>
            <div>
                <h1>Zakończone Rozgrywki</h1>
                <Competitions isOnGoing={false} />
            </div>
        </div>
    );
}
