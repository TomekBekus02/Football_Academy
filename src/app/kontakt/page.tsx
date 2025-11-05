import Image from "next/image";
import styles from "./page.module.css";

export default function ContactPage() {
    return (
        <div className={styles.container}>
            <div className={styles.contactFormPage}>
                <div className={styles.formContainer}>
                    <h1>Formularz kontaktowy</h1>
                    <p>
                        Wypełnij dane zawodnika, a skontaktujemy się z Tobą w
                        sprawie treningów.
                    </p>

                    <form className={styles.form}>
                        <label>
                            Imię i nazwisko zawodnika:
                            <input
                                type="text"
                                name="name"
                                placeholder="Jan Kowalski"
                                required
                            />
                        </label>

                        <label>
                            Data urodzenia:
                            <input
                                type="number"
                                name="year"
                                placeholder="RRRR-MM-DD"
                                required
                            />
                        </label>

                        <label>
                            Preferowana pozycja
                            <select name="position">
                                <option value="Bramkarz">Bramkarz</option>
                                <option value="Obrońca">Obrońca</option>
                                <option value="Pomocnik">Pomocnik</option>
                                <option value="Napastnik">Napastnik</option>
                            </select>
                        </label>

                        <label>
                            Numer telefonu rodzica:
                            <input
                                type="tel"
                                name="phone"
                                placeholder="+48 600 000 000"
                                required
                            />
                        </label>

                        <label>
                            Adres e-mail:
                            <input
                                type="email"
                                name="email"
                                placeholder="rodzic@mail.com"
                                required
                            />
                        </label>

                        <label>
                            Wiadomość:
                            <textarea
                                name="message"
                                rows={4}
                                placeholder="Napisz wiadomość..."
                            />
                        </label>

                        <button type="submit" className={styles.submitButton}>
                            Wyślij
                        </button>
                    </form>
                </div>

                <div className={styles.imageContainer}>
                    <Image
                        src="/concact_page_photo.jpg"
                        alt="Trening piłkarski"
                        width={1000}
                        height={8000}
                    />
                </div>
            </div>
        </div>
    );
}
