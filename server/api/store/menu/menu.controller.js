var Menu = require('./menu.model');
var Food = require('./food.model');
var ResponseService = require.main.require('./services/response.service');
var q = require('q');
var mongoose = require('mongoose');
var getSlug = require('speakingurl');
var CreateObjectIdService = require.main.require('./services/create_object_id.service');

var MenuController = {

	index: function(req,res) {
		var query_active = { store_id: CreateObjectIdService.generate(req.auth.store_id), active: 1 };
		var query_non_active = { store_id: CreateObjectIdService.generate(req.auth.store_id), active: 0 };
		return new Promise(function(resolve,reject){
			Menu.find(query_non_active,function(err,listMenuNonActive){
				if(err){
					reject({err:err, message:'SOME_THING_WENT_WRONG'})
				}else{
					resolve(listMenuNonActive);
				}
			});
		}).then(function(listMenuNonActive){
			Menu.find(query_active,function(err,listMenuActive){
				if(err){
					ResponseService.json(res, false, err, 'MESSAGE.SOME_THING_WENT_WRONG');
				}else{
					if(listMenuActive.length > 0){
						var firstMenuActive = listMenuActive[0];
						Food.find({ store_id: CreateObjectIdService.generate(req.auth.store_id), menu_id: CreateObjectIdService.generate(firstMenuActive._id) },function(err,listFood){
							if(err){
								ResponseService.json(res, false, err, 'MESSAGE.SOME_THING_WENT_WRONG');
							}
							if(listFood.length > 0) {
								ResponseService.json(res, true, {listMenuActive:listMenuActive,listMenuNonActive: listMenuNonActive, listFood: listFood});
							}
							if(listFood.length == 0){
								ResponseService.json(res, true, {listMenuActive:listMenuActive,listMenuNonActive: listMenuNonActive, listFood: []});
							}
						})
					}else{
						ResponseService.json(res, true, {listMenuActive:[],listMenuNonActive: listMenuNonActive, listFood: []});
					}
				}
			})
		},function(rejected){
			ResponseService.json(res, false, rejected.err, rejected.message);
		});
	},

	store: function(req,res) {
		req.checkBody('name','MESSAGE.NAME_REQUIRED').notEmpty();
		var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
        	Menu.findOne({ name: req.body.name, store_id: CreateObjectIdService.generate(req.auth.store_id) }, function(err,result){
        		if(err){
        			ResponseService.json(res, false, err, 'MESSAGE.SOME_THING_WENT_WRONG');
        		}
        		if(result){
        			ResponseService.json(res, false, errors, 'MESSAGE.MENU_DO_NOT_EXISTS');
        		}
        		if(!result){
        			var data = {
		        		name: req.body.name,
		        		slug: getSlug(req.body.name),
		        		description: req.body.description,
		        		created_at: Date.now(),
		        		created_by: CreateObjectIdService.generate(req.auth._id),
		        		updated_by: CreateObjectIdService.generate(req.auth._id),
		        		store_id: CreateObjectIdService.generate(req.auth.store_id)
		        	}
		        	var menu = new Menu(data);
		        	menu.save(function(err,memu){
		        		if(err){
		        			ResponseService.json(res, false, err, 'MESSAGE.SOME_THING_WENT_WRONG');
		        		}
		        		if(menu){
		        			ResponseService.json(res, true, memu, 'MESSAGE.CREATE_SUCCESS');
		        		}
		        		if(!menu){
		        			ResponseService.json(res, true, memu, 'MESSAGE.CREATE_FAILED');
		        		}
		        	})
        		}
        	});
        }
	},

	update: function(req,res) {
		req.checkBody('name','MESSAGE.NAME_REQUIRED').notEmpty();
		req.checkParams('menu_id','MESSAGE.PARAMS_REQUIRED').notEmpty();
		var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
        	Menu.findOne({ _id: CreateObjectIdService.generate(req.params.menu_id), store_id: CreateObjectIdService.generate(req.auth.store_id) }, function(err,result){
        		if(err){
        			ResponseService.json(res, false, err, 'MESSAGE.SOME_THING_WENT_WRONG');
        		}
        		if(result){
        			Menu.findOne({ store_id: CreateObjectIdService.generate(req.auth.store_id), name: req.body.name }, function(err,menu){
        				if(err){
        					ResponseService.json(res, false, err, 'MESSAGE.SOME_THING_WENT_WRONG');
        				}
        				if(!menu){
        					result.name = req.body.name,
        					result.slug = getSlug(req.body.name),
        					result.description = req.body.description,
        					result.updated_by = CreateObjectIdService.generate(req.auth._id),
        					result.save(function(err,saveResult){
        						ResponseService.json(res, true, saveResult, 'MESSAGE.UPDATE_SUCCESS');
        					});
        				}if(menu){
        					if(result.name == menu.name){
        						result.description = req.body.description;
        						result.save(function(err,saveResult){
        							if(err){
        								ResponseService.json(res, false, err, 'MESSAGE.SOME_THING_WENT_WRONG');
        							}else{
	        							ResponseService.json(res, true, saveResult, 'MESSAGE.UPDATE_SUCCESS');
        							}
	        					});
        					}else{
        						ResponseService.json(res, false, '', 'MESSAGE.MENU_DO_NOT_EXISTS');
        					}
        				}
        			})
        		}
        		if(!result){
		        	ResponseService.json(res, false, memu, 'MESSAGE.DATA_NOT_FOUND');
        		}
        	});
        }
	},

	show: function(req,res) {
		req.checkParams('menu_id','MESSAGE.PARAMS_REQUIRED').notEmpty();
		req.checkQuery('type','MESSAGE.QUERY_REQUIRED').notEmpty();
		var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
        	Menu.findOne({ _id: CreateObjectIdService.generate(req.params.menu_id), store_id: CreateObjectIdService.generate(req.auth.store_id) }, function(err,menu){
				if(err){
					ResponseService.json(res, false, err, 'MESSAGE.SOME_THING_WENT_WRONG');
				}
				if(!menu){
					ResponseService.json(res, false, null, 'MESSAGE.DATA_NOT_FOUND');
				}if(menu){
					if(req.query.type == 'menu-with-food'){
						Food.find({ store_id: CreateObjectIdService.generate(req.auth.store_id), menu_id: CreateObjectIdService.generate(menu._id) },function(err,food){
							if(err){
								ResponseService.json(res, false, err, 'MESSAGE.SOME_THING_WENT_WRONG');
							}
							if(food.length > 0) {
								ResponseService.json(res, true, {menu:menu, food: food});
							}
							if(food.length == 0){
								ResponseService.json(res, true, {menu:menu, food: []});
							}
						})
					}
					if(req.query.type == 'menu'){
						ResponseService.json(res, true, menu, '');
					}
				}
			})
        }
	},

	active: function(req,res){
		req.checkParams('menu_id','MESSAGE.PARAMS_REQUIRED').notEmpty();
		var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
        	Menu.findOne({ _id: CreateObjectIdService.generate(req.params.menu_id), store_id: CreateObjectIdService.generate(req.auth.store_id) }, function(err,result){
				if(err){
					ResponseService.json(res, false, err, 'MESSAGE.SOME_THING_WENT_WRONG');
				}
				if(!result){
					ResponseService.json(res, false, null, 'MESSAGE.DATA_NOT_FOUND');
				}
				if(result){
					result.active = req.body.active;
					result.save(function(err,saveResult){
						if(err){
							ResponseService.json(res, false, err, 'MESSAGE.SOME_THING_WENT_WRONG');
						}else{
							ResponseService.json(res, true, saveResult, 'MESSAGE.UPDATE_SUCCESS');
						}
					});
				}
			})
        }
	},

	delete: function(req,res){
		req.checkParams('menu_id','MESSAGE.PARAMS_REQUIRED').notEmpty();
		var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
        	Menu.findOneAndRemove({ _id: CreateObjectIdService.generate(req.params.menu_id), store_id: CreateObjectIdService.generate(req.auth.store_id) }, function(err,result){
				if(err){
					ResponseService.json(res, false, err, 'MESSAGE.SOME_THING_WENT_WRONG');
				}
				if(result){
					Food.remove({menu_id: CreateObjectIdService.generate(req.params.menu_id)},function(err,removeResult){
						ResponseService.json(res, true, removeResult, 'MESSAGE.DELETE_SUCCESS');
					});
				}
				if(!result){
					ResponseService.json(res, false, null, 'MESSAGE.DATA_NOT_FOUND');
				}
			})
        }
	}
}

module.exports = MenuController;