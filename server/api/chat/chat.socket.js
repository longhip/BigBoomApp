'use strict';

var PrivateMessage = require('./private_message.model');
var RecentMessage = require('./recent_message.model');
var listUserOnline = {};
var GroupMessage = require('./group_message.model');

module.exports.respond = function(socket, chat) {
    socket.on('user connect', function(user_id) {
        listUserOnline[user_id] = socket.id; // add user to list users online
        chat.emit('user online', user_id); // send this user online to all client
        chat.to(socket.id).emit('list user online', listUserOnline); // send list user online to user just connect
        // Join room
        GroupMessage.find({ users: { $in: [user_id] } }, function(err, results) {
            results.forEach(function(result) {
                socket.join(result._id); // list all group by user just connect and join all room
            });
        });
    });

    /**
     * On send group message from client then save db and send message to room
     * @param  {[object]} data form client
     */
    socket.on('send group message', function(data) {
        GroupMessage.findOne({ _id: data.group._id }, function(err, group_message) {
            group_message.messages.push({
                user_send_id: data.message.user_send._id,
                message: data.message.body,
                type: data.message.type
            });
            group_message.save(function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    chat.to(data.group._id).emit('new group message', data);
                }
            });
        });
    });

    /**
     * On send private message from client then save db and send message to user receive
     * @param  {[object]} data form client
     */
    socket.on('send private message', function(data) {
        var privateMesssage = new PrivateMessage(data.database);
        privateMesssage.save(function(err, message) {
            if (err) {
                return false;
            } else {
                RecentMessage.findOne({
                    $and: [
                        { $or: [{ user_send_id: message.user_send_id }, { user_send_id: message.user_receive_id }] },
                        { $or: [{ user_receive_id: message.user_send_id }, { user_receive_id: message.user_receive_id }] }
                    ]
                }, function(err, recentMessage) {
                    if (!recentMessage) {
                        var data = {
                            user_send_id: message.user_send_id,
                            user_receive_id: message.user_receive_id,
                            last_message: message.message,
                            read: false,
                            total_message: 1
                        };
                        var recent = new RecentMessage(data);
                        recent.save(function(err, result) {
                            if (err) {
                                console.log('save recentMessage error');
                            } else {
                                console.log('save recentMessage success' + result);
                            }
                        });
                    } else {
                        recentMessage.user_send_id = message.user_send_id,
                        recentMessage.user_receive_id = message.user_receive_id,
                        recentMessage.last_message = message.message,
                        recentMessage.read = false;
                        recentMessage.date = Date.now();
                        recentMessage.total_message = recentMessage.total_message + 1;
                        recentMessage.save(function(err, data) {
                            console.log('create new recentMessage success' + data);
                        });
                    }
                });
                chat.to(listUserOnline[message.user_receive_id]).emit('new private message', data);
            }
        });
    });

    /**
     * On user disconnect send to client user offline
     */
    socket.on('disconnect', function() {
        for (var key in listUserOnline) {
            if (listUserOnline[key] == socket.id) {
                delete listUserOnline[key];
                chat.emit('user offline', key);
            }
        }
    });
};
