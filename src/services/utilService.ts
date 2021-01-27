import { ErrorObject, } from "./errorService";

export default class UtilService {
    static validateInput(input: { [key: string]: any }, isRequired: { [key: string]: string },): void {
        Object.keys(isRequired,).forEach((entry,) => {
            if (input[entry] === undefined || input[entry] === null) {
                throw new ErrorObject(400, isRequired[entry],);
            }
        },);
    }

    static catchAsync(controllerFunction,) {
        return (req, res, next,) => {
            controllerFunction(req, res, next,).catch(next,);
        };
    }
}
