export const validateInputBasedOnOption = (param: any) => (_: any, value: any, callback: any) => {
    if (param === 'number' && (!value || !Number.isInteger(Number(value)))) {
        callback('Please enter a valid integer');
    } else if (param === 'string' && (!value || typeof value !== 'string')) {
        callback('Please enter a valid string');
    } else if (param === 'boolean' && (value !== 'true' && value !== 'false')) {
        callback('Please enter a valid boolean value');
    }else if (param === 'arrayOfNumber') {
        try {
            const parsedValue = JSON.parse(value);

            if (!Array.isArray(parsedValue) || !parsedValue.every((item) => Number.isInteger(Number(item)))) {
                callback('Input should be an array of numbers');
            }
        } catch (error) {
            callback('Invalid input format');
        }
    } else if (param === 'arrayOfString') {
        try {
            const parsedValue = JSON.parse(value);

            if (!Array.isArray(parsedValue) || !parsedValue.every((item) => typeof item === 'string')) {
                callback('Output should be an array of strings');
            }
        } catch (error) {
            callback('Invalid output format');
        }
    }
    callback();
};