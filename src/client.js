var Stage = require('./endpoints/stage.js');

/**
 * Toornament client Api
 *
 * @param options
 *
 * @constructor
 */
function Client(options) {
    this.host           = options.host || 'https://api.toornament.com';
    this.version        = options.version || 'v1';

    this.apiKey         = options.apiKey || null;
    this.clientId       = options.clientId || null;
    this.clientSecret   = options.clientSecret || null;
    this.accessToken    = null;

    this.xhr            = new XMLHttpRequest();
    this.queue          = [];

    this.stage = new Stage(this);
}

Client.prototype.getHeaders = function(targetResource) {
    var headers = {
        'X-Api-Key': this.apiKey,
        'Content-Type': 'application/json'
    };

    if (this.accessToken != null) {
        headers.Authorization = 'Bearer ' + this.accessToken;
    }

    return headers;
};

Client.prototype.generateAccessToken = function(previousRequest) {
    var toornament = this;
    this.queue.unshift(previousRequest);
    this.queue.unshift({
        requireAuthentication: false,
        method: 'GET',
        targetUrl: this.host + '/oauth/v2/token?grant_type=client_credentials&client_id=' + this.clientId + '&client_secret=' + this.clientSecret,
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': this.apiKey
        },
        successHandler: function (data) {
            toornament.accessToken = data.access_token;
            for (var i in toornament.queue) {
                if (typeof toornament.queue[i].headers.Authorization === 'undefined') {
                    continue;
                }
                toornament.queue[i].headers.Authorization = 'Bearer ' + data.access_token;
            }
        },
        errorHandler: null
    });

    this.run();
};

Client.prototype.call = function(endpoint, targetResource, attributes, successHandler, errorHandler) {
    console.log(endpoint);
    this.queue.push({
        requireAuthentication:  endpoint.prototype._isSecured.call(null, targetResource),
        method:                 endpoint.prototype._getTargetMethod.call(null, targetResource),
        targetUrl:              endpoint.prototype._getTargetUrl.call(null, targetResource, attributes),
        headers:                this.getHeaders(targetResource),
        successHandler:         successHandler || null,
        errorHandler:           errorHandler || null
    });
};

Client.prototype.sendRequest = function(request) {
    var toornament = this,
        xhr = this.xhr;

    if (request.requireAuthentication && toornament.accessToken === null) {
        return this.generateAccessToken(request);
    }

    xhr.open('GET', request.targetUrl, true);
    for (var index in request.headers) {
        xhr.setRequestHeader(index, request.headers[index]);
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }

        if (request.successHandler !== null && xhr.status == 200) {
            request.successHandler(JSON.parse(xhr.responseText));
            toornament.run();

        } else if (request.errorHandler !== null) {
            request.errorHandler(xhr.status, xhr.responseText);
        }
    };

    xhr.send();
};

Client.prototype.run = function() {
    var request = this.queue.shift();

    if (typeof request === 'undefined') {
        return;
    }

    this.sendRequest(request);
};

window.Client = Client;

module.exports = Client;

