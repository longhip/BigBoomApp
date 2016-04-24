var Photo = require('./photo.model');

var ObjectId = require.main.require('./services/create_object_id.service');
var ResponseService = require.main.require('./services/response.service');

var PhotoController = {

    store: function(req, res, next) {
        var album_id = req.body.album_id || null;
        var data = {
            name: req.body.name,
            path: req.body.path,
            album_id: (album_id == null) ? null : ObjectId.generate(req.body.album_id),
            from: {
                id: ObjectId.generate(req.body.from.id),
                type: req.body.from.type
            },
            description: req.body.description,
            created_at: Date.now(),
            created_by: ObjectId.generate(req.auth._id),
            store_id: ObjectId.generate(req.auth.store_id)
        }
        var photo = new Photo(data)
        photo.save(function(err, result) {
            if (err) {
                next(err)
            } else {
                ResponseService.json(res, true, result, 'MESSAGE.CREATE_SUCCESS');
            }
        })
    }

}

module.exports = PhotoController;
