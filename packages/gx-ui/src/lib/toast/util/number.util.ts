/** 以「時間戳 * 1000 + 序號」產生近似單調遞增、低碰撞的數字 ID */
export function makeNumericId(seq: number): number {
    return Date.now() * 1000 + (seq % 1000);
}