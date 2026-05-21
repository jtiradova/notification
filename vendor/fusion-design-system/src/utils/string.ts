import _camelCase from "lodash.camelcase";
import _upperFirst from "lodash.upperfirst";

export const camelCase = _camelCase;

export const upperFirst = _upperFirst;

export const pascalCase = (str: string) => {
    return upperFirst(camelCase(str));
};
