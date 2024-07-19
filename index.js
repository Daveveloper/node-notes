import { addNotes, removeNotes, listNotes, getNote } from './notes.js';
import yargs from 'yargs';

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    addNotes(argv.title, argv.body);
  },
});

yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler: function () {
    listNotes();
  },
});

yargs.command({
  command: 'read',
  describe: 'Read notes',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    getNote(argv.title);
  },
});

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title required',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    removeNotes(argv.title);
  },
});

yargs.parse();
