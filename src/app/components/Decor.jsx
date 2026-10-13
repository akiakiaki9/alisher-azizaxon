// components/Decor.jsx

/* ===== УГЛОВЫЕ ЗАВИТКИ ===== */
export function CornerFlourish({ className = '', flip = false }) {
    return (
        <svg
            viewBox="0 0 140 140"
            className={className}
            style={flip ? { transform: 'scaleX(-1)' } : undefined}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinecap="round"
        >
            <path d="M4 4 C 4 44, 44 4, 44 4" opacity="0.35" />
            <path d="M4 4 C 4 60, 60 4, 60 4" opacity="0.55" />
            <path d="M4 4 C 4 76, 76 4, 76 4" opacity="0.75" />
            <path d="M10 10 C 10 30, 30 10, 30 10" opacity="0.5" />
            <circle cx="4" cy="4" r="1.6" fill="currentColor" stroke="none" />
            <circle cx="14" cy="14" r="1" fill="currentColor" stroke="none" opacity="0.7" />
        </svg>
    );
}

/* ===== РАЗДЕЛИТЕЛЬ ===== */
export function Divider({ className = '' }) {
    return (
        <svg
            viewBox="0 0 220 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinecap="round"
        >
            <line x1="0" y1="12" x2="80" y2="12" opacity="0.35" />
            <line x1="140" y1="12" x2="220" y2="12" opacity="0.35" />
            <path d="M96 12 C 100 6, 104 6, 108 12 C 104 18, 100 18, 96 12 Z" opacity="0.9" />
            <path d="M124 12 C 120 6, 116 6, 112 12 C 116 18, 120 18, 124 12 Z" opacity="0.9" />
            <circle cx="110" cy="12" r="1.4" fill="currentColor" stroke="none" />
        </svg>
    );
}

/* ===== ВЕТКА ===== */
export function Branch({ className = '', flip = false, rotate = 0 }) {
    return (
        <svg
            viewBox="0 0 200 300"
            className={className}
            style={{ transform: `${flip ? 'scaleX(-1)' : ''} rotate(${rotate}deg)` }}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
        >
            <path d="M100 300 C 100 220, 90 160, 60 100 C 40 60, 30 30, 20 0" />
            <path d="M100 300 C 100 220, 110 160, 140 100 C 160 60, 170 30, 180 0" opacity="0.6" />
            {[[60, 100], [140, 100], [45, 140], [155, 140], [30, 60], [170, 60], [70, 180], [130, 180]].map(([x, y], i) => (
                <ellipse
                    key={i}
                    cx={x}
                    cy={y}
                    rx="10"
                    ry="4"
                    transform={`rotate(${(i % 2 ? 40 : -40)} ${x} ${y})`}
                    opacity="0.55"
                />
            ))}
            <circle cx="100" cy="300" r="2" fill="currentColor" stroke="none" opacity="0.6" />
        </svg>
    );
}

/* ===== ОРНАМЕНТ ===== */
export function OrnamentRow({ className = '' }) {
    return (
        <svg
            viewBox="0 0 320 30"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinecap="round"
        >
            <line x1="0" y1="15" x2="120" y2="15" opacity="0.3" />
            <line x1="200" y1="15" x2="320" y2="15" opacity="0.3" />
            <path d="M140 15 C 145 4, 155 4, 160 15 C 155 26, 145 26, 140 15 Z" opacity="0.9" />
            <path d="M160 15 C 165 4, 175 4, 180 15 C 175 26, 165 26, 160 15 Z" opacity="0.9" />
            <circle cx="150" cy="8" r="1" fill="currentColor" stroke="none" />
            <circle cx="170" cy="22" r="1" fill="currentColor" stroke="none" />
            <circle cx="130" cy="15" r="1.5" fill="currentColor" stroke="none" opacity="0.6" />
            <circle cx="190" cy="15" r="1.5" fill="currentColor" stroke="none" opacity="0.6" />
        </svg>
    );
}

/* ===== МОНОГРАММА ===== */
export function Monogram({ className = '', initials = 'A & A' }) {
    return (
        <div className={className}>
            <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.9">
                <circle cx="100" cy="100" r="78" opacity="0.4" />
                <circle cx="100" cy="100" r="68" opacity="0.7" />
                <circle cx="100" cy="100" r="3" fill="currentColor" stroke="none" opacity="0.8" />
            </svg>
            <span>{initials}</span>
        </div>
    );
}

/* =========================================================
   БЕЛЫЕ СВАДЕБНЫЕ ЦВЕТЫ
   ========================================================= */

/**
 * Универсальный цветок.
 * variant: 'peony' | 'rose' | 'jasmine' | 'daisy'
 * Размер задаётся через width/height в className или style.
 */
export function Flower({ className = '', variant = 'peony', style = {} }) {
    if (variant === 'rose') {
        return (
            <svg viewBox="0 0 100 100" className={className} style={style} fill="none">
                <defs>
                    <radialGradient id="roseC" cx="50%" cy="50%" r="55%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="55%" stopColor="#fdf7ee" />
                        <stop offset="100%" stopColor="#eadfcc" />
                    </radialGradient>
                </defs>
                {/* внешние лепестки */}
                <path d="M50 8 C 74 12, 92 30, 92 50 C 92 74, 74 92, 50 92 C 26 92, 8 74, 8 50 C 8 30, 26 12, 50 8 Z" fill="url(#roseC)" stroke="#c9b79c" strokeWidth="0.6" />
                <path d="M50 20 C 66 24, 78 34, 78 50 C 78 66, 66 78, 50 80 C 34 78, 22 66, 22 50 C 22 34, 34 24, 50 20 Z" fill="#fdf7ee" stroke="#d8cfc2" strokeWidth="0.5" />
                <path d="M50 32 C 60 34, 66 40, 66 50 C 66 60, 60 66, 50 68 C 40 66, 34 60, 34 50 C 34 40, 40 34, 50 32 Z" fill="#ffffff" stroke="#ddd3c4" strokeWidth="0.5" />
                <path d="M50 44 C 55 45, 58 48, 58 50 C 58 53, 55 55, 50 56 C 45 55, 42 53, 42 50 C 42 48, 45 45, 50 44 Z" fill="#fbf6ec" stroke="#c9b79c" strokeWidth="0.4" />
            </svg>
        );
    }

    if (variant === 'jasmine') {
        return (
            <svg viewBox="0 0 100 100" className={className} style={style} fill="none">
                <defs>
                    <radialGradient id="jasC" cx="50%" cy="50%" r="55%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="80%" stopColor="#fbf6ec" />
                        <stop offset="100%" stopColor="#e8dcc8" />
                    </radialGradient>
                </defs>
                {[0, 72, 144, 216, 288].map((deg, i) => (
                    <ellipse
                        key={i}
                        cx="50" cy="26" rx="12" ry="22"
                        fill="url(#jasC)" stroke="#d8cfc2" strokeWidth="0.5"
                        transform={`rotate(${deg} 50 50)`}
                    />
                ))}
                <circle cx="50" cy="50" r="6" fill="#fdf7ee" stroke="#c9b79c" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="2" fill="#c9b79c" />
            </svg>
        );
    }

    if (variant === 'daisy') {
        return (
            <svg viewBox="0 0 100 100" className={className} style={style} fill="none">
                {[...Array(12)].map((_, i) => (
                    <ellipse
                        key={i}
                        cx="50" cy="24" rx="7" ry="18"
                        fill="#ffffff" stroke="#e0d7c7" strokeWidth="0.4"
                        transform={`rotate(${i * 30} 50 50)`}
                    />
                ))}
                <circle cx="50" cy="50" r="10" fill="#fdf7ec" stroke="#d8cfc2" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="5" fill="#e8dcc8" />
                <circle cx="50" cy="50" r="2" fill="#c9b79c" />
            </svg>
        );
    }

    /* peony — по умолчанию */
    return (
        <svg viewBox="0 0 100 100" className={className} style={style} fill="none">
            <defs>
                <radialGradient id="peoA" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="70%" stopColor="#faf4ea" />
                    <stop offset="100%" stopColor="#e8dcc8" />
                </radialGradient>
                <radialGradient id="peoB" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#f3ead9" />
                </radialGradient>
            </defs>

            {/* внешние волнистые лепестки */}
            <path
                d="M50 6
           C 68 6, 82 14, 90 28
           C 96 40, 92 54, 86 62
           C 92 72, 88 86, 76 92
           C 66 96, 54 94, 50 92
           C 46 94, 34 96, 24 92
           C 12 86, 8 72, 14 62
           C 8 54, 4 40, 10 28
           C 18 14, 32 6, 50 6 Z"
                fill="url(#peoA)"
                stroke="#d8cfc2"
                strokeWidth="0.5"
            />
            {/* средние лепестки */}
            <path
                d="M50 18
           C 62 18, 74 26, 78 38
           C 82 50, 76 62, 68 68
           C 74 76, 70 86, 60 88
           C 52 90, 48 86, 50 82
           C 52 86, 48 90, 40 88
           C 30 86, 26 76, 32 68
           C 24 62, 18 50, 22 38
           C 26 26, 38 18, 50 18 Z"
                fill="url(#peoB)"
                stroke="#ddd3c4"
                strokeWidth="0.5"
            />
            {/* внутренние складки */}
            <path
                d="M50 30
           C 58 30, 64 36, 66 44
           C 68 52, 62 60, 56 64
           C 58 68, 56 74, 50 76
           C 44 74, 42 68, 44 64
           C 38 60, 32 52, 34 44
           C 36 36, 42 30, 50 30 Z"
                fill="#ffffff"
                stroke="#e0d7c7"
                strokeWidth="0.5"
            />
            {/* центр */}
            <path
                d="M50 42 C 56 42, 60 46, 60 50 C 60 55, 56 58, 50 58 C 44 58, 40 55, 40 50 C 40 46, 44 42, 50 42 Z"
                fill="#fbf6ec"
                stroke="#c9b79c"
                strokeWidth="0.5"
            />
            <circle cx="50" cy="50" r="2.5" fill="#c9b79c" opacity="0.85" />
            <circle cx="46" cy="47" r="1" fill="#a68a64" opacity="0.5" />
            <circle cx="54" cy="53" r="1" fill="#a68a64" opacity="0.5" />
        </svg>
    );
}

/**
 * Угловая композиция из цветов и листьев.
 * position: 'tl' | 'tr' | 'bl' | 'br'
 */
export function FlowerCorner({ className = '', position = 'tl', size = 220 }) {
    const transforms = {
        tl: 'none',
        tr: 'scaleX(-1)',
        bl: 'scaleY(-1)',
        br: 'scale(-1,-1)',
    };

    return (
        <div
            className={`flower-corner flower-corner-${position} ${className}`}
            style={{
                width: size,
                height: size,
                transform: transforms[position],
            }}
            aria-hidden="true"
        >
            <svg viewBox="0 0 240 240" fill="none">
                <defs>
                    <radialGradient id="fcPet" cx="50%" cy="50%" r="60%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="70%" stopColor="#fbf6ec" />
                        <stop offset="100%" stopColor="#e8dcc8" />
                    </radialGradient>
                    <linearGradient id="fcLeaf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#b8a889" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#8b7355" stopOpacity="0.3" />
                    </linearGradient>
                </defs>

                {/* веточки */}
                <path d="M6 6 C 40 30, 70 70, 90 110" stroke="#a68a64" strokeWidth="1.1" opacity="0.6" fill="none" />
                <path d="M6 6 C 30 20, 50 44, 62 80" stroke="#a68a64" strokeWidth="0.9" opacity="0.45" fill="none" />
                <path d="M6 6 C 22 14, 34 30, 44 52" stroke="#a68a64" strokeWidth="0.8" opacity="0.4" fill="none" />

                {/* листья вдоль веток */}
                {[
                    [30, 26, -30], [46, 40, -20], [62, 60, -10],
                    [78, 82, 0], [90, 104, 10],
                    [22, 24, 50], [38, 44, 60], [54, 72, 70],
                ].map(([x, y, r], i) => (
                    <ellipse
                        key={i}
                        cx={x} cy={y} rx="14" ry="5"
                        fill="url(#fcLeaf)"
                        stroke="#a68a64"
                        strokeWidth="0.4"
                        transform={`rotate(${r} ${x} ${y})`}
                    />
                ))}

                {/* маленькие бутоны */}
                {[[70, 38], [40, 66], [96, 60], [56, 96]].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="3.5" fill="#fbf6ec" stroke="#c9b79c" strokeWidth="0.4" />
                ))}

                {/* БОЛЬШОЙ ПИОН в углу */}
                <g transform="translate(0,0)">
                    <path
                        d="M30 8
               C 48 6, 62 16, 66 32
               C 70 46, 62 60, 52 66
               C 58 74, 54 86, 42 88
               C 32 90, 24 84, 22 76
               C 12 78, 4 68, 6 56
               C 8 46, 18 42, 22 40
               C 20 26, 22 14, 30 8 Z"
                        fill="url(#fcPet)"
                        stroke="#d8cfc2"
                        strokeWidth="0.5"
                    />
                    <path
                        d="M28 20
               C 40 20, 48 28, 50 38
               C 52 48, 44 56, 36 60
               C 40 66, 36 74, 28 74
               C 20 74, 18 68, 20 62
               C 14 58, 12 48, 16 40
               C 20 30, 24 22, 28 20 Z"
                        fill="#ffffff"
                        stroke="#e0d7c7"
                        strokeWidth="0.5"
                    />
                    <circle cx="30" cy="46" r="3" fill="#c9b79c" opacity="0.7" />
                </g>

                {/* второй цветок чуть дальше */}
                <g transform="translate(52,52) scale(0.55)">
                    <path
                        d="M30 8
               C 48 6, 62 16, 66 32
               C 70 46, 62 60, 52 66
               C 58 74, 54 86, 42 88
               C 32 90, 24 84, 22 76
               C 12 78, 4 68, 6 56
               C 8 46, 18 42, 22 40
               C 20 26, 22 14, 30 8 Z"
                        fill="url(#fcPet)"
                        stroke="#d8cfc2"
                        strokeWidth="0.6"
                    />
                    <circle cx="30" cy="46" r="3" fill="#c9b79c" opacity="0.7" />
                </g>

                {/* третий — совсем маленький */}
                <g transform="translate(84,20) scale(0.4)">
                    <circle cx="30" cy="30" r="22" fill="url(#fcPet)" stroke="#d8cfc2" strokeWidth="0.6" />
                    <circle cx="30" cy="30" r="4" fill="#c9b79c" opacity="0.6" />
                </g>
            </svg>
        </div>
    );
}

/**
 * Горизонтальная композиция из цветов (для орнамента).
 */
export function FlowerSpray({ className = '', style = {} }) {
    return (
        <svg viewBox="0 0 320 80" className={className} style={style} fill="none">
            <defs>
                <linearGradient id="spLeaf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#b8a889" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#8b7355" stopOpacity="0.3" />
                </linearGradient>
            </defs>

            {/* листья-веточки по бокам */}
            <path d="M20 40 C 60 30, 90 34, 120 40" stroke="#a68a64" strokeWidth="0.8" opacity="0.5" fill="none" />
            <path d="M200 40 C 230 34, 260 30, 300 40" stroke="#a68a64" strokeWidth="0.8" opacity="0.5" fill="none" />
            {[[45, 32, 20], [70, 34, 30], [95, 36, 10], [225, 36, -10], [250, 34, -30], [275, 32, -20]].map(([x, y, r], i) => (
                <ellipse key={i} cx={x} cy={y} rx="10" ry="4" fill="url(#spLeaf)" stroke="#a68a64" strokeWidth="0.3" transform={`rotate(${r} ${x} ${y})`} />
            ))}

            {/* центральный цветок */}
            <g transform="translate(140,20)">
                <circle cx="20" cy="20" r="18" fill="#fbf6ec" stroke="#d8cfc2" strokeWidth="0.6" />
                <circle cx="20" cy="20" r="11" fill="#ffffff" stroke="#e0d7c7" strokeWidth="0.5" />
                <circle cx="20" cy="20" r="4" fill="#c9b79c" opacity="0.7" />
            </g>

            {/* два маленьких цветка по бокам */}
            <g transform="translate(110,32)">
                <circle cx="8" cy="8" r="7" fill="#ffffff" stroke="#e0d7c7" strokeWidth="0.5" />
                <circle cx="8" cy="8" r="2.5" fill="#c9b79c" opacity="0.6" />
            </g>
            <g transform="translate(195,32)">
                <circle cx="8" cy="8" r="7" fill="#ffffff" stroke="#e0d7c7" strokeWidth="0.5" />
                <circle cx="8" cy="8" r="2.5" fill="#c9b79c" opacity="0.6" />
            </g>
        </svg>
    );
}

/**
 * Одиночный лепесток (используется в Petals.jsx).
 */
export function PetalSVG({ className = '', style = {} }) {
    return (
        <svg viewBox="0 0 30 30" className={className} style={style} fill="none">
            <defs>
                <radialGradient id="ptG" cx="40%" cy="40%" r="70%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="60%" stopColor="#fdf7ec" />
                    <stop offset="100%" stopColor="#e8dcc8" />
                </radialGradient>
            </defs>
            <path
                d="M15 2 C 22 4, 28 12, 26 20 C 24 27, 18 29, 15 28 C 12 29, 6 27, 4 20 C 2 12, 8 4, 15 2 Z"
                fill="url(#ptG)"
                stroke="#d8cfc2"
                strokeWidth="0.4"
            />
            <path d="M15 6 C 18 10, 18 18, 15 24" stroke="#d8cfc2" strokeWidth="0.3" opacity="0.6" />
        </svg>
    );
}