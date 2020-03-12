const HUNK_REGEX = /@@ -([0-9])*,([0-9])* \+([0-9])*,([0-9])* @@/;
const INDEX_REGEX = /index ([a-zA-Z0-9]*)\.\.([a-zA-Z0-9]*)[ ]?([0-9]*)/;
const DIFF_REGEX = /("a\/.*"|a\/.*)\s("b\/.*"|b\/.*)$/;
const DIFF_COMPLEX_REGEX = /"(a\/.*)" "(b\/.*)"/;

function addFileToArray(files, file, diffLine) {
    if (!file.before && !file.after) {
        const mainPart = diffLine.substring(11);

        if ((mainPart.indexOf('a/') === mainPart.lastIndexOf('a/')
            && mainPart.indexOf('b/') === mainPart.lastIndexOf('b/'))
            || DIFF_COMPLEX_REGEX.test(mainPart)) {
            const match = mainPart.match(DIFF_REGEX);
            if (match) {
                const [, before, after] = match;

                file.before = before;
                file.after = after;
            }
        }
    }

    files.push(file);
}

export default function parsePatch(patch) {
    const lines = patch.split('\n');

    let files = [];
    let hunk = null;
    let file = null;
    let headerType = 0;
    let beforeLine;
    let afterLine;
    let diffLine = null;
    lines.forEach((line) => {
        if (line.startsWith('diff --git ')) {
            if (file) {
                addFileToArray(files, file, diffLine);
            }

            diffLine = line;
            file = {
                meta: {},
            };
            headerType = 1;
        }

        if (headerType === 1) {
            if (line.startsWith('deleted file mode ')) {
                file.meta.mode = file.meta.mode || {};
                file.meta.mode.before = parseInt(line.substring(18), 10);
            }

            if (line.startsWith('similarity index ')) {
                file.meta.similarity = parseInt(line.substring(17), 10);
            }

            if (line.startsWith('rename from ')) {
                file.before = file.before || line.substring(12);
                file.type = 'renamed';
            }

            if (line.startsWith('rename to ')) {
                file.after = file.after || line.substring(10);
                file.type = 'renamed';
            }

            if (line.startsWith('old mode ')) {
                file.meta.mode = file.meta.mode || {};
                file.meta.mode.before = file.meta.mode.before || parseInt(line.substring(9), 10);
            }

            if (line.startsWith('new mode ')) {
                file.meta.mode = file.meta.mode || {};
                file.meta.mode.after = file.meta.mode.after || parseInt(line.substring(9), 10);
            }

            if (line.startsWith('index ')) {
                let match = line.match(INDEX_REGEX);

                if (match) {
                    const [, beforeIndex, afterIndex, modeString] = match;

                    file.meta.index = file.meta.index || {};
                    file.meta.index.before = beforeIndex;
                    file.meta.index.after = afterIndex;

                    const fileMode = parseInt(modeString, 10);
                    if (!Number.isNaN(fileMode)) {
                        file.meta.mode = file.meta.mode || {};
                        file.meta.mode.before = file.meta.mode.before || fileMode;
                        file.meta.mode.after = file.meta.mode.after || fileMode;
                    }
                }

                headerType = 2;
            }
        }

        if (headerType === 2 && line.startsWith('--- ')) {
            headerType = 3;

            if (line.substring(4) !== '/dev/null') {
                file.before = line.substring(4);
            } else {
                file.before = null;
                file.type = 'added';
            }
        }

        if (headerType === 3 && line.startsWith('+++ ')) {
            headerType = 4;

            if (line.substring(4) !== '/dev/null') {
                file.after = line.substring(4);
            } else {
                file.after = null;
                file.type = 'removed';
            }
        }

        if ((headerType === 4 || headerType === 5) && line.startsWith('@@')) {
            const match = line.match(HUNK_REGEX);
            if (match) {
                if (hunk) {
                    file.hunks = file.hunks || [];
                    file.hunks.push(hunk);
                }

                const beforeFromLine = parseInt(match[1], 10);
                const beforeToLine = parseInt(match[2], 10);
                const afterFromLine = parseInt(match[3], 10);
                const afterToLine = parseInt(match[4], 10);

                hunk = {
                    before: {
                        from: beforeFromLine,
                        to: beforeToLine,
                    },
                    after: {
                        from: afterFromLine,
                        to: afterToLine,
                    },
                    lines: [],
                };

                beforeLine = Math.max(beforeFromLine - 1, 0);
                afterLine = Math.max(afterFromLine - 1, 0);
                headerType = 5;
            }
        }

        if (headerType === 5) {
            if (line.startsWith(' ')) {
                beforeLine += 1;
                afterLine += 1;

                hunk.lines.push({
                    type: 'normal',
                    line: {
                        before: beforeLine,
                        after: afterLine,
                    },
                });
            } else if (line.startsWith('+')) {
                afterLine += 1;

                hunk.lines.push({
                    type: 'added',
                    line: {
                        before: beforeLine,
                        after: afterLine,
                    },
                });
            } else if (line.startsWith('-')) {
                beforeLine += 1;

                hunk.lines.push({
                    type: 'removed',
                    line: {
                        before: beforeLine,
                        after: afterLine,
                    },
                });
            }
        }
    });

    if (hunk) {
        file.hunks = file.hunks || [];
        file.hunks.push(hunk);
    }

    if (file) {
        addFileToArray(files, file, diffLine);
    }

    return {
        files,
    };
}
