const tConvert = (temperature, conversionType) => {
    switch (conversionType) {
        case "C2F":
            return (temperature * 1.8) + 32;
        case "F2C":
            return (temperature - 32) / 1.8;
        default:
            return null;
    }
}

console.log(tConvert(132, "F2C"));

const logFails = true;
let allHasPassed = true;

const TestFail = (nameOfTest, expected, result) => {
    if (logFails == true) {
        console.log("WARN: " + nameOfTest + " failed; Expected: " + expected + "; Got: " + result + ";");
    }
    allHasPassed = false;
}

(function ShouldConvertFarenheitToCelsius() {
    // Arange
    const expected = 55.55555555555556;

    // Act
    const result = tConvert(132, "F2C");

    // Assert
    result == expected ? null : TestFail("Test 1", expected, result);
})();

(function ShouldConvertCelsiusToFarenheit() {
    // Arange
    const expected = 89.6;

    // Act
    const result = tConvert(32, "C2F");

    // Assert
    result == expected ? null : TestFail("Test 2", expected, result);
})();

allHasPassed ? console.log("All tests have passed.") : console.log("Tests failed.")