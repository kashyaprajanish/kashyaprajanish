/* Copyright (C) 2021 Farmx retail app. All Rights Reserved
 *
 * The file can not be copied and/or distributed without the express
 * permission of copyright owner.
 *
 * NOTICE: All information contained herein is, and remains the property of
 * Farmx PVT LTD., Incorporated and its suppliers if any. The intellectual
 * and technical concepts contained herein are proprietary to Farmx PVT LTD.
 * and its suppliers and may be covered by India. and Local Patents, patents
 * in process, and are protected by trade secret or copyright law. Dissemination
 * of this information or reproduction of this material is strictly forbidden
 * unless prior written permission is obtained from copyright owners
 *
 *
 * @author      Rajanish <rajanish.mishra@efarmexchange.com>
 * @package     app
 *
 */

const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const http = require("http");
const config = require("config");
const appRoutes = require("./routes/index");
const mongoose = require("./database/mongo");
// const seeder =  require('./database/mongoseeder')// seeder added to create super admin
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json")

// const _middlewares = require("Middleware/middleware");

// const notify = require("./Helper/Utilities/notify")
const app = express();
var schedule = require("node-schedule");


// Log requests to the console

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public/build")));
app.use("/uploads", express.static(path.join(__dirname, "/src/public")));
app.use(cors())
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Header", "*");
	next();
})
// app.use("/", _middlewares.api.auth.isAuthorized, appRoutes);
app.use("/", appRoutes);
app.use(helmet());
app.use(logger("dev"))



app.get("/*", function (req, res) {
	res.sendFile(path.join(__dirname + "public/build/index.html"));
})

const port = process.env.PORT || 3000;
app.set("port", port);

const server = http.createServer(app);
server.listen(port, (err, data) => {
	console.log(`server running on port ${port}`)
})

module.exports = app;