const Settings = require('../../models/settings-general')


module.exports.requireAuth = async (req , res, next) => {
    const settingsGeneral = await Settings.findOne({})
    res.locals.settingsGeneral = settingsGeneral;

    next();

}