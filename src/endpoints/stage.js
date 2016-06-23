function Stage(client) {
    this.client = client;
}

Stage.prototype.list = function(attributes, successHandler, errorHandler) {
    this.client.call(Stage, 'list', attributes, successHandler, errorHandler);
};

Stage.prototype.get = function(attributes, successHandler, errorHandler) {
    this.client.call(Stage, 'get', attributes, successHandler, errorHandler);
};

Stage.prototype.view = function(attributes, successHandler, errorHandler) {
    this.client.call(Stage, 'view', attributes, successHandler, errorHandler);
};

Stage.prototype._getTargetUrl = function(targetResource, attributes) {
    console.log(targetResource);
    switch (targetResource) {
        case 'list':
            return this.host + '/' + this.version + '/tournaments/'+attributes.tournamentId+'/stages';
        case 'get':
            return this.host + '/' + this.version + '/tournaments/'+attributes.tournamentId+'/stages/'+attributes.stageNumber;
        case 'view':
            return this.host + '/' + this.version + '/tournaments/'+attributes.tournamentId+'/stages/'+attributes.stageNumber+'/view';
    }

    return null; // todo: throw exception
};

Stage.prototype._getTargetMethod = function(targetResource) {
    switch (targetResource) {
        case 'list':
        case 'get':
        case 'view':
            return 'GET';
    }

    return null; // todo: throw exception
};

Stage.prototype._isSecured = function(targetResource) {
    switch (targetResource) {
        case 'list':
        case 'get':
        case 'view':
            return false;
    }

    return null; // todo: throw exception
};

module.exports = Stage;