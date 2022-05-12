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
 * @package     API/Admin/controller
 *
 */

const userModel = require("../../../models/mongoose/users")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const config = require("config");
const _helper = require("../../../Helpers/helpers");
const distributionModel = require("../../../models/mongoose/distribution_center")
const axios = require("axios").default
/**
 * controller to create admin along with password info in admin object
 * @param {object} req
 * @param {object} res
 */
module.exports.createAdmin = async (req, res) => {
	try {
			let { email } = req.body;
			let findByEmail = await userModel.findOne({ email: email });
			if (findByEmail) {
				res.status(400).send({
					code: 2,
					status: false,
					message: "email already exist please try with a different email.",
					payload: e
				})
			}
			let instance = new userModel();
			instance.name.firstName = req.body.firstName;
			instance.name.lastName = req.body.lastName;
			instance.phoneNo = req.body.phoneNo;
			instance.email = req.body.email;
			instance.password = "$2b$10$3LA.y/JSRcUYSAwNRuTLf.rSBU6pdZQyNkjt.b2IVQuxkXxxXuFDC";
			instance.location = req.body.location;
			instance.deviceId = req.body.deviceId||"";
			instance.role = "A"
			instance.dcAttached = [req.body.dcId];
			instance.save((err, data) => {
				if (err) {
					res.status(400).send({
						status: false,
						code: 2,
						message: "Error occured while creating DC Manager.",
						payload: err
					})
				}
				res.status(201).send({
					code: 3,
					status: true,
					message: "DC Manager created sucessfully.",
					payload: data
				})
			})
	
	} catch (e) {
		console.log(e)
		res.status(500).send({
			code: 3,
			status: false,
			message: "Error occured while generating password otp",
			payload: e
		})
	}
}


/**
 * controller to edit admin along with password info in admin object
 * @param {object} req
 * @param {object} res
 */
 module.exports.editAdmin = async (req, res) => {
	try {
			let { adminId } = req.params.adminId;
			let findById = await userModel.findOne({ _id: mongoose.Types.ObjectId(adminId) });
			let encPassword = await _helper.utility.common.encryptPassword(10, req.body.password)
			let instance = new userModel();
			instance.name.firstName = req.body.firstName||findById.name.firstName;
			instance.name.lastName = req.body.lastName||findById.name.lastName;
			instance.phoneNo = req.body.phoneNo||findById.phoneNo;
			instance.email = findById.email;
			instance.password = findById.password;
			// instance.deviceId = req.body.deviceId||"";
			instance.role = findById.role;
			instance.dcAttached = req.body.dcId||findById.dcAttached;
			instance.save((err, data) => {
				if (err) {
					res.status(400).send({
						status: false,
						code: 2,
						message: "Error occured while creating DC Manager.",
						payload: err
					})
				}
				res.status(201).send({
					code: 3,
					status: true,
					message: "DC Manager created sucessfully.",
					payload: data
				})
			})
	
	} catch (e) {
		console.log(e)
		res.status(500).send({
			code: 3,
			status: false,
			message: "Error occured while generating password otp",
			payload: e
		})
	}
}

/**
 * controller to create dc along with password info in dc object
 * @param {object} req
 * @param {object} res
 */
module.exports.createDc = async (req, res) => {
	try {
		
		let instance = new distributionModel();
		console.log(req.body)
		instance.dcName=req.body.dcName
		instance.Address=req.body.Address
		instance.city = req.body.city
		instance.state = req.body.state
		instance.district = req.body.district
		instance.pinCode = req.body.pinCode
		instance.dcContact = req.body.dcContact
		instance.servingPinCodeList=req.body.servingPinCodeList

		// instance.dcContact = req.body.dcContact;
		// instance.location = req.body.location;
		// instance.deliveryPin = req.body.deliveryPin;
		instance.save((err, data) => {
			if (err) {
				res.status(400).send({
					status: false,
					code: 2,
					message: "Error occured while creating dc.",
					payload: err
				})
			}
			res.status(201).send({
				code: 3,
				status: true,
				message: "DC created sucessfully.",
				payload: data
			})
		})
	} catch (e) {
		console.log(e)
		res.status(500).send({
			code: 3,
			status: false,
			message: "Error occured while generating password otp",
			payload: e
		})
	}
}

/**
 * controller to update dc info in dc object
 * @param {object} req
 * @param {object} res
 */
 module.exports.updateDc = async (req, res) => {
	try {
		let dcId = req.params.dcId;
		console.log(dcId)
		console.log(distributionModel.findOne({_id:mongoose.Types.ObjectId(dcId)}).lean())
		distributionModel.findOne({_id:mongoose.Types.ObjectId(dcId)}).exec((err, ins)=>{
			console.log(err)
			if (err) {
				res.status(400).send({
					status: false,
					code: 2,
					message: "Error occured while updating dc.",
					payload: err
				})
			}
			console.log(ins)
			ins.dcName = req.body.dcName||ins.dcName;
			ins.Address = req.body.Address||ins.Address;
			ins.city = req.body.city||ins.city;
			ins.state = req.body.state||ins.state;
			ins.district = req.body.district||ins.district
			ins.pinCode = req.body.pinCode||ins.pinCode
			ins.dcContact = req.body.dcContact||ins.dcContact
			ins.servingPinCodeList=req.body.servingPinCodeList||ins.dcContact
			ins.save();
			res.status(200).send({
				code: 3,
				status: true,
				message: "DC updated sucessfully.",
				payload: ins
			})
		})
	} catch (e) {
		console.log(e)
		res.status(500).send({
			code: 3,
			status: false,
			message: "Error occured while updating dc",
			payload: e
		})
	}
}
/**
 * controller to create admin along with password info in admin object
 * @param {object} req
 * @param {object} res
 */
 module.exports.getDcList = async (req, res) => {
	try {
		let searchStr = req.query.searchstr||false;
		let limit = Number(req.query.limit)||20;
		let sortBy = req.query.sortby||"createdAt";
		let shortOrder = Number(req.query.shortOrder)||-1
		let page = req.query.page||1; 
		let status = req.query.status;
		let qry = {};
		if(searchStr){
			qry["$text"]= { "$search": searchStr }
		}
		if(status){
			qry["isActive"] = status;
		}
		let dcData = distributionModel.find(qry).sort({[sortBy]:shortOrder}).skip(((1-1)*limit)).limit(limit).exec((err, docs)=>{
			if(err){
				res.status(400).send({
					code: 3,
					status: true,
					message: "db error occured while fetching dc",
					payload: err					
				})
			}
			let dataCount = distributionModel.find(qry).count().exec((error, count)=>{
				if(error){
					res.status(400).send({
						code: 3,
						status: true,
						message: "db error occured while fetching dc count ",
						payload: err					
					})
				}
				console.log(dataCount)
				res.set({'limit': limit, "page":page, "total": count });
				res.status(200).send({
					code: 1,
					status: true,
					message: "DC list fetched sucessfully.",
					payload: docs
				})
			})
			

		})
		
	} catch (e) {
		console.log(e)
		res.status(500).send({
			code: 3,
			status: false,
			message: "Error occured while fetching dc",
			payload: e
		})
	}
 }
/**
 * controller to delete dc
 * @param {object} req
 * @param {object} res
 */
 module.exports.deleteDcAdmin  = async (req, res) => {
	try {
		let dcId = req.params.dcId;
		let dcData = await distributionModel.findOneUpdate({ _id:mongoose.Types.ObjectId(dcId) },{$set:{"isDeleted":true}}).exec();
		res.status(200).send({
			code: 3,
			status: true,
			message: "DC deleted sucessfully.",
			payload: dcData
		})
	} catch (e) {
		console.log(e)
		res.status(500).send({
			code: 3,
			status: false,
			message: "Error occured while deleting dc",
			payload: e
		})
	}
}



/**
 * controller to delete dc
 * @param {object} req
 * @param {object} res
 */
 module.exports.getDcAdmin  = async (req, res) => {
	try {
		let dcId = req.params.dcId;
		console.log(dcId)
		let dcData = await distributionModel.findOne({ _id:mongoose.Types.ObjectId(dcId) });
		res.status(200).send({
			code: 3,
			status: true,
			message: "DC fetched sucessfully.",
			payload: dcData
		})
	} catch (e) {
		console.log(e)
		res.status(500).send({
			code: 3,
			status: false,
			message: "Error occured while fetching dc",
			payload: e
		})
	}
}



/**
 * controller to delete dc
 * @param {object} req
 * @param {object} res
 */
module.exports.activateDc = async (req, res) => {
	try {
		let dcId = req.params.dcId;
		console.log(dcId)
		let dcData = await distributionModel.findOne({ _id: mongoose.Types.ObjectId(dcId), isActive: false });
		if (dcData) {
			dcData.isActive = true;
			dcData.save()
			res.status(200).send({
				code: 3,
				status: true,
				message: "DC activated sucessfully.",
				payload: dcData
			})
		} else {
			res.status(400).send({
				code: 3,
				status: true,
				message: "DC is already activated.",
			})
		}
	} catch (e) {
		console.log(e)
		res.status(500).send({
			code: 3,
			status: false,
			message: "Error occured while fetching dc",
			payload: e
		})
	}
}

/**
 * controller to delete dc
 * @param {object} req
 * @param {object} res
 */
 module.exports.deactivateDc = async (req, res) => {
	try {
		let dcId = req.params.dcId;
		console.log(dcId)
		let dcData = await distributionModel.findOne({ _id: mongoose.Types.ObjectId(dcId), isActive: true });
		if (dcData) {
			dcData.isActive = false;
			dcData.save()
			res.status(200).send({
				code: 1,
				status: true,
				message: "DC deactivated sucessfully.",
				payload: dcData
			})
		} else {
			res.status(400).send({
				code: 3,
				status: true,
				message: "DC is already deactivated.",
			})
		}
	} catch (e) {
		console.log(e)
		res.status(500).send({
			code: 4,
			status: false,
			message: "Error occured while dc status update",
			payload: e
		})
	}
}


/**
 * controller to fetch users
 * @param {object} req
 * @param {object} res
 */
 module.exports.getAppUsers = async (req, res) => {
	try {
		let dcId = req.params.dcId;
		console.log(dcId)
		let userData = await userModel.find({ role:true, isActive: true });
			res.status(200).send({
				code: 1,
				status: true,
				message: "App Users fetched sucessfully.",
				payload: userData
			})
	} catch (e) {
		console.log(e)
		res.status(500).send({
			code: 4,
			status: false,
			message: "Error occured while fetching app users",
			payload: e
		})
	}
}

/**
 * controller to fetch state
 * @param {object} req
 * @param {object} res
 */
 module.exports.fetchState = async (req, res) => {
	try {
    const response = await axios({
			method: 'get',
			url: 'https://farmx.co.in:4068/states',
		}).then(data =>{
			res.status(200).send({
				code: 1,
				status: true,
				message: "state fetched sucessfully.",
				payload: data
			})
		});
			
	} catch (e) {
		console.log(e)
		res.status(500).send({
			code: 4,
			status: false,
			message: "Error occured while fetching state",
			payload: e
		})
	}
}



/**
 * controller to change password
 * @param {object} req
 * @param {object} res
 */
 module.exports.changePwd = async (req, res) => {
	try {
			let oldPwd = req.body.oldPwd;
			let newPwd = req.body.newPwd;
			let email = req.body.email;
			let user = await userModel.findOne({[email] : email, role:"A"})
			if(!user){
				res.status(400).send({
					code: 4,
					status: false,
					message: "Admin user not found with this email",
					payload: e
				})
			}

			let isValidPassword = await _helper.utility.common.checkPassword(oldPwd, user.password);
			if(isValidPassword){
				let enc = await _helper.utility.common.encryptPassword(10, newPwd)
				user.password = enc;
				user.save()
				res.status(200).send({
					code: 1,
					status: true,
					message: "Password updated sucessfully.",
					payload: data
			});
			}
			
			
	} catch (e) {
		console.log(e)
		res.status(500).send({
			code: 4,
			status: false,
			message: "Error occured while fetching state",
			payload: e
		})
	}
}


/**
 * controller to forgot login password
 * @param {object} req
 * @param {object} res
 */
 module.exports.forgotPwd = async (req, res) => {
	try {
			let email = req.body.email;
			let user = await userModel.findOne({[email] : email, role:"A"})
			if(!user){
				res.status(400).send({
					code: 4,
					status: false,
					message: "Admin user not found with this email",
					payload: e
				})
			}

			let isValidPassword = await _helper.utility.common.checkPassword(oldPwd, user.password);
			if(isValidPassword){
				let enc = await _helper.utility.common.encryptPassword(10, '123456')
				user.password = enc;
				user.save()
				res.status(200).send({
					code: 1,
					status: true,
					message: "Password reset sucessfully.",
					payload: data
			});
			}
			
	} catch (e) {
		console.log(e)
		res.status(500).send({
			code: 4,
			status: false,
			message: "Error occured while resetting password",
			payload: e
		})
	}
}


/**
 * controller to delete dc
 * @param {object} req
 * @param {object} res
 */
 module.exports.activateAdmin = async (req, res) => {
	try {
		let userId = req.params.userId;
		let userData = await userModel.findOne({ _id: mongoose.Types.ObjectId(userId), isActive: false });
		if (userData) {
			userData.isActive = true;
			userData.save()
			res.status(200).send({
				code: 3,
				status: true,
				message: "admin activated sucessfully.",
				payload: userData
			})
		} else {
			res.status(400).send({
				code: 3,
				status: true,
				message: "admin is already activated.",
			})
		}
	} catch (e) {
		console.log(e)
		res.status(500).send({
			code: 3,
			status: false,
			message: "Error occured while activating admin",
			payload: e
		})
	}
}

/**
 * controller to delete dc
 * @param {object} req
 * @param {object} res
 */
 module.exports.deactivateAdmin = async (req, res) => {
	try {
		let userId = req.params.userId;
		let userData = await userModel.findOne({ _id: mongoose.Types.ObjectId(userId), isActive: true });
		if (userData) {
			userData.isActive = false;
			userData.save()
			res.status(200).send({
				code: 1,
				status: true,
				message: "admin deactivated sucessfully.",
				payload: userData
			})
		} else {
			res.status(400).send({
				code: 3,
				status: true,
				message: "admin is already deactivated.",
			})
		}
	} catch (e) {
		console.log(e)
		res.status(500).send({
			code: 4,
			status: false,
			message: "Error occured while deactivating admin",
			payload: e
		})
	}
}



/**
 * controller to delete dc
 * @param {object} req
 * @param {object} res
 */
 module.exports.getAdminList = async (req, res) => {
	try {
		let userData = await userModel.find({ role: 'A'});
			res.status(200).send({
				code: 1,
				status: true,
				message: "admin list fetched sucessfully.",
				payload: userData
			})
	} catch (e) {
		console.log(e)
		res.status(500).send({
			code: 4,
			status: false,
			message: "Error occured while fetching admin list",
			payload: e
		})
	}
}