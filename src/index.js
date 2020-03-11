const HUNK_REGEX = /@@ -([0-9])*,([0-9])* \+([0-9])*,([0-9])* @@/;
const INDEX_REGEX = /index ([a-zA-Z0-9]*)\.\.([a-zA-Z0-9]*)[ ]?([0-9]*)/;

export default function parsePatch(patch) {
    const lines = patch.split('\n');

    let files = [];
    let hunk = null;
    let file = null;
    let headerType = 0;
    let sourceLine;
    let targetLine;
    lines.forEach((line) => {
        if (line.startsWith('diff --git ')) {
            if (file) {
                files.push(file);
            }

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

            if (line.startsWith('index ')) {
                let match = line.match(INDEX_REGEX);

                if (match) {
                    const [, beforeIndex, afterIndex, mode] = match;
                    file.meta.index = file.meta.index || {};
                    file.meta.index.before = beforeIndex;
                    file.meta.index.after = afterIndex;
                }

                headerType = 2;
            }
        }

        if (headerType === 2 && line.startsWith('--- ')) {
            headerType = 3;

            if (line.substring(4) !== '/dev/null') {
                file.source = line.substring(4);
            } else {
                file.source = null;
                file.type = 'added';
            }
        }

        if (headerType === 3 && line.startsWith('+++ ')) {
            headerType = 4;

            if (line.substring(4) !== '/dev/null') {
                file.target = line.substring(4);
            } else {
                file.target = null;
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

                const sourceFromLine = parseInt(match[1], 10);
                const sourceToLine = parseInt(match[2], 10);
                const targetFromLine = parseInt(match[3], 10);
                const targetToLine = parseInt(match[4], 10);

                hunk = {
                    source: {
                        from: sourceFromLine,
                        to: sourceToLine,
                    },
                    target: {
                        from: targetFromLine,
                        to: targetToLine,
                    },
                    lines: [],
                };

                sourceLine = Math.max(sourceFromLine - 1, 0);
                targetLine = Math.max(targetFromLine - 1, 0);
                headerType = 5;
            }
        }

        if (headerType === 5) {
            if (line.startsWith(' ')) {
                sourceLine += 1;
                targetLine += 1;

                hunk.lines.push({
                    type: 'normal',
                    line: {
                        source: sourceLine,
                        target: targetLine,
                    },
                });
            } else if (line.startsWith('+')) {
                targetLine += 1;

                hunk.lines.push({
                    type: 'added',
                    line: {
                        source: sourceLine,
                        target: targetLine,
                    },
                });
            } else if (line.startsWith('-')) {
                sourceLine += 1;

                hunk.lines.push({
                    type: 'removed',
                    line: {
                        source: sourceLine,
                        target: targetLine,
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
        files.push(file);
    }

    return {
        files,
    };
}
