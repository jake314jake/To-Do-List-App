const formatDate = require('./utils.cjs');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
app.use(express.json());

const path = './DataBase/to-do-list.db';
const db = new sqlite3.Database(path);

const hostname = 'localhost';
const port = process.env.PORT || 3000;

app.use(cors());

// ROUTE
app.post('/api/data', (req, res) => {
  const { userName } = req.body;
  console.log(userName);

  // Check if the user exists
  db.get('SELECT UserID FROM Users WHERE UserNAME = ?', [userName], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!user) {
      // User does not exist, so create them
      db.run('INSERT INTO Users (UserNAME) VALUES (?)', [userName], (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        // User has been created, fetch their tasks
        fetchTasks(userName, res);
      });
    } else {
      // User exists, fetch their tasks
      fetchTasks(userName, res);
    }
  });
});

function fetchTasks(userName, res) {
  db.all('SELECT * FROM Task NATURAL JOIN Users WHERE TaskCOMP = 0 AND UserNAME = ?', [userName], (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(data);
  });
}

app.post('/api/update', (req, res) => {
  const { selectedTasks, userName } = req.body;

  // Check if the user exists
  db.get('SELECT UserID FROM Users WHERE UserNAME = ?', [userName], (err, user) => {
    if (err) {
      console.log( err.message)
      return res.status(500).json({ error: err.message });
    }

    if (!user) {
      console.log('User not found')
      return res.status(404).json({ error: 'User not found' });
    }

    // User exists, update their tasks
    selectedTasks.forEach(element => {
      db.run('UPDATE Task SET TaskCOMP = 1 WHERE TaskID = ? AND UserID = ?', [element, user.UserID], (err) => {
        if (err) {
          console.log(err.message);
          res.json({ message: 'task update failed' });
        }
      });
    });

    res.json({ message: `task update successfully ${Math.floor(Math.random() * 100)}` });
  });
});

app.post('/api/add', (req, res) => {
  const { newTask, userName } = req.body;
  const time = formatDate(new Date());
  const isCompleted = 0;

  // Check if the user exists
  db.get('SELECT UserID FROM Users WHERE UserNAME = ?', [userName], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // User exists, insert the new task
    db.run('INSERT INTO Task (TaskTEXT, TaskCOMP, TaskTIMECreate, UserID) VALUES (?, ?, ?, ?)', [newTask, isCompleted, time, user.UserID], (err) => {
      if (err) {
        console.error(err.message);
        res.json({ message: 'task added failed' });
      } else {
        res.json({ message: `task added successfully ${Math.floor(Math.random() * 100)}` });
      }
    });
  });
});


app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
