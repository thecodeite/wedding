define([
    'jquery',
    'backbone',
    'easyxdm'
], function ($, Backbone, EasyXDM) {
    var rapidizerGuestDomain = 'http://api.rapidizer.co.uk/';
    var rapidizerSuccessCallback, rapidizerErrorCallback;

    $(document).bind('SocketReady');

    var rapidizer = {
        channel: null,
        remote: rapidizerGuestDomain,
        isReady: false,
        stringify: function (data) {
            var message = "";
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    message += key + "=" + escape(data[key]) + "&";
                }
            }
            return message.substring(0, message.length - 1);
        },
        setupChannel: function () {
            var ctx = this;

            this.channel = new easyXDM.Socket(/** The configuration */{
                /**
                 * Register the url to hash.html, this must be an absolute path
                 * or a path relative to the root.
                 * @field
                 */
                local: "js/easyxdm/name.html",
                swf: ctx.remote + "/js/easyxdm/easyxdm.swf",
                /**
                 * Register the url to the remote interface
                 * @field
                 */
                remote: ctx.remote + "/remotedata.html",
                remoteHelper: ctx.remote + "/js/easyxdm/name.html",
                onReady: function () {
                    $(document).trigger("SocketReady");
                    ctx.isReady = true;
                },
                onMessage: function (data, origin) {

                    var response = JSON.parse(data);

                    if (response.status == "success") {
                        rapidizerSuccessCallback(response.data);
                    }

                    if (response.status == "error") {
                        var errorMsg = response.data;
                        rapidizerErrorCallback(errorMsg);
                    }

                }
            });
        },
        readyToPost: null,
        postData: function (data) {
            var ctx = this;

            if (ctx.isReady) {
                ctx.channel.postMessage(ctx.stringify(data));
            }
            else {
                $(document).on('SocketReady', function () {
                    ctx.channel.postMessage(ctx.stringify(data));
                });
            }
        }
    }

    rapidizer.setupChannel();

    Backbone.sync = function (method, model, options) {
        var jsonModel = JSON.stringify(model.toJSON());


        var url = model.urlRoot;

        if (model instanceof Backbone.Collection) {
            method = 'list';
            url = model.url;
        }

        var postInfo = {
            method: method,
            model: jsonModel,
            url: url
        }

        rapidizer.postData(postInfo);

        rapidizerSuccessCallback = options.success;
        rapidizerErrorCallback = options.error;
    };

    return rapidizer;
});


