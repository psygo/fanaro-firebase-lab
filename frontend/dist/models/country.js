"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brazilianStateFromString = exports.BrazilianState = exports.CountryFlag = exports.countryKeyFromString = exports.countryNameFromString = exports.CountryName = exports.getFlag = void 0;
const getFlag = (cn) => {
    const ind = Object.keys(CountryFlag).findIndex((cf) => cf === (0, exports.countryKeyFromString)(cn).toLowerCase());
    return Object.values(CountryFlag)[ind];
};
exports.getFlag = getFlag;
var CountryName;
(function (CountryName) {
    CountryName["brazil"] = "Brasil";
    CountryName["angola"] = "Angola";
    CountryName["argentina"] = "Argentina";
    CountryName["canada"] = "Canad\u00E1";
    CountryName["colombia"] = "Colombia";
    CountryName["france"] = "Fran\u00E7a";
    CountryName["israel"] = "Israel";
    CountryName["italy"] = "It\u00E1lia";
    CountryName["japan"] = "Jap\u00E3o";
    CountryName["mexico"] = "M\u00E9xico";
    CountryName["portugal"] = "Portugal";
    CountryName["romania"] = "Rom\u00EAnia";
    CountryName["taiwan"] = "Taiwan";
    CountryName["usa"] = "EUA";
})(CountryName = exports.CountryName || (exports.CountryName = {}));
const countryNameFromString = (cString) => Object.values(CountryName).find((c) => c === cString);
exports.countryNameFromString = countryNameFromString;
const countryKeyFromString = (cString) => {
    for (const [k, v] of Object.entries(CountryName))
        if (v === cString)
            return k;
    return "";
};
exports.countryKeyFromString = countryKeyFromString;
var CountryFlag;
(function (CountryFlag) {
    CountryFlag["angola"] = "\uD83C\uDDE6\uD83C\uDDF4";
    CountryFlag["argentina"] = "\uD83C\uDDE6\uD83C\uDDF7";
    CountryFlag["brazil"] = "\uD83C\uDDE7\uD83C\uDDF7";
    CountryFlag["canada"] = "\uD83C\uDDE8\uD83C\uDDE6";
    CountryFlag["colombia"] = "\uD83C\uDDE8\uD83C\uDDF4";
    CountryFlag["france"] = "\uD83C\uDDEB\uD83C\uDDF7";
    CountryFlag["israel"] = "\uD83C\uDDEE\uD83C\uDDF1";
    CountryFlag["italy"] = "\uD83C\uDDEE\uD83C\uDDF9";
    CountryFlag["japan"] = "\uD83C\uDDEF\uD83C\uDDF5";
    CountryFlag["mexico"] = "\uD83C\uDDF2\uD83C\uDDFD";
    CountryFlag["portugal"] = "\uD83C\uDDF5\uD83C\uDDF9";
    CountryFlag["romania"] = "\uD83C\uDDF7\uD83C\uDDF4";
    CountryFlag["taiwan"] = "\uD83C\uDDF9\uD83C\uDDFC";
    CountryFlag["usa"] = "\uD83C\uDDFA\uD83C\uDDF8";
})(CountryFlag = exports.CountryFlag || (exports.CountryFlag = {}));
var BrazilianState;
(function (BrazilianState) {
    BrazilianState["ac"] = "AC";
    BrazilianState["al"] = "AL";
    BrazilianState["ap"] = "AP";
    BrazilianState["am"] = "AM";
    BrazilianState["ba"] = "BA";
    BrazilianState["ce"] = "CE";
    BrazilianState["df"] = "DF";
    BrazilianState["es"] = "ES";
    BrazilianState["go"] = "GO";
    BrazilianState["ma"] = "MA";
    BrazilianState["mt"] = "MT";
    BrazilianState["ms"] = "MS";
    BrazilianState["mg"] = "MG";
    BrazilianState["pa"] = "PA";
    BrazilianState["pb"] = "PB";
    BrazilianState["pr"] = "PR";
    BrazilianState["pe"] = "PE";
    BrazilianState["pi"] = "PI";
    BrazilianState["rj"] = "RJ";
    BrazilianState["rn"] = "RN";
    BrazilianState["rs"] = "RS";
    BrazilianState["ro"] = "RO";
    BrazilianState["rr"] = "RR";
    BrazilianState["sp"] = "SP";
    BrazilianState["se"] = "SE";
    BrazilianState["to"] = "TO";
})(BrazilianState = exports.BrazilianState || (exports.BrazilianState = {}));
const brazilianStateFromString = (brString) => Object.values(BrazilianState).find((brS) => brS === brString);
exports.brazilianStateFromString = brazilianStateFromString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvY291bnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFPTyxNQUFNLE9BQU8sR0FBRyxDQUFDLEVBQWUsRUFBZSxFQUFFO0lBQ3RELE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUM1QyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLElBQUEsNEJBQW9CLEVBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQ3RELENBQUM7SUFDRixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDekMsQ0FBQyxDQUFDO0FBTFcsUUFBQSxPQUFPLFdBS2xCO0FBRUYsSUFBWSxXQWVYO0FBZkQsV0FBWSxXQUFXO0lBQ3JCLGdDQUFpQixDQUFBO0lBQ2pCLGdDQUFpQixDQUFBO0lBQ2pCLHNDQUF1QixDQUFBO0lBQ3ZCLHFDQUFpQixDQUFBO0lBQ2pCLG9DQUFxQixDQUFBO0lBQ3JCLHFDQUFpQixDQUFBO0lBQ2pCLGdDQUFpQixDQUFBO0lBQ2pCLG9DQUFnQixDQUFBO0lBQ2hCLG1DQUFlLENBQUE7SUFDZixxQ0FBaUIsQ0FBQTtJQUNqQixvQ0FBcUIsQ0FBQTtJQUNyQix1Q0FBbUIsQ0FBQTtJQUNuQixnQ0FBaUIsQ0FBQTtJQUNqQiwwQkFBVyxDQUFBO0FBQ2IsQ0FBQyxFQWZXLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBZXRCO0FBRU0sTUFBTSxxQkFBcUIsR0FBRyxDQUFDLE9BQWUsRUFBZSxFQUFFLENBQ3BFLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFFLENBQUM7QUFENUMsUUFBQSxxQkFBcUIseUJBQ3VCO0FBRWxELE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxPQUFlLEVBQVUsRUFBRTtJQUM5RCxLQUFLLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFBRSxJQUFJLENBQUMsS0FBSyxPQUFPO1lBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUUsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDLENBQUM7QUFIVyxRQUFBLG9CQUFvQix3QkFHL0I7QUFFRixJQUFZLFdBZVg7QUFmRCxXQUFZLFdBQVc7SUFDckIsa0RBQWUsQ0FBQTtJQUNmLHFEQUFrQixDQUFBO0lBQ2xCLGtEQUFlLENBQUE7SUFDZixrREFBZSxDQUFBO0lBQ2Ysb0RBQWlCLENBQUE7SUFDakIsa0RBQWUsQ0FBQTtJQUNmLGtEQUFlLENBQUE7SUFDZixpREFBYyxDQUFBO0lBQ2QsaURBQWMsQ0FBQTtJQUNkLGtEQUFlLENBQUE7SUFDZixvREFBaUIsQ0FBQTtJQUNqQixtREFBZ0IsQ0FBQTtJQUNoQixrREFBZSxDQUFBO0lBQ2YsK0NBQVksQ0FBQTtBQUNkLENBQUMsRUFmVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQWV0QjtBQUVELElBQVksY0EyQlg7QUEzQkQsV0FBWSxjQUFjO0lBQ3hCLDJCQUFTLENBQUE7SUFDVCwyQkFBUyxDQUFBO0lBQ1QsMkJBQVMsQ0FBQTtJQUNULDJCQUFTLENBQUE7SUFDVCwyQkFBUyxDQUFBO0lBQ1QsMkJBQVMsQ0FBQTtJQUNULDJCQUFTLENBQUE7SUFDVCwyQkFBUyxDQUFBO0lBQ1QsMkJBQVMsQ0FBQTtJQUNULDJCQUFTLENBQUE7SUFDVCwyQkFBUyxDQUFBO0lBQ1QsMkJBQVMsQ0FBQTtJQUNULDJCQUFTLENBQUE7SUFDVCwyQkFBUyxDQUFBO0lBQ1QsMkJBQVMsQ0FBQTtJQUNULDJCQUFTLENBQUE7SUFDVCwyQkFBUyxDQUFBO0lBQ1QsMkJBQVMsQ0FBQTtJQUNULDJCQUFTLENBQUE7SUFDVCwyQkFBUyxDQUFBO0lBQ1QsMkJBQVMsQ0FBQTtJQUNULDJCQUFTLENBQUE7SUFDVCwyQkFBUyxDQUFBO0lBQ1QsMkJBQVMsQ0FBQTtJQUNULDJCQUFTLENBQUE7SUFDVCwyQkFBUyxDQUFBO0FBQ1gsQ0FBQyxFQTNCVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQTJCekI7QUFFTSxNQUFNLHdCQUF3QixHQUFHLENBQUMsUUFBZ0IsRUFBa0IsRUFBRSxDQUMzRSxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxLQUFLLFFBQVEsQ0FBRSxDQUFDO0FBRHBELFFBQUEsd0JBQXdCLDRCQUM0QiJ9