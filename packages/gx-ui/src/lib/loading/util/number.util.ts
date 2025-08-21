export function clampNumberLike(v: number|string|undefined|null, min: number, max: number, fallback: number) {
    const n = typeof v === 'string' ? parseFloat(v) : v ?? fallback;
    const safe = Number.isFinite(n) ? n as number : fallback;
    return Math.min(max, Math.max(min, safe));
}