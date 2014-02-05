var mongoose = require('mongoose')
  , models = require('../../models')
  , Remove = mongoose.model('Remove')
  , _ = require('underscore');

var remove = {
	store: function (id_path, to_remove, done) {
		
		Remove.findByIdAndUpdate(
			id_path, {
				path: id_path,
				$addToSet: { 'to_remove': { $each: _.flatten(to_remove) } }
			}, 
			{ upsert:true }, 
			function (err, docs) {
				if(err) 
					global.log('error', err);

				done(err, docs);
			}
		);
	},
	get: function(id_path, done) {

		Remove.findByIdAndUpdate(id_path, {to_remove: []},{'new': false}, function(err, docs) {
			
			if(err)
				global.log('error', err);

			done(err, docs.to_remove);

		});

	}
};

module.exports = remove;