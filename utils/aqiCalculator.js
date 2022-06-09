import {COLORS, AQI_LEVEL, AQI_ADVICES, AQI_FACE, AQI_LEVEL_ELEMENT} from '../constants'
import { isInsideArea1, isInsideArea2, calculateDistance } from './optimalRouteFunctions'
import MapaIreca from '../constants/MurciaMapaIreca.json'
import GrafoMapaMurcia from "../constants/GrafoMapaMurcia.json";
//Tablas de calculo del AQI 
const aqiTable = [
    {
        category: 'good',
        lowIndex: 0,
        highIndex: 50,
    },{
        category: 'moderate',
        lowIndex: 51,
        highIndex: 100,
    },{
        category: 'unhealthy for sensitive groups',
        lowIndex: 101,
        highIndex: 150,
    },{
        category: 'unhealthy',
        lowIndex: 151,
        highIndex: 200,
    },{
        category: 'very unhealthy',
        lowIndex: 201,
        highIndex: 300,
    },{
        category: 'hazardous',
        lowIndex: 301,
        highIndex: 500,
    },
]


const pm10Table = [
    {
        category: 'good',
        lowIndex: 0,
        highIndex: 54,
    },{
        category: 'moderate',
        lowIndex: 55,
        highIndex: 154,
    },{
        category: 'unhealthy for sensitive groups',
        lowIndex: 155,
        highIndex: 254,
    },{
        category: 'unhealthy',
        lowIndex: 255,
        highIndex: 354,
    },{
        category: 'very unhealthy',
        lowIndex: 355,
        highIndex: 424,
    },{
        category: 'hazardous',
        lowIndex: 425,
        highIndex: 604,
    },
]

const so2Table = [
    {
        category: 'good',
        lowIndex: 0,
        highIndex: 35,
    },{
        category: 'moderate',
        lowIndex: 36,
        highIndex: 75,
    },{
        category: 'unhealthy for sensitive groups',
        lowIndex: 76,
        highIndex: 185,
    },{
        category: 'unhealthy',
        lowIndex: 186,
        highIndex: 304,
    },{
        category: 'very unhealthy',
        lowIndex: 305,
        highIndex: 604,
    },{
        category: 'hazardous',
        lowIndex: 605,
        highIndex: 1004,
    },
]

const no2Table = [
    {
        category: 'good',
        lowIndex: 0,
        highIndex: 53,
    },{
        category: 'moderate',
        lowIndex: 54,
        highIndex: 100,
    },{
        category: 'unhealthy for sensitive groups',
        lowIndex: 101,
        highIndex: 360,
    },{
        category: 'unhealthy',
        lowIndex: 361,
        highIndex: 649,
    },{
        category: 'very unhealthy',
        lowIndex: 650,
        highIndex: 1249,
    },{
        category: 'hazardous',
        lowIndex: 1250,
        highIndex: 2049,
    },
]

const coTable = [
    {
        category: 'good',
        lowIndex: 0,
        highIndex: 4400,
    },{
        category: 'moderate',
        lowIndex: 4500,
        highIndex: 9400,
    },{
        category: 'unhealthy for sensitive groups',
        lowIndex: 9500,
        highIndex: 12400,
    },{
        category: 'unhealthy',
        lowIndex: 12500,
        highIndex: 15400,
    },{
        category: 'very unhealthy',
        lowIndex: 15500,
        highIndex: 30400,
    },{
        category: 'hazardous',
        lowIndex: 30500,
        highIndex: 50400,
    },
]

const o3Table = [
    {
        category: 'good',
        lowIndex: 0,
        highIndex: 54,
    },{
        category: 'moderate',
        lowIndex: 55,
        highIndex: 70,
    },{
        category: 'unhealthy for sensitive groups',
        lowIndex: 71,
        highIndex: 85,
    },{
        category: 'unhealthy',
        lowIndex: 86,
        highIndex: 105,
    },{
        category: 'very unhealthy',
        lowIndex: 106,
        highIndex: 200,
    },{
        category: 'hazardous',
        lowIndex: 201,
        highIndex: 604,
    },
]

//Valores de conversion
const conversionValues = {
    so2: 2.62,
    no2: 1.88,
    o3: 2.00,
    co: 1.145, 
}

function microgramToPpb(value, pollutant){
    var conversion = null
    
    pollutant == 'so2' ? conversion = conversionValues.so2
            : pollutant == 'no2' ? conversion = conversionValues.no2
            : pollutant == 'o3' ? conversion = conversionValues.o3
            : pollutant == 'co' ? conversion = conversionValues.co
            : conversion = 1

    return value / conversion
}

function ppbToMicrogram(value, pollutant){
    var conversion = null
    
    pollutant == 'so2' ? conversion = conversionValues.so2
            : pollutant == 'no2' ? conversion = conversionValues.no2
            : pollutant == 'o3' ? conversion = conversionValues.o3
            : pollutant == 'co' ? conversion = conversionValues.co
            : conversion = 1

    return value * conversion
}

//Conversion de AQI a concentracion
function aqiToConcentration(aqi, pollutant){

    if (aqi < 0 || aqi == "undefined"){
        return 0
    }
    
    var pollutantTable = null

    //obtenemos la tabla del contaminante en cuestión
    pollutant == 'pm10' ? pollutantTable = pm10Table
            : pollutant == 'so2' ? pollutantTable = so2Table
            : pollutant == 'no2' ? pollutantTable = no2Table
            : pollutant == 'o3' ? pollutantTable = o3Table
            : pollutant == 'co' ? pollutantTable = coTable
            : pollutantTable = pm10Table

    //obtenemos la categoria del aqi, es decir, si está en bueno, moderado etc-
    var categoryIndex = 0
    for (var category of aqiTable){
        if (aqi >= category.lowIndex && aqi <= category.highIndex){
            break
        }
        categoryIndex++
    }

    if(categoryIndex > 5){
        categoryIndex = 0
    }
    var result = (pollutantTable[categoryIndex].highIndex - pollutantTable[categoryIndex].lowIndex) / (aqiTable[categoryIndex].highIndex - aqiTable[categoryIndex].lowIndex) 
    result = result * (aqi - aqiTable[categoryIndex].lowIndex) + pollutantTable[categoryIndex].lowIndex
    return result
}

//Conversion de concentracion a AQI
function concentrationToAqi(concentration, pollutant){

    if (concentration < 0){
        return 0
    }

    var pollutantTable = null

    pollutant == 'pm10' ? pollutantTable = pm10Table
            : pollutant == 'so2' ? pollutantTable = so2Table
            : pollutant == 'no2' ? pollutantTable = no2Table
            : pollutant == 'o3' ? pollutantTable = o3Table
            : pollutant == 'co' ? pollutantTable = coTable
            : pollutantTable = pm10Table

    var categoryIndex = 0
    for (var category of pollutantTable){
        if (concentration >= category.lowIndex && concentration <= category.highIndex){
            break
        }
        categoryIndex++
    }
    
    if(categoryIndex > 5){
        categoryIndex = 0
    }
    var result = (aqiTable[categoryIndex].highIndex - aqiTable[categoryIndex].lowIndex) / (pollutantTable[categoryIndex].highIndex - pollutantTable[categoryIndex].lowIndex) 
    result = result * (concentration - pollutantTable[categoryIndex].lowIndex) + aqiTable[categoryIndex].lowIndex
    return result
}


//Contaminante con mayor AQI
function maxAqi(iaqi) {
    const list = [iaqi.co, iaqi.no2, iaqi.o3, iaqi.pm10, iaqi.so2]
    const pollutants = ['co','no2','o3','pm10','so2']

    var result = {
        maxValue: -1,
        pollutant: ''
    }

    var i = 0
    for (var currentAqi of list){
        if(typeof currentAqi != 'undefined' && currentAqi.v > result.maxValue){
            result.maxValue = currentAqi.v
            result.pollutant = pollutants[i]
        }
        i++
    }
    if(result.maxValue == -1){
        result.maxValue = undefined
    }
    return result
}

//Calcular el AQI basándonos en el mapa de concentración de benceno
function calculateAqi(lat,lng, aqiValue, pollutant) {
    if (aqiValue === undefined) return aqiValue;
    var result = aqiToConcentration(aqiValue, pollutant)

    if(pollutant != 'pm10'){
       result = ppbToMicrogram(result,pollutant)
    }

    //Area mapa de concentracion de benceno
    if(isInsideArea1(lat,lng)) {
        var minDistance = Infinity
        var point = null
        var factori = 0
        var location = {
            latitud: lat,
            longitud: lng,
        }
        for (var currentPoint of GrafoMapaMurcia.puntos){
            const currentDistance = calculateDistance(location,currentPoint)
            if(currentDistance < minDistance){
                minDistance = currentDistance
                point = currentPoint
                factori = currentPoint.factori
            }
        }
    
        result = result * factori
    //Area de factor IRECA
    } else if (isInsideArea2(lat,lng)) {
                var minDistance = Infinity
                var point = null
                var ireca = 0

                for (var currentPoint of MapaIreca.puntos){
                    const currentDistance = calculateDistance(location,currentPoint)
                    if(currentDistance < minDistance){
                        minDistance = currentDistance
                        point = currentPoint
                        ireca = currentPoint.ireca
                    }
                }
                result = result * ireca * 0.7
            } 
  
    if(pollutant != 'pm10'){
        result = microgramToPpb(result,pollutant)
    }
    result = concentrationToAqi(result, pollutant)
    return Math.round(result)
}

//Categoria del AQI
function aqiLevel(aqiValue) {

    return aqiValue >= 0 && aqiValue <= 50 ? AQI_LEVEL.good 
            : aqiValue > 50 && aqiValue <= 100 ? AQI_LEVEL.moderate
            : aqiValue > 100 && aqiValue <= 150 ? AQI_LEVEL.unhealthy_sensgrp
            : aqiValue > 150 && aqiValue <= 200 ? AQI_LEVEL.unhealthy
            : aqiValue > 200 && aqiValue <= 300 ? AQI_LEVEL.very_unhealthy
            : aqiValue > 300 ? AQI_LEVEL.hazardous
            : AQI_LEVEL.unknown
}

function aqiLevelNO2(aqiValue) {

    return aqiValue >= 0 && aqiValue < 20 ? AQI_LEVEL.good 
            : aqiValue >= 20 && aqiValue < 40 ? AQI_LEVEL.moderate
            : aqiValue >= 40 && aqiValue < 60 ? AQI_LEVEL_ELEMENT.unhealthy_sensgrp
            : aqiValue >= 60 && aqiValue < 80 ? AQI_LEVEL.unhealthy
            : aqiValue >= 80 ? AQI_LEVEL.very_unhealthy
            : AQI_LEVEL.unknown
}

function aqiColorNO2(aqiValue) {

    return aqiLevelNO2(aqiValue) == AQI_LEVEL.good ? COLORS.good
            : aqiLevelNO2(aqiValue) == AQI_LEVEL.moderate ? COLORS.moderate
            : aqiLevelNO2(aqiValue) == AQI_LEVEL_ELEMENT.unhealthy_sensgrp ? COLORS.unhealthy_sensgrp
            : aqiLevelNO2(aqiValue) == AQI_LEVEL.very_unhealthy ? COLORS.very_unhealthy
            : aqiLevelNO2(aqiValue) == AQI_LEVEL.unhealthy ? COLORS.unhealthy
            : aqiLevelNO2(aqiValue) == AQI_LEVEL.hazardous ? COLORS.hazardous
            : COLORS.darkgray
}

function aqiLevelSO2(aqiValue) {

        return aqiValue >= 0 && aqiValue < 10 ? AQI_LEVEL.good 
            : aqiValue >= 10 && aqiValue < 20 ? AQI_LEVEL.moderate
            : aqiValue >= 20 && aqiValue < 30 ? AQI_LEVEL_ELEMENT.unhealthy_sensgrp
            : aqiValue >= 30 && aqiValue < 40 ? AQI_LEVEL.unhealthy
            : aqiValue >= 40 ? AQI_LEVEL.very_unhealthy
            : AQI_LEVEL.unknown
}
function aqiColorSO2(aqiValue) {

    return aqiLevelSO2(aqiValue) == AQI_LEVEL.good ? COLORS.good
            : aqiLevelSO2(aqiValue) == AQI_LEVEL.moderate ? COLORS.moderate
            : aqiLevelSO2(aqiValue) == AQI_LEVEL_ELEMENT.unhealthy_sensgrp ? COLORS.unhealthy_sensgrp
            : aqiLevelSO2(aqiValue) == AQI_LEVEL.very_unhealthy ? COLORS.very_unhealthy
            : aqiLevelSO2(aqiValue) == AQI_LEVEL.unhealthy ? COLORS.unhealthy
            : aqiLevelSO2(aqiValue) == AQI_LEVEL.hazardous ? COLORS.hazardous
            : COLORS.darkgray
}
function aqiLevelO3(aqiValue) {

    return aqiValue >= 0 && aqiValue < 60 ? AQI_LEVEL.good 
            : aqiValue >= 60 && aqiValue < 120 ? AQI_LEVEL.moderate
            : aqiValue >= 120 && aqiValue < 180 ? AQI_LEVEL_ELEMENT.unhealthy_sensgrp
            : aqiValue >= 180 && aqiValue < 240 ? AQI_LEVEL.unhealthy
            : aqiValue >= 240 ? AQI_LEVEL.very_unhealthy
            : AQI_LEVEL.unknown
}

function aqiColorO3(aqiValue) {

    return aqiLevelO3(aqiValue) == AQI_LEVEL.good ? COLORS.good
            : aqiLevelO3(aqiValue) == AQI_LEVEL.moderate ? COLORS.moderate
            : aqiLevelO3(aqiValue) == AQI_LEVEL_ELEMENT.unhealthy_sensgrp ? COLORS.unhealthy_sensgrp
            : aqiLevelO3(aqiValue) == AQI_LEVEL.very_unhealthy ? COLORS.very_unhealthy
            : aqiLevelO3(aqiValue) == AQI_LEVEL.unhealthy ? COLORS.unhealthy
            : aqiLevelO3(aqiValue) == AQI_LEVEL.hazardous ? COLORS.hazardous
            : COLORS.darkgray
}
function aqiLevelPM10(aqiValue) {
    return aqiValue >= 0 && aqiValue <= 10 ? AQI_LEVEL.good 
            : aqiValue > 10 && aqiValue <= 30 ? AQI_LEVEL.moderate
            : aqiValue > 30 && aqiValue <= 50 ? AQI_LEVEL_ELEMENT.unhealthy_sensgrp
            : aqiValue > 50 && aqiValue <= 80 ? AQI_LEVEL.unhealthy
            : aqiValue > 80 && aqiValue <= 120 ? AQI_LEVEL.very_unhealthy
            : aqiValue > 120 ? AQI_LEVEL.hazardous
            : AQI_LEVEL.unknown
}

function aqiColorPM10(aqiValue) {

    return aqiLevelPM10(aqiValue) == AQI_LEVEL.good ? COLORS.good
            : aqiLevelPM10(aqiValue) == AQI_LEVEL.moderate ? COLORS.moderate
            : aqiLevelPM10(aqiValue) == AQI_LEVEL_ELEMENT.unhealthy_sensgrp ? COLORS.unhealthy_sensgrp
            : aqiLevelPM10(aqiValue) == AQI_LEVEL.very_unhealthy ? COLORS.very_unhealthy
            : aqiLevelPM10(aqiValue) == AQI_LEVEL.unhealthy ? COLORS.unhealthy
            : aqiLevelPM10(aqiValue) == AQI_LEVEL.hazardous ? COLORS.hazardous
            : COLORS.darkgray
}
function aqiLevelCO(aqiValue) {

    return aqiValue >= 0 && aqiValue <= 5 ? AQI_LEVEL.good 
            : aqiValue > 5 && aqiValue <= 10 ? AQI_LEVEL.moderate
            : aqiValue > 10 && aqiValue <= 15 ? AQI_LEVEL_ELEMENT.unhealthy_sensgrp
            : aqiValue > 15 && aqiValue <= 20 ? AQI_LEVEL.unhealthy
            : aqiValue > 20 && aqiValue <= 40 ? AQI_LEVEL.very_unhealthy
            : aqiValue > 40 ? AQI_LEVEL.hazardous
            : AQI_LEVEL.unknown
}

function aqiColorCO(aqiValue) {

    return aqiLevelCO(aqiValue) == AQI_LEVEL.good ? COLORS.good
            : aqiLevelCO(aqiValue) == AQI_LEVEL.moderate ? COLORS.moderate
            : aqiLevelCO(aqiValue) == AQI_LEVEL_ELEMENT.unhealthy_sensgrp ? COLORS.unhealthy_sensgrp
            : aqiLevelCO(aqiValue) == AQI_LEVEL.very_unhealthy ? COLORS.very_unhealthy
            : aqiLevelCO(aqiValue) == AQI_LEVEL.unhealthy ? COLORS.unhealthy
            : aqiLevelCO(aqiValue) == AQI_LEVEL.hazardous ? COLORS.hazardous
            : COLORS.darkgray
}
//Color del AQI
function aqiColor(aqiValue) {
    return aqiLevel(aqiValue) == AQI_LEVEL.good ? COLORS.good
            : aqiLevel(aqiValue) == AQI_LEVEL.moderate ? COLORS.moderate
            : aqiLevel(aqiValue) == AQI_LEVEL.unhealthy_sensgrp ? COLORS.unhealthy_sensgrp
            : aqiLevel(aqiValue) == AQI_LEVEL.unhealthy ? COLORS.unhealthy
            : aqiLevel(aqiValue) == AQI_LEVEL.very_unhealthy ? COLORS.very_unhealthy
            : aqiLevel(aqiValue) == AQI_LEVEL.hazardous ? COLORS.hazardous
            : COLORS.darkgray
}

//Emoji del AQI
function aqiFace(aqiValue) {
    return aqiLevel(aqiValue) == AQI_LEVEL.good ? AQI_FACE.good
            : aqiLevel(aqiValue) == AQI_LEVEL.moderate ? AQI_FACE.moderate
            : aqiLevel(aqiValue) == AQI_LEVEL.unhealthy_sensgrp ? AQI_FACE.unhealthy_sensgrp
            : aqiLevel(aqiValue) == AQI_LEVEL.unhealthy ? AQI_FACE.unhealthy
            : aqiLevel(aqiValue) == AQI_LEVEL.very_unhealthy ? AQI_FACE.very_unhealthy
            : aqiLevel(aqiValue) == AQI_LEVEL.hazardous ? AQI_FACE.hazardous
            : AQI_FACE.unknown
}

export { maxAqi,ppbToMicrogram,aqiToConcentration,aqiLevel, aqiColor, aqiFace, aqiLevelO3, aqiLevelCO, aqiLevelNO2, aqiLevelPM10, aqiLevelSO2, aqiColorCO, aqiColorNO2, aqiColorO3, aqiColorPM10, aqiColorSO2 ,calculateAqi}