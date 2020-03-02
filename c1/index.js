
function tConvert(temperature, conversionType) {
    switch (conversionType) {
        case "C2F":
            return ((temperature * 1.8) + 32);
        case "F2C":
            return ((temperature - 32) / 1.8);
        default:
            return null;
    }
}

console.log(tConvert(132, "F2C"));