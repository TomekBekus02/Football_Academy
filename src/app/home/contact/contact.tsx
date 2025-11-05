import styles from "./contact.module.css";
import mainStyles from "../main-page.module.css";
export default function Contact() {
    return (
        <div>
            <h2 className={mainStyles.title}>Kontakt</h2>
            <div className={styles.contactSection}>
                <div className={styles.infoContainer}>
                    <h1>
                        <strong>Adres:</strong>
                    </h1>
                    <h3>ul. Sportowa 12, 00-123 Warszawa</h3>
                    <h1>
                        <strong>Godziny otwarcia:</strong>
                    </h1>
                    <div className={styles.hours}>
                        <h3>Poniedziałek: 10:00 - 13:00</h3>
                        <h3>Wtorek: 9:00 - 15:00</h3>
                        <h3>Środa: 10:00 - 18:00</h3>
                        <h3>Czwartek: 10:00 - 18:00</h3>
                        <h3>Piątek: 15:00 - 20:00</h3>
                        <h3>Sobota: 9:00 - 12:00</h3>
                        <h3>Niedziela: nieczynne</h3>
                    </div>

                    <h1>
                        <strong>E-mail:</strong>
                    </h1>
                    <h3>kontakt@akademiapilkarska.pl</h3>
                    <h1>
                        <strong>Telefon:</strong>
                    </h1>
                    <h3>+48 600 123 456</h3>
                </div>

                <div className={styles.mapContainer}>
                    <iframe
                        title="Mapa lokalizacji"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.11223000324!2d21.012228!3d52.229676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc66945e33fb%3A0x2e97b1eae0b9b7b3!2sWarszawa!5e0!3m2!1spl!2spl!4v1690200000000"
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
