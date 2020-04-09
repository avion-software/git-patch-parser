export default {
    files: [{
        before: null,
        after: 'test.txt',
        type: 'added',
        meta: {
            index: {
                before: '0000000',
                after: '46a2c46',
            },
            mode: {
                after: 100644,
            },
        },
        hunks: [{
            before: {
                from: 0,
                to: 0,
            },
            after: {
                from: 1,
                to: 5,
            },
            lines: [{
                type: 'added',
                line: {
                    before: 0,
                    after: 1,
                },
                content: 'Line1',
            }, {
                type: 'added',
                line: {
                    before: 0,
                    after: 2,
                },
                content: 'Line2',
            }, {
                type: 'added',
                line: {
                    before: 0,
                    after: 3,
                },
                content: 'Line3',
            }, {
                type: 'added',
                line: {
                    before: 0,
                    after: 4,
                },
                content: 'Line4',
            }, {
                type: 'added',
                line: {
                    before: 0,
                    after: 5,
                },
                content: 'Line5',
            }]
        }]
    }],
};
