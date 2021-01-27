import { Request, Response, } from "express";
import UtilService from "../services/utilService";
import ValidationService from "../services/validationService";

export default class ValidationController {

    static async base(req: Request, res: Response,): Promise<Response> {
        return res.status(200,).send({
            message: "My Rule-Validation API",
            status: "success",
            data: {
                name: "Isaac Olawale",
                github: "@bodolawale",
                email: "bodolawale@gmail.com",
                mobile: "08149916606",
                twitter: "@bodolawale",
            },
        },);
    }

    static async validate(req: Request, res: Response,): Promise<Response> {
        const { body, } = req;
        const isRequired = {
            rule: "rule is required.",
            data: "data is required.",
        };
        UtilService.validateInput(body, isRequired,);
        const field_value = ValidationService.validate(body.rule, body.data,);
        return res.status(200,).send({
            message: `field ${body.rule.field} was successfully validated.`,
            status: "success",
            data: {
                validation: {
                    error: "false",
                    field: body.rule.field,
                    field_value,
                    condition: body.rule.condition,
                    condition_value: body.rule.condition_value,
                },
            },
        },);
    }
}
