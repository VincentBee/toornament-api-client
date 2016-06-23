/**
 * Build the target url
 *
 * @param targetResource String
 * @param attributes     Object
 *
 * @returns String|null
 */
Tournament.prototype.getTargetUrl = function(targetResource, attributes) {
    switch (targetResource) {
        case 'my':
            return this.host + '/' + this.version + '/me/tournaments';
        case 'create':
            return this.host + '/' + this.version + '/tournaments';
        case 'edit':
            return this.host + '/' + this.version + '/tournaments/'+attributes.tournamentId;
        case 'remove':
            return this.host + '/' + this.version + '/tournaments/'+attributes.tournamentId;
        case 'list':
            return this.host + '/' + this.version + '/tournaments';
        case 'get':
            return this.host + '/' + this.version + '/tournaments/'+attributes.tournamentId;
    }

    return null; // todo: throw exception
};

Tournament.prototype.getTargetMethod = function(targetResource) {
    switch (targetResource) {
        case 'my':
        case 'tournament_list':
        case 'get_tournament':
            return 'GET';
        case 'create_tournament':
            return 'POST';
        case 'edit_tournament':
            return 'PATCH';
        case 'remove_tournament':
            return 'DELETE';
    }

    return null; // todo: throw exception
};

Tournament.prototype.isSecured = function(targetResource) {
    switch (targetResource) {
        case 'my_tournament_list':
        case 'create_tournament':
        case 'edit_tournament':
        case 'remove_tournament':
            return true;
        case 'tournament_list':
        case 'get_tournament':
            return false;
    }

    return null; // todo: throw exception
};

module.exports = Tournament;
