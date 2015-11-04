/*
Type checking */

export default function type(value) {
    return typeTag(value).slice(8, -1);
}

export function typeTag(value) {
    return Object.prototype.toString.call(value);
}

function typeCheckFactory(referenceValue) {
    const referenceType = typeTag(referenceValue);
    return function(value) {
        return typeTag(value) === referenceType;
    };
}

export const isUndefined = function(value) {
    if (arguments.length >= 1) return value === undefined;
};
export const isNull = typeCheckFactory(null);
export const isBoolean = typeCheckFactory(true);
export const isNumber = typeCheckFactory(1);
export const isString = typeCheckFactory('');
export const isRegExp = typeCheckFactory(/()/);
export const isObject = typeCheckFactory({});
export const isArray = typeCheckFactory([]);
export const isFunction = typeCheckFactory(() => {});
export const isArguments = typeCheckFactory((function() {return arguments;})());
export const isDate = typeCheckFactory(new Date());
export const isSymbol = typeCheckFactory(Symbol());

export function isPrimitive(value) {
    if (arguments.length >= 1) return (
        value === undefined || value === null || value === true || value === false || typeof value === 'number' || typeof value === 'string' || isSymbol(value)
    );
}

export function isNil(value) {
    if (arguments.length >= 1) return value === undefined || value === null;
}

export function isNaN(value) {
    return isNumber(value) && value !== value;
}

export function isFiniteNumber(number) {
    return (
        isNumber(number) && number !== Infinity && number !== -Infinity && !isNaN(number)
    );
}

export function isNegativeNumber(number) {
    return isNumber(number) && number < 0;
}
