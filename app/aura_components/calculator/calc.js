define([
    'underscore',
    'jquery'
], function (_, $) {
    function getInstance() {
        var params = [],
            action = null,
            maxInputDigits = 15,
            actions = {
                equal: 'equal',
                ce: 'ce', //clear
                add: 'add',
                substruct: 'substruct',
                multiply: 'multiply',
                divide: 'divide'
            };

        function addValue (val) {
            var currentParam;

            if (!params.length) {
                params.push([]);
            }

            currentParam = params[params.length - 1];

            if (currentParam instanceof Array) {
                if (currentParam.length <= maxInputDigits) {
                    currentParam.push(val);
                }
            } else {
                if (val === '.') {
                    val = '0.';
                }

                if (action) {
                    params.push([val]);
                } else {
                    params = [[val]];
                }
            }
        }

        function addAction (a) {
            if (a === actions.ce) {
                params = [];
                action = null;
                return;
            }

            if (params.length === 2) {
                performAction();
            } else if (a !== actions.equal) {
                params.push([]);
            }

            action = a;

            if (action === actions.equal) {
                action = null;
            }
        }

        function performAction () {
            var value1,
                value2 = parseFloat(params[1].join('')),
                res = 0;

            if (params[0] instanceof Array) {
                value1 = parseFloat(params[0].join(''));
            } else {
                value1 = params[0];
            }

            if (action === actions.add) {
                res = value1 + value2;
            } else if (action === actions.substruct) {
                res = value1 - value2;
            } else if (action === actions.multiply) {
                res = value1 * value2;
            } else if (action === actions.divide) {
                res = value1 / value2;
            }

            params = [res];
        }

        function getOutput () {
            var value1,
                value2;

            if (params[1]) {
                value2 = parseFloat(params[1].join(''));
            }

            if (params[0] instanceof Array) {
                value1 = parseFloat(params[0].join(''));
            } else {
                value1 = params[0];
            }

            return value2 || value1 || '0';
        }

        return {
            addValue: addValue,
            addAction: addAction,
            getOutput: getOutput,
            actions: actions
        };
    }

    return {
        getInstance: getInstance
    };

});