export function getOldId(code) {
    let codes = [
        { code: "clearsky", oldId: 1 },
        { code: "cloudy", oldId: 4 },
        { code: "fair", oldId: 2 },
        { code: "fog", oldId: 15 },
        { code: "heavyrain", oldId: 10 },
        { code: "heavyrainandthunder", oldId: 11 },
        { code: "heavyrainshowers", oldId: 41 },
        { code: "heavyrainshowersandthunder", oldId: 25 },
        { code: "heavysleet", oldId: 48 },
        { code: "heavysleetandthunder", oldId: 32 },
        { code: "heavysleetshowers", oldId: 43 },
        { code: "heavysleetshowersandthunder", oldId: 27 },
        { code: "heavysnow", oldId: 50 },
        { code: "heavysnowandthunder", oldId: 34 },
        { code: "heavysnowshowers", oldId: 45 },
        { code: "heavysnowshowersandthunder", oldId: 29 },
        { code: "lightrain", oldId: 46 },
        { code: "lightrainandthunder", oldId: 30 },
        { code: "lightrainshowers", oldId: 40 },
        { code: "lightrainshowersandthunder", oldId: 24 },
        { code: "lightsleet", oldId: 47 },
        { code: "lightsleetandthunder", oldId: 31 },
        { code: "lightsleetshowers", oldId: 42 },
        { code: "lightsnow", oldId: 49 },
        { code: "lightsnowandthunder", oldId: 33 },
        { code: "lightsnowshowers", oldId: 44 },
        { code: "lightssleetshowersandthunder", oldId: 26 },
        { code: "lightssnowshowersandthunder", oldId: 28 },
        { code: "partlycloudy", oldId: 3 },
        { code: "rain", oldId: 9 },
        { code: "rainandthunder", oldId: 22 },
        { code: "rainshowers", oldId: 5 },
        { code: "rainshowersandthunder", oldId: 6 },
        { code: "sleet", oldId: 12 },
        { code: "sleetandthunder", oldId: 23 },
        { code: "sleetshowers", oldId: 7 },
        { code: "sleetshowersandthunder", oldId: 20 },
        { code: "snow", oldId: 13 },
        { code: "snowandthunder", oldId: 14 },
        { code: "snowshowers", oldId: 8 },
        { code: "snowshowersandthunder", oldId: 21 }];
    let found = codes.find(({ code: c }) => c === code);
    if (found) {
        let { oldId } = found;
        console.log(oldId);
        return oldId;
    }
    return null;
}