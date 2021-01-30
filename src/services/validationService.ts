import { ErrorObject, } from "./errorService";
import UtilService from "./utilService";

export default class ValidationService {

    static validate(rule: Record<string, any>, data: Record<string, any>,): any {

        if (!ValidationService.isObject(rule,)) throw new ErrorObject(400, "rule should be an object.",);
        if (!ValidationService.isObject(data,) && (typeof data !== "string") && (!Array.isArray(data,))) {
            throw new ErrorObject(400, "data should be a|an object, array or string.",);
        }

        const isRequired = {
            field: "field is required.",
            condition: "condition is required.",
            condition_value: "condition_value is required.",
        };
        UtilService.validateInput(rule, isRequired,);
        if (typeof rule.field !== "string") {
            throw new ErrorObject(400, "field field should be a string.",);
        }
        if (typeof rule.condition !== "string") {
            throw new ErrorObject(400, "field condition should be a string.",);
        }

        let field_value;
        const fieldArray = rule.field.split(".",);

        if (fieldArray.length === 2) {
            if (!data[fieldArray[0]]) throw new ErrorObject(400, `field ${rule.field} is missing from data.`,);
            if (!data[fieldArray[0]][fieldArray[1]]) throw new ErrorObject(400, `field ${rule.field} is missing from data.`,);

            field_value = data[fieldArray[0]][fieldArray[1]];

        } else if (fieldArray.length === 1) {
            if (!data[rule.field]) throw new ErrorObject(400, `field ${rule.field} is missing from data.`,);
            field_value = data[rule.field];
        } else {
            throw new ErrorObject(400, "field nesting should not be more than two levels.",);
        }

        if ((typeof field_value === "number" || typeof rule.condition_value === "number")
            && (typeof field_value === "string" || typeof rule.condition_value === "string")) {
            throw new ErrorObject(400, "Invalid number and string comparison.",);
        }

        if (ValidationService.validationCheck(field_value, rule.condition, rule.condition_value,)) {
            return field_value;
        }
        throw new ErrorObject(400, `field ${rule.field} failed validation.`, {
            validation: {
                error: true,
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
            if (typeof field !== "object" && typeof field !== "string") return false;
            return field.includes(condition_value,);
        default:
            throw new ErrorObject(400, "Invalid condition.",);
        }
    }
}
