const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop, getRevenueForCrop, getProfitForCrop, getTotalProfit } = require("./farm");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
        factor: {
            sun: {
            low: -50,
            medium: 0,
            high: 50,
            },
            wind: {
            little: 50,
            standard: 0,
            strong: -50,
            },
            soil: {
            poor: 0,
            normal: 50,
            rich: 100,
            },
        },
        };
    const pumpkin = {
        name: "pumpkin",
        yield: 4,
        factor: {
            sun: {
            low: 0,
            medium: 25,
            high: -25,
            },
            wind: {
            little: 100,
            standard: 50,
            strong: 0,
            },
            soil: {
            poor: -50,
            normal: 0,
            rich: 50,
            },
        },
        };
    
    test("Get yield for corn with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
    test("Get yield for corn with low sun", () => {
        const lowFactor = { sun: "low", };
        expect(getYieldForPlant(corn, lowFactor)).toBe(15);
        });
    test("Get yield for pumpkin with medium sun", () => {
        const mediumFactor = { sun: "medium", };
        expect(getYieldForPlant(pumpkin, mediumFactor)).toBe(5);
        });
    test("Get yield for corn with high sun", () => {
        const highFactor = { sun: "high", };
        expect(getYieldForPlant(corn, highFactor)).toBe(45);
        });
    test("Get yield for corn with high sun and strong wind", () => {
        const highStrongFactor = { sun: "high", wind: "strong"};
        expect(getYieldForPlant(corn, highStrongFactor)).toBe(22.5);
        });
    test("Get yield for corn with medium sun, standard wind and rich soil", () => {
        const mediumStandardRichFactor = { sun: "medium", wind: "standard", soil: "rich"};
        expect(getYieldForPlant(corn, mediumStandardRichFactor)).toBe(60);
        });
    test("Get yield for pumpkin with low sun, little wind and normal soil", () => {
        const lowLittleNormalFactor = { sun: "low", wind: "little", soil: "normal"};
        expect(getYieldForPlant(pumpkin, lowLittleNormalFactor)).toBe(8);
        });
});

describe("getYieldForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
        factor: {
            sun: {
            low: -50,
            medium: 0,
            high: 50,
            },
            wind: {
            little: 50,
            standard: 0,
            strong: -50,
            },
            soil: {
            poor: 0,
            normal: 50,
            rich: 100,
            },
        },
    };
     
    const input = {
        crop: corn,
        numCrops: 10,
    }; 
test("Get yield for crop, simple", () => {
    expect(getYieldForCrop(input)).toBe(30);
    });
test("Get yield for crop corn with low sun, strong wind and normal soil", () => {
    const environmentalFactors = { sun: "low", wind: "strong", soil: "normal"};
    expect(getYieldForCrop(input, environmentalFactors)).toBe(11.25);
    });
});

describe("getTotalYield", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 50,
                },
                wind: {
                little: 50,
                standard: 0,
                strong: -50,
                },
                soil: {
                poor: 0,
                normal: 50,
                rich: 100,
                },
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factor: {
                sun: {
                low: 0,
                medium: 25,
                high: -25,
                },
                wind: {
                little: 100,
                standard: 50,
                strong: 0,
                },
                soil: {
                poor: -50,
                normal: 0,
                rich: 50,
                },
            },
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
    test("Calculate total yield with multiple crops", () => {
        expect(getTotalYield({ crops })).toBe(23);
    }); 
    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
    test("Calculate total yield with multiple crops and factors", () => {
        const environmentalFactors = { sun: "medium", wind: "standard", soil: "rich"};
        expect(getTotalYield({ crops }, environmentalFactors )).toBe(52.5);
    });
});

describe("getCostsForCrop", () => {
        const corn = {
            name: "corn",
            sowingPrice: 1,
        };
        const crops = {
            crop: corn,
            numCrops: 5,
        };
    test("Calculate costs for a crop", () => {
        expect(getCostsForCrop(crops)).toBe(5);
    });
});

describe("getRevenueForCrop", () => {
        const corn = {
            name: "corn",
            yield: 3,
            salesPrice: 2,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 50,
                },
                wind: {
                little: 50,
                standard: 0,
                strong: -50,
                },
                soil: {
                poor: 0,
                normal: 50,
                rich: 100,
                },
            },
        };
        const crops = {
            crop: corn,
            numCrops: 5,
        };
    test("Calculate revenue for crop without factors", () => {
        expect (getRevenueForCrop(crops)).toBe(30)
    });
    test("Get revenue for crop with high sun, standard wind and poor soil", () => {
        const environmentalFactors = { sun: "high", wind: "standard", soil: "poor"};
        expect(getRevenueForCrop(crops, environmentalFactors)).toBe(45);
    });
});

describe("getProfitForCrop", () => {
        const corn = {
            name: "corn",
            yield: 3,
            salesPrice: 2,
            sowingPrice: 1,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 50,
                },
                wind: {
                little: 50,
                standard: 0,
                strong: -50,
                },
                soil: {
                poor: 0,
                normal: 50,
                rich: 100,
                },
            },
        };
        const crops = {
            crop: corn,
            numCrops: 5,
        };
    test("Calculate profit for crop", () => {
        expect (getProfitForCrop(crops)).toBe(25)
    });
    test("Calculate profit for crop with low sun, little wind and poor soil", () => {
        const environmentalFactors = { sun: "low", wind: "little", soil: "poor"};
        expect (getProfitForCrop(crops, environmentalFactors)).toBe(17.5)
    });
});

describe("getTotalProfit", () => {
        const corn = {
            name: "corn",
            yield: 3,
            salesPrice: 2,
            sowingPrice: 1,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 50,
                },
                wind: {
                little: 50,
                standard: 0,
                strong: -50,
                },
                soil: {
                poor: 0,
                normal: 50,
                rich: 100,
                },
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            salesPrice: 4,
            sowingPrice: 2,
            factor: {
                sun: {
                low: 0,
                medium: 25,
                high: -25,
                },
                wind: {
                little: 100,
                standard: 50,
                strong: 0,
                },
                soil: {
                poor: -50,
                normal: 0,
                rich: 50,
                },
            },
        };
        const moneytree = {
            name: "moneytree",
            yield: 1,
            salesPrice: 200,
            sowingPrice: 35,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 25,
                },
                wind: {
                little: 50,
                standard: 0,
                strong: -75,
                },
                soil: {
                poor: 0,
                normal: 0,
                rich: 10,
                },
            },
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
            { crop: moneytree, numCrops: 1 },
        ];
    test("Calculate total profit for multiple crops", () => {
        expect (getTotalProfit({crops})).toBe(218)
    });
    test("Calculate total profit for multiple crops with medium sun, standard wind and normal soil", () => {
        const environmentalFactors = { sun: "medium", wind: "standard", soil: "normal"};
        expect (getTotalProfit({crops}, environmentalFactors)).toBe(261)
    });
});
