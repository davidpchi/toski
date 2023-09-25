import { getWinRatePercentage } from "./utils";

// to run tests, run "npm run test" on the project root
describe("getWinRatePercentage", function () {
    it("given win number and total games, provide win rate (as whole number)", function () {
        expect(getWinRatePercentage(5, 10)).toEqual(50);
        expect(getWinRatePercentage(1, 3)).toEqual(33);
        expect(getWinRatePercentage(0, 10)).toEqual(0);
        expect(getWinRatePercentage(10, 10)).toEqual(100);
    });

    it("given no games, handles this case", function () {
        expect(getWinRatePercentage(0, 0)).toEqual(0);
    });
});
