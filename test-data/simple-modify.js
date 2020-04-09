export default {
    files: [{
        before: 'test.txt',
        after: 'test.txt',
        meta: {
            index: {
                before: '1e13211b2b36c7b2836511a4f5032f7d9bbb78ef',
                after: '513b1f0c043b1ce40e239f919c65eec93342b008',
            },
            mode: {
                before: 100644,
                after: 100644,
            },
        },
        hunks: [{
            before: {
                from: 1,
                to: 1,
            },
            after: {
                from: 1,
                to: 2,
            },
            lines: [{
                type: 'removed',
                line: {
                    before: 1,
                    after: 0,
                }
            }, {
                type: 'added',
                line: {
                    before: 1,
                    after: 1,
                }
            }, {
                type: 'added',
                line: {
                    before: 1,
                    after: 2,
                }
            }]
        }]
    }],
};
