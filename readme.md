Toornament api client
=====================

1) Introduction
---------------

This component aim to request and interpret Toornaments Api endpoints through simple abstraction methods.

2) Get starting
---------------

To use this http client, proceed as follow

    // Instanciate the toornament api client with your configuration
    var client = new Toornament({
        apiKey: apiKey,
        clientId: clientId,
        clientSecret: clientSecret
    });
    // Add a call to the queue
    client.stage.get({tournamentId: tournamentId, stageNumber: stageNumber}, function (data) {
        console.log(data);
    }, showError);
    // Execute prepared calls
    toornamentApi.run();