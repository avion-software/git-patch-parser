const HUNK_REGEX = /@@ -([0-9])*,([0-9])* \+([0-9])*,([0-9])* @@/;
    let sourceLine;
    let targetLine;
                files.push(file);
            file = {};
        if (headerType === 1 && line.startsWith('index ')) {
            headerType = 2;
            if (line.substring(4) !== '/dev/null') {
                file.source = line.substring(4);
                file.source = null;
            if (line.substring(4) !== '/dev/null') {
                file.target = line.substring(4);
                file.target = null;
                const sourceFromLine = parseInt(match[1], 10);
                const sourceToLine = parseInt(match[2], 10);
                const targetFromLine = parseInt(match[3], 10);
                const targetToLine = parseInt(match[4], 10);
                    source: {
                        from: sourceFromLine,
                        to: sourceToLine,
                    target: {
                        from: targetFromLine,
                        to: targetToLine,
                sourceLine = sourceFromLine - 1;
                targetLine = targetFromLine - 1;
                sourceLine += 1;
                targetLine += 1;
                        source: sourceLine,
                        target: targetLine,
                targetLine += 1;
                        source: sourceLine,
                        target: targetLine,
                sourceLine += 1;
                        source: sourceLine,
                        target: targetLine,
        files.push(file);