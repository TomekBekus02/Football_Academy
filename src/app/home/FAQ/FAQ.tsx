"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import faqs from "@/data/FAQ";
import styles from "./FAQ.module.css";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number | null) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Najczęściej zadawane pytania (FAQ)</h2>

            <div className={styles.accordion}>
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`${styles.item} ${
                            openIndex === index ? styles.active : ""
                        }`}
                    >
                        <button
                            className={styles.question}
                            onClick={() => toggle(index)}
                            aria-expanded={openIndex === index}
                        >
                            <span>{faq.question}</span>
                            <ChevronDown
                                className={`${styles.icon} ${
                                    openIndex === index ? styles.rotate : ""
                                }`}
                            />
                        </button>
                        <div
                            className={`${styles.answerWrapper} ${
                                openIndex === index ? styles.open : ""
                            }`}
                        >
                            <p className={styles.answer}>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
