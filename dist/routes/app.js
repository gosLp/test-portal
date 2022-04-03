"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const company_controller_1 = require("../controllers/company.controller");
function routes(app) {
    app.get("/check", (req, res) => {
        return res.send("App is healthy");
    });
    app.post('/api/company', company_controller_1.createCompany);
}
exports.default = routes;
//# sourceMappingURL=app.js.map