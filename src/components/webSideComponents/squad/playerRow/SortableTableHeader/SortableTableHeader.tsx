import { IPlayer } from "@/types/IPlayer";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import headerLayout from "./sortableTableHeader.module.css";
import { columns } from "@/data/columnPlayersHeader";

type TableHeadersProps = {
    setPlayersData: React.Dispatch<React.SetStateAction<IPlayer[]>>;
};
export default function SortableTableHeader({
    setPlayersData,
}: TableHeadersProps) {
    const [sortDirection, setSortDirection] = useState({
        name: "",
        sortOrder: true, //true - descending / false - ascending
    });
    const sortPlayersData = (fieldName: keyof IPlayer) => {
        let newSortOrder = true;
        if (fieldName === sortDirection.name) {
            newSortOrder = !sortDirection.sortOrder;
            setSortDirection((prev) => ({
                ...prev,
                sortOrder: !prev.sortOrder,
            }));
        } else {
            setSortDirection({
                name: fieldName,
                sortOrder: newSortOrder,
            });
        }
        setPlayersData((prev) =>
            [...prev].sort((a, b) => {
                const valA = a[fieldName];
                const valB = b[fieldName];

                if (typeof valA === "number" && typeof valB === "number") {
                    return newSortOrder ? valB - valA : valA - valB;
                }

                return newSortOrder
                    ? String(valB).localeCompare(String(valA))
                    : String(valA).localeCompare(String(valB));
            })
        );
    };

    return (
        <>
            {columns.map((col, index) => (
                <th
                    key={index}
                    scope="col"
                    style={{ cursor: "pointer" }}
                    onClick={() => sortPlayersData(col.fieldName)}
                >
                    {col.label}
                    {sortDirection.name === col.fieldName && (
                        <span>
                            <ChevronDown
                                className={`${
                                    sortDirection.sortOrder
                                        ? `${headerLayout.iconRotateAsc}`
                                        : `${headerLayout.iconRotateDesc}`
                                }`}
                            />
                        </span>
                    )}
                </th>
            ))}
        </>
    );
}
