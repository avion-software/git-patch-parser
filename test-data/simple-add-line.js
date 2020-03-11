export default {
    files: [{
        source: 'a/test.txt',
        target: 'b/test.txt',
        meta: {
            index: {
                before: '4ce0f7a',
                after: 'c3b9bc0',
            },
        },
        hunks: [{
            source: {
                from: 1,
                to: 5,
            },
            target: {
                from: 1,
                to: 6,
            },
            lines: [{
                type: 'normal',
                line: {
                    source: 1,
                    target: 1,
                }
            }, {
                type: 'normal',
                line: {
                    source: 2,
                    target: 2,
                }
            }, {
                type: 'added',
                line: {
                    source: 2,
                    target: 3,
                }
            }, {
                type: 'normal',
                line: {
                    source: 3,
                    target: 4,
                }
            }, {
                type: 'normal',
                line: {
                    source: 4,
                    target: 5,
                }
            }, {
                type: 'normal',
                line: {
                    source: 5,
                    target: 6,
                }
            }]
        }]
    }],
};
