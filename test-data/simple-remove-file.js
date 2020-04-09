export default {
    files: [{
        before: 'test.txt',
        after: null,
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
            before: {
                from: 1,
                to: 5,
            },
            after: {
                from: 0,
                to: 0,
            },
            lines: [{
                type: 'removed',
                line: {
                    before: 1,
                    after: 0,
                },
                content: 'Line1',
            }, {
                type: 'removed',
                line: {
                    before: 2,
                    after: 0,
                },
                content: 'Line2',
            }, {
                type: 'removed',
                line: {
                    before: 3,
                    after: 0,
                },
                content: 'Line3',
            }, {
                type: 'removed',
                line: {
                    before: 4,
                    after: 0,
                },
                content: 'Line4',
            }, {
                type: 'removed',
                line: {
                    before: 5,
                    after: 0,
                },
                content: 'Line5',
            }]
        }]
    }],
};
