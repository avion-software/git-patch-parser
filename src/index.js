const DIFF_REGEX = /("a\/.*"|a\/.*)\s("b\/.*"|b\/.*)$/;
const DIFF_COMPLEX_REGEX = /"(a\/.*)" "(b\/.*)"/;

function addFileToArray(files, file, diffLine) {
    if (!file.before && !file.after) {
        const mainPart = diffLine.substring(11).trim();

        if ((mainPart.indexOf('a/') === mainPart.lastIndexOf('a/')
            && mainPart.indexOf('b/') === mainPart.lastIndexOf('b/'))
            || DIFF_COMPLEX_REGEX.test(mainPart)) {
            const match = mainPart.match(DIFF_REGEX);
            if (match) {
                const [, before, after] = match;

                file.before = before;
                file.after = after;
            }
        } else if (file.type !== 'renamed') {
            const mainParts = mainPart.split(' ');

            const partLength = mainParts.length / 2;
            if (partLength % 2 === 0) {
                let before = [];
                let after = [];

                for (let i = 0; i < mainParts.length; i += 1) {
                    if (i < partLength) {
                        before.push(mainParts[i]);
                    } else {
                        after.push(mainParts[i]);
                    }
                }

                file.before = before.join(' ');
                file.after = after.join(' ');
            }
        }
    }

    files.push(file);
}
    let diffLine = null;
                addFileToArray(files, file, diffLine);
            diffLine = line;
                file.before = file.before || line.substring(12).trim();
                file.after = file.after || line.substring(10).trim();
            if (line.startsWith('old mode ')) {
                file.meta.mode = file.meta.mode || {};
                file.meta.mode.before = file.meta.mode.before || parseInt(line.substring(9), 10);
            }

            if (line.startsWith('new mode ')) {
                file.meta.mode = file.meta.mode || {};
                file.meta.mode.after = file.meta.mode.after || parseInt(line.substring(9), 10);
            }

            if (line.startsWith('new file mode ')) {
                file.meta.mode = file.meta.mode || {};
                file.meta.mode.after = file.meta.mode.after || parseInt(line.substring(14), 10);
            }

            if (line.substring(4).trim() !== '/dev/null') {
                file.before = line.substring(4).trim();
            if (line.substring(4).trim() !== '/dev/null') {
                file.after = line.substring(4).trim();
        addFileToArray(files, file, diffLine);