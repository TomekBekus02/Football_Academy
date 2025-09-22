import teamLayout from "./teamLayout.module.css";

export default function TeamLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={teamLayout.teamPage}>
            <aside>Sidebar tylko dla drużyny</aside>
            <main>{children}</main>
        </div>
    );
}
