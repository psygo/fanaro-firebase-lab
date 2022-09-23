"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai = __importStar(require("chai"));
const elo_1 = __importDefault(require("../models/elo"));
const game_record_1 = require("../models/game_record");
describe("Elo", () => {
    it("Below 2000 and above 2000 should yield asymmetric deltas", () => {
        const eloAbove2000 = new elo_1.default(2027);
        const eloBelow2000 = new elo_1.default(1716);
        const deltaEloAbove2000 = eloAbove2000.deltaFromGame(eloBelow2000, game_record_1.GameResultStatus.Win);
        const deltaEloBelow2000 = eloBelow2000.deltaFromGame(eloAbove2000, game_record_1.GameResultStatus.Loss);
        chai.expect(deltaEloAbove2000.num).equal(4);
        chai.expect(deltaEloBelow2000.num).equal(-6);
    });
    it("Above 2000 and above 2000 should yield symmetric deltas", () => {
        const elo1 = new elo_1.default(2196);
        const elo2 = new elo_1.default(2044);
        const deltaElo1 = elo1.deltaFromGame(elo2, game_record_1.GameResultStatus.Loss);
        const deltaElo2 = elo2.deltaFromGame(elo1, game_record_1.GameResultStatus.Win);
        chai.expect(deltaElo1.num).equal(-21);
        chai.expect(deltaElo2.num).equal(21);
    });
    it("Below 2000 and below 2000 should yield symmetric deltas", () => {
        const elo1 = new elo_1.default(1400);
        const elo2 = new elo_1.default(1076);
        const deltaElo1 = elo1.deltaFromGame(elo2, game_record_1.GameResultStatus.Win);
        const deltaElo2 = elo2.deltaFromGame(elo1, game_record_1.GameResultStatus.Loss);
        chai.expect(deltaElo1.num).equal(7);
        chai.expect(deltaElo2.num).equal(-7);
    });
    it("Above 1500 (and below 2000) and below 1500 should yield asymmetric deltas", () => {
        const eloAbove1500 = new elo_1.default(1499);
        const eloBelow1500 = new elo_1.default(1501);
        const deltaEloAbove1500 = eloAbove1500.deltaFromGame(eloBelow1500, game_record_1.GameResultStatus.Win);
        const deltaEloBelow1500 = eloBelow1500.deltaFromGame(eloAbove1500, game_record_1.GameResultStatus.Loss);
        chai.expect(deltaEloAbove1500.num).equal(25);
        chai.expect(deltaEloBelow1500.num).equal(-20);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxvLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdC9lbG8udGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTZCO0FBRTdCLHdEQUFnQztBQUNoQyx1REFBeUQ7QUFFekQsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7SUFDbkIsRUFBRSxDQUFDLDBEQUEwRCxFQUFFLEdBQUcsRUFBRTtRQUNsRSxNQUFNLFlBQVksR0FBRyxJQUFJLGFBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxNQUFNLFlBQVksR0FBRyxJQUFJLGFBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVuQyxNQUFNLGlCQUFpQixHQUFHLFlBQVksQ0FBQyxhQUFhLENBQ2xELFlBQVksRUFDWiw4QkFBZ0IsQ0FBQyxHQUFHLENBQ3JCLENBQUM7UUFDRixNQUFNLGlCQUFpQixHQUFHLFlBQVksQ0FBQyxhQUFhLENBQ2xELFlBQVksRUFDWiw4QkFBZ0IsQ0FBQyxJQUFJLENBQ3RCLENBQUM7UUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHlEQUF5RCxFQUFFLEdBQUcsRUFBRTtRQUNqRSxNQUFNLElBQUksR0FBRyxJQUFJLGFBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixNQUFNLElBQUksR0FBRyxJQUFJLGFBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSw4QkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSw4QkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMseURBQXlELEVBQUUsR0FBRyxFQUFFO1FBQ2pFLE1BQU0sSUFBSSxHQUFHLElBQUksYUFBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLE1BQU0sSUFBSSxHQUFHLElBQUksYUFBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTNCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLDhCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLDhCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywyRUFBMkUsRUFBRSxHQUFHLEVBQUU7UUFDbkYsTUFBTSxZQUFZLEdBQUcsSUFBSSxhQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsTUFBTSxZQUFZLEdBQUcsSUFBSSxhQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbkMsTUFBTSxpQkFBaUIsR0FBRyxZQUFZLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSw4QkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6RixNQUFNLGlCQUFpQixHQUFHLFlBQVksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLDhCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTFGLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9