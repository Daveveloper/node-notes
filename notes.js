import fs from 'node:fs';
import chalk from 'chalk';

export function listNotes() {
  const notes = loadNotes();
  console.log(chalk.green.inverse('Your notes:'));
  notes.forEach((note) => {
    console.log(note.title);
  });
}

export function getNote(title) {
  const notes = loadNotes();
  const note = notes.find(
    (note) => note.title.toLowerCase() === title.toLowerCase()
  );
  if (note) {
    console.log(chalk.green.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse('Note not found'));
  }
}

export function addNotes(title, body) {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse('New note added!'));
  } else {
    console.log(chalk.red.inverse('Note title already exists!'));
  }
}

export function removeNotes(title) {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(chalk.green.inverse('Note removed successfuly:', title));
  } else {
    console.log(chalk.red.inverse('No note found'));
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

function loadNotes() {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}
