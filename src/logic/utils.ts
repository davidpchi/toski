export function getWinRatePercentage(winCount: number, totalCount: number) {
    return (Math.round((winCount / totalCount) * 100));
}