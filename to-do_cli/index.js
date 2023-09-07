const fsFile = require('fs')
const { program } = require('commander');
const { title } = require('process');
const { time, log } = require('console');
const [, , action] = process.argv

/// database (open and save)///////
const dbPath = 'db.json'
const openDatabase = () => {
  const dbString = fsFile.readFileSync(dbPath, 'utf8') || '[]'
  return JSON.parse(dbString)
}
const saveToDatabase = (db) => {
  fsFile.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8')
}

///////// actions (add, list, delete, edit)///////////

const addEntry = ({ title }) => {
  const db = openDatabase()
  const newEntry = {
    id: db[db.length-1].id + 1,
    title: title,
    status: 'to-do'
  }
  db.push(newEntry)
  saveToDatabase(db)
  console.log('New entry added successfully!');
}

program
  .command('add')
  .description('add new entry')
  .requiredOption('-t, --title <title>')
  .action(function (title) {
    addEntry(title)
  }); // end add


const listEntries = (status) => {
  const db = openDatabase()
  if (status != undefined) {
    for (let index = 0; index < db.length; index++) {
      const element = db[index];
      if (element.status == status) {
        console.log(element);
      }
    }
  }
  else {
    console.log(db)
  }
}
program
  .command('list')
  .description('list all entries')
  .option('-s, --status [status]')
  .action(function (status) {
    listEntries(status.status)
  });/// end list

const findEntry = ({ id, db }) => {
  var state = -1;
  for (let index = 0; index < db.length; index++) {
    const element = db[index];
    if (element != null) {
      if (id == element.id) {
        state = index;
        break;
      }
    }
  }
  return state;
}

const deleteEntry = ({ id }) => {
  const db = openDatabase()
  const index = findEntry({ id: id, db: db })
  if (index != -1) {
    delete db[index]
    // to remove null from db
    const filteredArray = db.filter(item => item !== null);
    saveToDatabase(filteredArray)
    console.log('Entry deleted successfully!');
  }
  else {
    console.log('Entry not found.');
  }
}

program
  .command('delete')
  .description('delete entry by id')
  .requiredOption('-d, --id <id>')
  .action(function (id) {
  deleteEntry(id)
  });/// end delete


const editEntry = ({ id, title, status }) => {
  const db = openDatabase()
  const index = findEntry({ id: id, db: db })
  if (index != -1) {
    db[index].title = title? title: db[index].title
    db[index].status = status
    saveToDatabase(db)
    console.log('Entry edited successfully!');
  }
  else {
    console.log('Entry not found.');
  }
}

program
  .command('edit')
  .description('edit entry info (status, title) by id')
  .requiredOption('-s, --status <status>')
  .option('-t, --title [title]')
  .requiredOption('-d, --id <id>')
  .action(function (options) {
   console.log(options.status);
  editEntry({id:options.id, title:options.title, status:options.status})
  });/// end edit


program.parse(process.argv);