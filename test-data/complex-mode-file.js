export default {
    files: [{
        before: 'a/test a/test.txt',
        after: 'b/test a/test.txt',
        meta: {
            mode: {
                before: 100644,
                after: 100755,
            },
        },
    }],
};
