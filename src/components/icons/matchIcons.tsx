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
            strokeWidth="1.5"
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
            strokeWidth="1.5"
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
        {...props}
    >
        <defs>
            <linearGradient
                id="redYellowDiagonal"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
            >
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="50%" stopColor="#EF4444" />
                <stop offset="50%" stopColor="#FACC15" />
                <stop offset="100%" stopColor="#FACC15" />
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

export const WinIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="winTitle"
        {...props}
    >
        <rect
            x="0"
            y="0"
            width="64"
            height="64"
            rx="10"
            ry="10"
            fill="#28a745"
        />
        <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
            fontWeight="700"
            fontSize="36"
            fill="#ffffff"
        >
            Z
        </text>
    </svg>
);

export const LoseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="loseTitle"
        {...props}
    >
        <rect
            x="0"
            y="0"
            width="64"
            height="64"
            rx="10"
            ry="10"
            fill="#dc3545"
        />
        <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
            fontWeight="700"
            fontSize="36"
            fill="#ffffff"
        >
            P
        </text>
    </svg>
);
export const DrawIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="drawTitle"
        {...props}
    >
        <rect
            x="0"
            y="0"
            width="64"
            height="64"
            rx="10"
            ry="10"
            fill="#6c757d"
        />
        <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
            fontWeight="700"
            fontSize="36"
            fill="#ffffff"
        >
            R
        </text>
    </svg>
);

export const DrawWinIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="winTitle"
        {...props}
    >
        <defs>
            <linearGradient
                id="diagGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
            >
                <stop offset="0%" stopColor="#cccccc" />
                <stop offset="50%" stopColor="#cccccc" />
                <stop offset="50%" stopColor="#28a745" />
                <stop offset="100%" stopColor="#28a745" />
            </linearGradient>
        </defs>

        <rect
            x="0"
            y="0"
            width="64"
            height="64"
            rx="10"
            ry="10"
            fill="url(#diagGradient)"
        />
        <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
            fontWeight="700"
            fontSize="36"
            fill="#ffffff"
        >
            Z
        </text>
    </svg>
);
export const DrawLoseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="winTitle"
        {...props}
    >
        <defs>
            <linearGradient
                id="diagGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
            >
                <stop offset="0%" stopColor="#cccccc" />
                <stop offset="50%" stopColor="#cccccc" />
                <stop offset="50%" stopColor="#dc3545" />
                <stop offset="100%" stopColor="#dc3545" />
            </linearGradient>
        </defs>

        <rect
            x="0"
            y="0"
            width="64"
            height="64"
            rx="10"
            ry="10"
            fill="url(#diagGradient)"
        />
        <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
            fontWeight="700"
            fontSize="36"
            fill="#ffffff"
        >
            L
        </text>
    </svg>
);
