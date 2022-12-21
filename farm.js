// klaar // bereken de opbrengst van een plant in kilo's. 

const getYieldForPlant = (plant, environmentalFactors) => {
    if (!environmentalFactors){
        return plant.yield;
    }
    sumForValue = (factor) => {
        if (!factor) {
            return 1;
        } else {
            return (100 + factor) / 100;
        }
    };
    const sunFactor = environmentalFactors.sun;
    const sunValue = sumForValue(plant.factor.sun[sunFactor]);
    const windFactor = environmentalFactors.wind;
    const windValue = sumForValue(plant.factor.wind[windFactor]);
    const soilFactor = environmentalFactors.soil;
    const soilValue = sumForValue(plant.factor.soil[soilFactor]);

    const sumGetYieldForPlant = plant.yield * sunValue * windValue * soilValue;
    return sumGetYieldForPlant;
}

// klaar // bereken de opbrengst voor het gewas.

const getYieldForCrop = (plant, environmentalFactors) => {
    if (!environmentalFactors){
        return getYieldForPlant(plant.crop) * plant.numCrops;
    } else {
        const yieldForCropWithFactors = getYieldForPlant(plant.crop, environmentalFactors) * plant.numCrops;
        return yieldForCropWithFactors;
    }
} 

// andere uikomst met environmentalFactors // bereken de totale opbrengst (aantal kilo).

const getTotalYield = (plant, environmentalFactors) => {
    if (environmentalFactors === undefined) {
    let totalYield = 0;
    plant.crops.forEach((plant) => {
        //totalYield += veggie.crop.yield * veggie.numCrops;
        totalYield += getYieldForCrop(plant);
    });
    return totalYield;
    } else {
        let totalYieldWithFactors = 0;
        plant.crops.forEach((plant) => {
            totalYieldWithFactors += getYieldForCrop(plant, environmentalFactors);
        })
        return totalYieldWithFactors; 
    }
}

// klaar // calculate the cost for a crop.

const getCostsForCrop = (plant) => {
    return plant.crop.sowingPrice * plant.numCrops;
}

// klaar // calculate the revenue for a crop: 

const getRevenueForCrop = (plant, environmentalFactors) => {
    if (!environmentalFactors) {
    //const sumRevenueForCrop = ((plant.crop.yield * plant.numCrops) * plant.crop.salesPrice);
    const sumRevenueForCrop = (getYieldForCrop(plant) * plant.crop.salesPrice);
    return sumRevenueForCrop;
    } else {
        const revenueWithFactors = (getYieldForCrop(plant, environmentalFactors) * plant.crop.salesPrice);
        return revenueWithFactors;
    }
} 

// klaar // calculate the profit for a crop:

const getProfitForCrop = (plant, environmentalFactors) => {
    if (!environmentalFactors) { 
    const sumProfitForCrop = (getRevenueForCrop(plant) - getCostsForCrop(plant));
    return sumProfitForCrop;
    } else {
        const ProfitForCropWithFactors = (getRevenueForCrop(plant, environmentalFactors) - getCostsForCrop(plant));
        return ProfitForCropWithFactors;
    }
}  

// andere uitkomst met environmentalFactors // calculate the profit for multiple crops: 
const getTotalProfit = (money, environmentalFactors) => {
    if (!environmentalFactors) {
    let totalProfit = 0;
    money.crops.forEach((plant) => {
        //const sumRevenue =  ((plant.crop.yield * plant.numCrops) * plant.crop.salesPrice);
        //const sumCosts = plant.crop.sowingPrice * plant.numCrops;
        //totalProfit += sumRevenue - sumCosts;
        totalProfit += getProfitForCrop(plant);
    });
    return totalProfit;
    } else {
        let totalProfitWithFactors = 0;
    money.crops.forEach((plant) => {
        totalProfitWithFactors += getProfitForCrop(plant, environmentalFactors);
    });
    return totalProfitWithFactors;
    }
}

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
};
