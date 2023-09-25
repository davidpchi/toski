export function getWinRatePercentage(winCount: number, totalCount: number) {
    return totalCount > 0 ? Math.round((winCount / totalCount) * 100) : 0;
}
