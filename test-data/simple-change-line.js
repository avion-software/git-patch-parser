export default {
    files: [{
        before: 'a/test.txt',
        after: 'b/test.txt',
        meta: {
            index: {
                before: '4ce0f7a',
                after: '5b4e088',
            },
            mode: {
                before: 100644,
                after: 100644,
            },
        },
        hunks: [{
            before: {
                from: 1,
                to: 5,
            },
            after: {
                from: 1,
                to: 5,
            },
            lines: [{
                type: 'normal',
                line: {
                    before: 1,
                    after: 1,
                }
            }, {
                type: 'normal',
                line: {
                    before: 2,
                    after: 2,
                }
            }, {
                type: 'removed',
                line: {
                    before: 3,
                    after: 2,
                }
            }, {
                type: 'added',
                line: {
                    before: 3,
                    after: 3,
                }
            }, {
                type: 'normal',
                line: {
                    before: 4,
                    after: 4,
                }
            }, {
                type: 'normal',
                line: {
                    before: 5,
                    after: 5,
                }
            }]
        }]
    }],
};
