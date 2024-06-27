require("dotenv/config");
const config = require("../../config");


const runner = async(app) => {
    try {
        const port = config.port;
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        })
    } catch (error) {
        console.log("Failed to start the server:",error);
        process.exit(1);
    }
}

module.exports = runner;