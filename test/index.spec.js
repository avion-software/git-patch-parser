import { promises as fs } from 'fs';
import path from 'path';
import assert from 'assert';
import parsePatch from '../src';

import simpleChangeLine from '../test-data/simple-change-line';
import simpleAddLine from '../test-data/simple-add-line';
import simpleRemoveLine from '../test-data/simple-remove-line';
import simpleRemoveFile from '../test-data/simple-remove-file';
import simpleMoveFile from '../test-data/simple-move-file';

describe('lines', () => {
    it('change-line', async () => {
        const buffer = await fs.readFile(path.resolve(__dirname, '..', 'test-data', 'simple-change-line.patch'));

        assert.deepEqual(parsePatch(buffer.toString()), simpleChangeLine);
    });

    it('add-line', async () => {
        const buffer = await fs.readFile(path.resolve(__dirname, '..', 'test-data', 'simple-add-line.patch'));

        assert.deepEqual(parsePatch(buffer.toString()), simpleAddLine);
    });

    it('remove-line', async () => {
        const buffer = await fs.readFile(path.resolve(__dirname, '..', 'test-data', 'simple-remove-line.patch'));

        assert.deepEqual(parsePatch(buffer.toString()), simpleRemoveLine);
    });

    it('remove-file', async () => {
        const buffer = await fs.readFile(path.resolve(__dirname, '..', 'test-data', 'simple-remove-file.patch'));

        assert.deepEqual(parsePatch(buffer.toString()), simpleRemoveFile);
    });

    it('move-file', async () => {
        const buffer = await fs.readFile(path.resolve(__dirname, '..', 'test-data', 'simple-move-file.patch'));

        assert.deepEqual(parsePatch(buffer.toString()), simpleMoveFile);
    });
});
