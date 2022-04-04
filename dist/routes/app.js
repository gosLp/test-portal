"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function routes(app) {
    app.get("/check", (req, res) => {
        return res.send("App is healthy");
    });
}
exports.default = routes;
//# sourceMappingURL=app.js.map