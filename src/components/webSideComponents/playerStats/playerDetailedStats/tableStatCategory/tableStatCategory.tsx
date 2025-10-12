import styles from "./tableStatCategory.module.css";

type tableStatCategoryType = {
    categories: {
        shortName: string;
        extName: string;
        value: number;
    }[];
    captionText: string;
    position: "off" | "mid" | "def" | "gk";
};

export default function TableStatCategory({
    categories,
    captionText,
    position,
}: tableStatCategoryType) {
    return (
        <table className={`${styles.table} ${styles[position]}`}>
            <caption className={styles.caption}>{captionText}</caption>
            <thead>
                <tr>
                    {categories.map((category, index) => (
                        <th className={styles.toolTip} key={index}>
                            {category.shortName}
                            <span className={styles.toolTipText}>
                                {category.extName}
                            </span>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {categories.map((category, index) => (
                        <td key={index} className={styles.cell}>
                            {category.value}
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
}
