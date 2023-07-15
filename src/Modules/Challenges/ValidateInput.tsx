export const validateInputBasedOnOption = (param: any) => (_: any, value: any, callback: any) => {
    if (param === 'integer' && (!value || !Number.isInteger(Number(value)))) {
        callback('Please enter a valid integer');
    } else if (param === 'string' && (!value || typeof value !== 'string')) {
        callback('Please enter a valid string');
    } else if (param === 'boolean' && (value !== true && value !== false)) {
        callback('Please enter a valid boolean value');
    }else if (param === 'array of integers') {
        try {
            const parsedValue = JSON.parse(value);

            if (!Array.isArray(parsedValue) || !parsedValue.every((item) => Number.isInteger(Number(item)))) {
                callback('Input should be an array of integers');
            }
        } catch (error) {
            callback('Invalid input format');
        }
    } else if (param === 'array of strings') {
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