const Settings = require('../../models/settings-general')
const filterStatusHelpers = require("../../helpers/filterStatus");
const searchHelpers = require("../../helpers/search");
const paginationHelpers = require("../../helpers/pagination");
const systemConfig = require("../../config/system")
const createTreeHelpers = require("../../helpers/createTree")




module.exports.general = async (req, res) => {
    const settingsGeneral = await Settings.findOne({});


    res.render('admin/pages/settings/general.pug', {
        pageTitle: "Thiết lập website",
        setting : settingsGeneral,
    })
}

module.exports.generalPatch = async (req, res) => {
    const { websiteName, logo, phone, email, address, copyright } = req.body
    const settingsGeneral = await Settings.findOne({});
    if(settingsGeneral) {
        await Settings.updateOne({
            _id : settingsGeneral.id
        }, req.body)
    } else {
        const settings = new Settings(req.body)
        await settings.save()
    }




    req.flash('success', 'Cập nhật thành công!')
    res.redirect('back')
}