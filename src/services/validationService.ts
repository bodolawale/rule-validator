import { ErrorObject, } from "./errorService";
import UtilService from "./utilService";

export default class ValidationService {

    static validate(rule: Record<string, any>, data: Record<string, any>,): {
        field: any, field_value: any
    } {

        if (!ValidationService.isObject(rule,)) throw new ErrorObject(400, "rule should be an object.",);

        const isRequired = {
            field: "field is required.",
            condition: "condition is required.",
            condition_value: "condition_value is required.",
        };
        UtilService.validateInput(rule, isRequired,);
        if (typeof rule.field !== "string") {
            throw new ErrorObject(400, "field rule should be a string",);
        }
        if (typeof rule.condition !== "string") {
            throw new ErrorObject(400, "field condition should be a string",);
        }

        let field_value;
        const fieldArray = rule.field.split(".",);

        if (fieldArray.length === 2) {
            if (!data[fieldArray[0]]) throw new ErrorObject(400, `field ${rule.field} is missing from data.`,);
            if (!data[fieldArray[0]][fieldArray[1]]) throw new ErrorObject(400, `field ${rule.field} is missing from data.`,);

            field_value = data[fieldArray[0]][fieldArray[1]];

        } else {
            if (!data[rule.field]) throw new ErrorObject(400, `field ${rule.field} is missing from data.`,);
            field_value = data[rule.field];
        }
        if (typeof field_value !== typeof rule.condition_value) {
            throw new ErrorObject(400, `${rule.field} should be a|an ${typeof rule.condition_value}`,);
        }
        if (ValidationService.validationCheck(field_value, rule.condition, rule.condition_value,)) {
            return { field: rule.field, field_value, };
        }
        throw new ErrorObject(400, `field ${rule.field} failed validation.`, {
            validation: {
                error: "true",
                field: rule.field,
                field_value,
                condition: rule.condition,
                condition_value: rule.condition_value,
            },
        },);

    }

    private static isObject(obj,) {
        const objectConstructor = ({}).constructor;
        return obj.constructor === objectConstructor;
    }

    private static validationCheck(field: any, condition: string, condition_value: any,): any {
        switch (condition) {
        case "eq":
            return field === condition_value;
        case "neq":
            return field !== condition_value;
        case "gt":
            return field > condition_value;
        case "gte":
            return field >= condition_value;
        case "contains":
            return field.includes(condition_value,);
        default:
            throw new ErrorObject(400, "Invalid condition.",);
        }
    }
}
