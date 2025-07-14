const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;


// Middlewares
app.use(express.static(__dirname)); // משרת את קבצי HTML/CSS/JS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/EX/pictures', express.static(path.join(__dirname, 'pictures')));

// חיבור למסד הנתונים
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'IdanGaliInbar', // עדכן לפי הסיסמה שלך
  database: 'burger_reviews'
});

// ראוטים להצגת דפי HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'HOME_PAGE.html'));
});
app.get("/search", (req, res) => {
  res.sendFile(path.join(__dirname, 'SEARCH_PAGE.html'));
});
app.get("/map", (req, res) => {
  res.sendFile(path.join(__dirname, 'MAP_PAGE.html'));
});
app.get("/reviews", (req, res) => {
  res.sendFile(path.join(__dirname, 'REVIEWS_PAGE.html'));
});

//  שליחת ביקורת מהטופס
app.post("/submit-reviews", (req, res) => {
  const { date, restaurant, review } = req.body;
  const sql = "INSERT INTO reviews (review_date, restaurant, content) VALUES (?, ?, ?)";

  db.query(sql, [date, restaurant, review], (err) => {
    if (err) {
      console.error(" Error saving reviews:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.send({ message: "הביקורת נשלחה בהצלחה!" });
  });
});

//  שליפת כל הביקורות
app.post("/get-reviews", (req, res) => {
  db.query("SELECT * FROM reviews ORDER BY id DESC", (err, results) => {
    if (err) {
      console.error(" Error retrieving reviews:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});

//  שליחת חיפוש מהטופס
app.post("/save-search", (req, res) => {
  const { area, price, therank } = req.body;
  const sql = "INSERT INTO searches (area, price, therank) VALUES (?, ?, ?)";

  db.query(sql, [area, price, therank], (err) => {
    if (err) {
      console.error(" Error saving search:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Search saved!" });
  });
});

//  שליפת כל החיפושים
app.get("/get-searches", (req, res) => {
  db.query("SELECT * FROM searches ORDER BY id DESC", (err, results) => {
    if (err) {
      console.error(" Error retrieving searches:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});

// הרצת השרת
app.listen(PORT, () => {
  console.log(` השרת פעיל בכתובת: http://localhost:${PORT}`);
});
