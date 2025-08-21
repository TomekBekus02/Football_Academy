import Link from "next/link";

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
                <div>
                    <div>
                        <h1></h1>
                        <p></p>
                    </div>
                    <div></div>
                </div>
            </div>
            <div>
                <h1>Zakończone Rozgrywki</h1>
            </div>
        </div>
    );
}
