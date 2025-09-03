export const YellowCard = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-label="Żółta kartka"
        role="img"
        {...props}
    >
        <rect
            x="6"
            y="2"
            width="12"
            height="20"
            rx="2"
            fill="#FACC15"
            stroke="#EAB308"
            stroke-width="1.5"
        />
    </svg>
);

export const RedCard = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-label="Czerwona kartka"
        role="img"
        {...props}
    >
        <rect
            x="6"
            y="2"
            width="12"
            height="20"
            rx="2"
            fill="#EF4444"
            stroke="#DC2626"
            stroke-width="1.5"
        />
    </svg>
);

export const RedYellowCard = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-label="Czerwono-żółta kartka"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <linearGradient
                id="redYellowDiagonal"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
            >
                <stop offset="0%" stop-color="#EF4444" />
                <stop offset="50%" stop-color="#EF4444" />
                <stop offset="50%" stop-color="#FACC15" />
                <stop offset="100%" stop-color="#FACC15" />
            </linearGradient>
        </defs>

        <rect
            x="6"
            y="2"
            width="12"
            height="20"
            rx="2"
            fill="url(#redYellowDiagonal)"
        />
    </svg>
);
