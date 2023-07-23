const express = require('express');
const app = express();
const path = require('path');
const url = require('url');
const qs = require('querystring');
const fs = require('fs');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const dataPath = path.join(__dirname, 'data.json');

function readData(callback) {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      return callback([]);
    }
    try {
      const jsonData = JSON.parse(data);
      callback(jsonData);
    } catch (error) {
      callback([]);
    }
  });
}

function writeData(data, callback) {
  fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8', callback);
}

function templateList(data) {
  return data.map(post => ({
    title: post.title,
    price: post.price,
    description: post.description,
  }));
}

app.get('/', (req, res) => {
  const queryTitle = req.query.id; 

  if (queryTitle) {
    readData((data) => {
      const matchingPost = data.find((post) => post.title === queryTitle);
      if (matchingPost) {
        const title = matchingPost.title;
        const description = matchingPost.description;
        const price = matchingPost.price;
        res.render('viewpost', { title, description, price });
      }
    });
  }  
  else{
    readData((data) => {
    const title = 'Flea Market';
    const posts = templateList(data);
    res.render('index', { title, posts });
    });
  }
});

app.get('/create', (req, res) => {
  const title = 'Flea Market - 새 글 작성';
  res.render('create', { title });
});

app.post('/create_process', (req, res) => {
  let body = '';
  req.on('data', (data) => {
    body += data;
  });

  req.on('end', () => {
    const post = qs.parse(body);
    const title = post.title;
    const price = post.price;
    const description = post.description;

    readData((data) => {
      const newPost = {
        title,
        price,
        description,
      };
      data.push(newPost);

      writeData(data, () => {
        res.redirect(`/?id=${encodeURIComponent(title)}`);
      });
    });
  });
});

app.get('/update', (req, res) => {
  const id = req.query.id;
  readData((data) => {
    const post = data.find((post) => post.title === id);
    if (!post) {
      res.status(404).end('Not Found');
      return;
    }
    const title = post.title;
    res.render('update', { title, price: post.price, description: post.description });
  });
});

app.post('/update_process', (req, res) => {
  let body = '';
  req.on('data', (data) => {
    body += data;
  });

  req.on('end', () => {
    const post = qs.parse(body);
    const id = post.id;
    const title = post.title;
    const price = post.price;
    const description = post.description;

    readData((data) => {
      const targetPost = data.find((post) => post.title === id);
      if (!targetPost) {
        res.status(404).end('Not Found');
        return;
      }

      targetPost.title = title;
      targetPost.price = price;
      targetPost.description = description;

      writeData(data, () => {
        res.redirect(`/?id=${encodeURIComponent(title)}`);
      });
    });
  });
});

app.post('/delete_process', (req, res) => {
  let body = '';
  req.on('data', (data) => {
    body += data;
  });

  req.on('end', () => {
    const post = qs.parse(body);
    const id = post.id;

    readData((data) => {
      const filteredData = data.filter((post) => post.title !== id);
      writeData(filteredData, () => {
        res.redirect('/');
      });
    });
  });
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});