"use client";

import React, { useState } from "react";
import styles from "./trainings.module.css";
import trainings from "@/data/trainings";
import mainStyles from "../main-page.module.css";

export default function Trainings() {
    const [index, setIndex] = useState(0);

    const prev = () => {
        setIndex((prev) => (prev === 0 ? trainings.length - 1 : prev - 1));
    };

    const next = () => {
        setIndex((prev) => (prev === trainings.length - 1 ? 0 : prev + 1));
    };

    return (
        <div>
            <h1 className={mainStyles.title}>Plan Treningów</h1>
            <div className={styles.carouselContainer}>
                <button onClick={prev} className={styles.navButton}>
                    ❮
                </button>

                <div className={styles.carousel}>
                    {trainings.slice(index, index + 3).map((training) => (
                        <div key={training.id} className={styles.card}>
                            <img
                                src={training.image}
                                alt={training.year}
                                className={styles.image}
                            />
                            <div className={styles.infoOverlay}>
                                <h3>{training.year}</h3>
                                <div className={styles.schedule}>
                                    {Object.entries(training.schedule).map(
                                        ([day, time]) => (
                                            <p key={day}>
                                                <strong>{day}:</strong> {time}
                                            </p>
                                        )
                                    )}
                                </div>
                                <p className={styles.place}>{training.place}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <button onClick={next} className={styles.navButton}>
                    ❯
                </button>
            </div>
        </div>
    );
}
