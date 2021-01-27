import express, {
    Request, Response, Application, NextFunction,
} from "express";
import bodyParser from "body-parser";
import { ErrorObject, errorHandler, } from "./services/errorService";

import router from "./routers/index";

const app: Application = express();

app.use(bodyParser.json({ limit: "2mb", },),);

app.use(bodyParser.urlencoded({
    extended: true,
},),);

app.use("/", router,);

app.use((req: Request, res: Response, next: NextFunction,) => {
    next(new ErrorObject(404, "URL not found",),);
},);

app.use(errorHandler,);

const port = process.env.PORT || 1010;

app.listen(port, () => {
    console.log(`App listening on port ${port}`,);
},);
