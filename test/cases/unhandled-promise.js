'use strict';
var exitHook = require('./../../index');
var stub = require('./stub');

exitHook(function (cb) {
	setTimeout(function () {
		stub.called();
		cb();
	}, 50);
	stub.called();
});

exitHook(function () {
	stub.called();
});

exitHook.unhandledRejectionHandler(function (err, cb) {
	setTimeout(function () {
		stub.called();
		cb();
	}, 50);
	if (!err || err.message !== 'test-promise') {
		stub.reject(`No error passed to unhandledRejectionHandler, or message not test-promise - ${err.message}`);
	}
	stub.called();
});

process.on('unhandledRejection', function () {
	// All uncaught rejection handlers should be called even though the exit hook handler was registered
	stub.called();
});

stub.addCheck(6);

(() => {
	return Promise.reject(new Error('test-promise'));
})();
