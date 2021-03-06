var Config = require('../../config');
var URL = require('url');
var csrf = require('csurf');
var Dataset = require('../db/dataset');
var mongoose = require('mongoose');

//每個dataset存成一個collection，必免資料太大存取很慢
var ImageSchema = require("../db/imageSchema");

var util = {};

util.StoreIntentUrl = function(req, res, next){
	if(req.query.intentUrl){
		req.session.intentUrl = decodeURIComponent(req.query.intentUrl);
	}
	next();
}

util.RetrieveIntentUrl = function(req){
	if(req.session.intentUrl){
		var url = req.session.intentUrl;
		var urlParse = URL.parse(url);
		delete req.session.intentUrl;
		//avoid explicit specify hostname
		if(!urlParse.hostname) return url;
		else return "/";
	}
	else return "/";
};

util.RandomInt = function(max) {
	return Math.floor(Math.random() * Math.floor(max));
};

util.CheckLogin = function (req, res, next) {
	if (req.isAuthenticated()) return next();
	var isAjax = req.xhr;
	if(isAjax) res.send({"status":"fail","message":"please login"});
	else res.redirect("/login?intentUrl="+encodeURIComponent(req.originalUrl));
};

util.CheckAdmin = function (req, res, next) {
	if(req.user){
		if (req.user.authType == "admin") return next();
	}
	var isAjax = req.xhr;
	if(isAjax) res.send({"status":"fail","message":"permission denied"});
	else res.redirect("/?message="+encodeURIComponent("權限不足"));
};

util.CheckMaster = function (req, res, next) {
	function PermissionDenied(){
		var isAjax = req.xhr;
		if(isAjax) res.send({"status":"fail","message":"permission denied"});
		else res.redirect("/?message="+encodeURIComponent("權限不足"));
	}
	if(req.user){
		if (req.user.authType == "admin") return next();
		var id = req.query.dataset || req.body.dataset;
		if(!id) return PermissionDenied();

		Dataset.findOne({"_id": id}, function(err, dataset) {
			if(err){
				console.log(err);
				return PermissionDenied();
			}
			if(!dataset) return PermissionDenied();
			var isMaster = dataset.master.filter(function(master){
				return req.user._id.toString() == master._id.toString();
			});
			if(isMaster.length > 0) return next();
			else return PermissionDenied();
		});
	}
	else PermissionDenied();
	
};

util.CheckImageEdit = function (req, res, next) {
	function PermissionDenied(){
		var isAjax = req.xhr;
		if(isAjax) res.send({"status":"fail","message":"permission denied"});
		else res.redirect("/?message="+encodeURIComponent("權限不足"));
	}
	if(req.user){
		if (req.user.authType == "admin") return next();
		var id = req.query.dataset || req.body.dataset;
		if(!id) return PermissionDenied();

		Dataset.findOne({"_id": id}, function(err, dataset) {
			if(err){
				console.log(err);
				return PermissionDenied();
			}
			if(!dataset) return PermissionDenied();
			var isMaster = dataset.master.filter(function(master){
				return req.user._id.toString() == master._id.toString();
			});
			if(isMaster.length > 0) return next();
			else{
				//確認是否為使用者自己上傳的影像
				var Image = mongoose.model("image"+id, ImageSchema);
				Image.findOne({_id:req.body.image},function(err, image){
					if(err){
						console.log(err);
						return PermissionDenied();
					}
					if(!image) return PermissionDenied();
					if(req.user._id.toString() == image.uploader.toString()){
						return next();
					}
					return PermissionDenied();
				});
			}
		});
	}
	else PermissionDenied();
	
};

util.CheckBlacklist = function (req, res, next) {
	if(req.user){
		if (req.user.status != "blacklist") return next();
	}
	var isAjax = req.xhr;
	if(isAjax) res.send({"status":"fail","message":"blacklist"});
	else res.redirect("/?message="+encodeURIComponent("黑名單使用者無此權限"));
};

util.FailRedirect = function(req, res, redirect, message){
	var isAjax = req.xhr;
	if(isAjax) return res.send({"status":"fail","message":message});
	else return res.redirect(redirect+"?message="+encodeURIComponent(message));
};

util.UpdateDatasetStatistic = function(param){
	return new Promise(function(resolve, reject) {
		var Image = mongoose.model("image"+param.dataset, ImageSchema);
		Image.aggregate([
			{$group: {
				_id:null,
				picNum: {$sum:1},
				annotationNum: {
					$sum: {
						$cond: [{$ne: ["$annotation", null]}, 1, 0]
					}
				},
			}},
			{$project:{ _id:0}}
		],function(err, result){
			if(!result) return reject({err:"aggregate image statistic fail"});
			if(result.length == 0){
				result.push({picNum:0,annotationNum:0});
			}
			Dataset.updateOne({_id:param.dataset},result[0],function(err,dataset){
				if(err){
					console.log(err);
					return reject({err:"update dataset fail"});
				}
				return resolve();
			});
		});
	});
}


util.CSRF = csrf();

module.exports = util;
