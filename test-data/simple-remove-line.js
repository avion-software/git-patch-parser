export default {
    files: [{
        before: 'test.txt',
        after: 'test.txt',
        meta: {
            index: {
                before: '4ce0f7a',
                after: 'c09745f',
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
                to: 4,
            },
            lines: [{
                type: 'normal',
                line: {
                    before: 1,
                    after: 1,
                },
                content: 'Line1',
            }, {
                type: 'normal',
                line: {
                    before: 2,
                    after: 2,
                },
                content: 'Line2',
            }, {
                type: 'normal',
                line: {
                    before: 3,
                    after: 3,
                },
                content: 'Line3',
            }, {
                type: 'removed',
                line: {
                    before: 4,
                    after: 3,
                },
                content: 'Line4',
            }, {
                type: 'normal',
                line: {
                    before: 5,
                    after: 4,
                },
                content: 'Line5',
            }]
        }]
    }],
};
