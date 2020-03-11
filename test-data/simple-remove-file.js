export default {
    files: [{
        source: 'a/test.txt',
        target: null,
        type: 'removed',
        meta: {
            mode: {
                before: 100644,
            },
            index: {
                before: '593fd3c',
                after: '0000000',
            }
        },
        hunks: [{
            source: {
                from: 1,
                to: 5,
            },
            target: {
                from: 0,
                to: 0,
            },
            lines: [{
                type: 'removed',
                line: {
                    source: 1,
                    target: 0,
                }
            }, {
                type: 'removed',
                line: {
                    source: 2,
                    target: 0,
                }
            }, {
                type: 'removed',
                line: {
                    source: 3,
                    target: 0,
                }
            }, {
                type: 'removed',
                line: {
                    source: 4,
                    target: 0,
                }
            }, {
                type: 'removed',
                line: {
                    source: 5,
                    target: 0,
                }
            }]
        }]
    }],
};
