function isEmptyObject(aObj) {
    return Object.keys(aObj).length === 0 && aObj.constructor === Object;
}

function getStateColor(aValue) {
    let sColor = {};

    if (aValue < 50) {
        sColor = "#6ad98d";
    } else if (aValue < 80) {
        sColor = "#ffe269";
    } else if (aValue <= 100) {
        sColor = "#dd4f40";
    } else if (isNaN(aValue)) {
        sColor = "#f7f7f7";
    }
    return sColor;
}

//aType = byte 단위 unit 단위 표시 방식
//aShowUnit = 단위를 보여줄것인 안보여줄것인지 키
function getUnit(aValue, aType = "default", aShowUnit = true) {
    let sResult = "";
    const sValue = parseInt(aValue);
    const sKilo = 1000;
    const sMega = 1000000;
    const sGiga = 1000000000;
    const sMillion = 1000000;
    const sKb = 2 ** 10;
    const sMb = 2 ** 20;
    const sGb = 2 ** 30;
    const sTb = 2 ** 40;

    if (aType === "byte") {
        if (sValue >= sTb) {
            sResult = (sValue / sTb).toFixed(0).toLocaleString(); 
            if (aShowUnit) {
                sResult = sResult + ' TB';
            }
        } else if (sValue >= sGb) {
            sResult = (sValue / sGb).toFixed(0).toLocaleString(); 
            if (aShowUnit) {
                sResult = sResult + ' GB';
            }
        } else if (sValue >= sMb) {
            sResult = (sValue / sMb).toFixed(0).toLocaleString(); 
            if (aShowUnit) {
                sResult = sResult + ' MB';
            }
        } else if (sValue >= sKb) {
            sResult = (sValue / sKb).toFixed(0).toLocaleString();
            if (aShowUnit) {
                sResult = sResult + ' KB';
            }
        } else if (sValue < sKb) {
            sResult = sValue.toFixed(0).toLocaleString(); 
            if (aShowUnit) {
                sResult = sResult + ' byte';
            }
        }
    } else if (aType === "unit") {
        if (sValue < sKilo) {
            sResult = sValue.toFixed(0).toLocaleString();
            if (aShowUnit) {
                sResult = sResult + ' ';
            }
        } else if (sValue >= sGiga) {
            sResult = (sValue / sMillion).toFixed(0).toLocaleString();
            if (aShowUnit) {
                sResult = sResult + ' G';
            }
        } else if (sValue >= sMega) {
            sResult = (sValue / sMillion).toFixed(0).toLocaleString();
            if (aShowUnit) {
                sResult = sResult + ' M';
            }
        } else if (sValue >= sKilo) {
            sResult = (sValue / sKilo).toFixed(0).toLocaleString();
            if (aShowUnit) {
                sResult = sResult + ' K';
            }
        }
    } else {
        sResult = sValue.toLocaleString();
    }

    return sResult;
}

function limitLength(aStr, aLimit, aDirection = 'right') {
    const sStrArr = aStr !== undefined ? (aDirection === 'right' ? aStr.split('') : aStr.split('').reverse()) : '';
    let sResult = '';

    if (sStrArr.length <= aLimit) return aStr;

    sStrArr.reduce((aAcc, aCur) => {
        let sWeight = 0;

        if (aAcc <= aLimit - 3) {
            sWeight = aCur === aCur.toLowerCase() ? 1 : 2; // small letter -> weight 1, large letter -> weight 2
            sResult += aCur;
        }

        return aAcc + sWeight;
    }, 0);

    return aDirection === 'left' ? `...${sResult}` : `${sResult}...`;
}


function transString(aVal) {
    return aVal ? aVal.toString().toUpperCase() : "";
}

function arrayDuplicateCheck(aArr) {
    const sCheckDuplicate = aArr.some(aItem => {
        return aArr.indexOf(aItem) !== aArr.lastIndexOf(aItem);
    });

    return sCheckDuplicate;
}
export {
    isEmptyObject,
    getStateColor,
    getUnit,
    transString,
    arrayDuplicateCheck,
    limitLength
}