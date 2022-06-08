import {COLORS} from '../constants'

function colorDisnea(val) {
    return val < 3 && val >= 0 ? COLORS.good 
            : val < 5 && val > 2 ? COLORS.moderate 
            : val < 7 && val > 4 ? COLORS.unhealthy_sensgrp
            : val < 9 && val > 6 ? COLORS.unhealthy
            : val < 11 && val > 8 ? COLORS.very_unhealthy
            : COLORS.darkgray
}

function colorEspirometria(val) {
    return (val < 20 && val >= 0 && val != null) ? COLORS.very_unhealthy
            : val <=40 && val >= 20 ? COLORS.unhealthy
            : val <= 60 && val > 40 ? COLORS.unhealthy_sensgrp
            : val <= 80 && val > 60 ? COLORS.moderate
            : val > 80 ? COLORS.good
            : COLORS.darkgray
}

function colorSaturacion(val) {
    
    return (val < 80 && val != null) ? COLORS.very_unhealthy
            : val <85 && val >= 80 ? COLORS.unhealthy
            : val < 90 && val >= 85 ? COLORS.unhealthy_sensgrp
            : val < 95 && val >= 90 ? COLORS.moderate
            : val <= 100 && val >= 95 ? COLORS.good
            : COLORS.darkgray
}

function colorFreqCardiaca(val) {
    return val <= 70 && val > 50 ? COLORS.good
            : val <=80 && val > 70 ? COLORS.moderate
            : val <=100 && val > 80 ? COLORS.unhealthy_sensgrp
            : val <=120 && val > 100 ? COLORS.unhealthy
            : val > 120 ? COLORS.very_unhealthy
            : COLORS.darkgray
}

function colorNivelSueño(val) {
    return val == 5 ? COLORS.good
            : val == 4 ? COLORS.moderate
            : val == 3 ? COLORS.unhealthy_sensgrp
            : val == 2 ?  COLORS.unhealthy
            : val == 1 ?  COLORS.very_unhealthy
            : COLORS.darkgray
}

function isDisneaDangerous(val) {
    return val > 6;
}

function isNivelSueñoDangerous(val) {
    return val <= 2;
}

function isEspirometriaDangerous(val) {
    return val <= 40;
}

function isFreqCardiacaDangerous(val) {
    return val > 100;
}

function isSaturacionDangerous(val) {
    console.log(val);
    return val < 85;
}

function isDisneaSensgrp(val) {
    return val < 7 && val > 4;
}

function isEspirometriaSensgrp(val) {
    return val <= 60 && val > 40;
}

function isFreqCardiacaSensgrp(val) {
    return val <=100 && val > 80;
}

function isNivelSueñoSensgrp(val) {
    return val == 3;
}

function isSaturacionSensgrp(val) {
    return val < 90 && val >= 85;
}


export { 
    colorDisnea,colorEspirometria, colorSaturacion, colorFreqCardiaca, colorNivelSueño, isDisneaDangerous, isEspirometriaDangerous, isFreqCardiacaDangerous, isSaturacionDangerous, isNivelSueñoDangerous, isDisneaSensgrp, isEspirometriaSensgrp, isFreqCardiacaSensgrp, isNivelSueñoSensgrp, isSaturacionSensgrp
}