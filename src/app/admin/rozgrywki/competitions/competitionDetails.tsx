type competitionDetailsType = {
    label: string;
    text: string;
};
export default function competitionDetails({
    label,
    text,
}: competitionDetailsType) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                margin: "5px",
            }}
        >
            <h3>{label}</h3>
            <h4>{text}</h4>
        </div>
    );
}
