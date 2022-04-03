"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const app_1 = __importDefault(require("../src/routes/app"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
const port = config_1.default.get("port");
app.use((0, cors_1.default)({
    origin: config_1.default.get("corsOrigin"),
}));
app.use(body_parser_1.default.json());
app.use('/users', user_1.default);
app.listen(port, () => {
    console.log(`Application listening at http://localhost:${port}`);
    (0, db_1.default)();
    (0, app_1.default)(app);
});
//# sourceMappingURL=index.js.map