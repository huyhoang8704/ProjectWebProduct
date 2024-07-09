const mongoose = require("mongoose");

const Settingschema = new mongoose.Schema(
    {
        websiteName: String,
        logo : String,
        phone : String,
        email : String,
        address : String,
        copyright : String,
    },
    {
        timestamps : true
    }
);


const Settings = mongoose.model("Settings",Settingschema,"settings-general") // argu3 là tên connection trong db


module.exports = Settings;
