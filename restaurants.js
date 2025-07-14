// קבלת הפרמטרים מה-URL
var search = document.location.search;

// משתנים לשמירת העדפות
var selectedArea = "";
var selectedRank = 0;

// בדיקה אם סומנו אפשרויות מחיר
var priceDouble = search.indexOf("price_double") !== -1;
var priceTriple = search.indexOf("price_triple") !== -1;

// בדיקת אזור נבחר
if (search.indexOf("area=NORTH") !== -1) {
  selectedArea = "NORTH";
} else if (search.indexOf("area=CENTER") !== -1) {
  selectedArea = "CENTER";
} else if (search.indexOf("area=SOUTH") !== -1) {
  selectedArea = "SOUTH";
}

// בדיקת דירוג נבחר
if (search.indexOf("rank=RANK1") !== -1) {
  selectedRank = 4;
} else if (search.indexOf("rank=RANK2") !== -1) {
  selectedRank = 3;
} else if (search.indexOf("rank=ALL_RANKS") !== -1) {
  selectedRank = 0;
}

// מערך המסעדות
var restaurants = [
  { id: 1, name: "ויטרינה אבן גבירול", price: "$$", area: "CENTER", rank: 4 },
  { id: 2, name: "ויטרינה לילינבלום", price: "$$", area: "SOUTH", rank: 4 },
  { id: 3, name: "GDB מעוז אביב", price: "$$", area: "NORTH", rank: 4 },
  { id: 4, name: "GDB אבן גבירול", price: "$$", area: "CENTER", rank: 4 },
  { id: 5, name: "פרוזדור", price: "$$", area: "CENTER", rank: 4 },
  { id: 6, name: "BEN'Z אבן גבירול", price: "$$", area: "CENTER", rank: 4 },
  { id: 7, name: "BEN'Z פלורנטין", price: "$$", area: "SOUTH", rank: 4 },
  { id: 8, name: "גורמה 26", price: "$$$", area: "SOUTH", rank: 4 },
  { id: 9, name: "MEAT BAR קלמן", price: "$$", area: "SOUTH", rank: 4 },
  { id: 10, name: "MEAT BAR חן", price: "$$", area: "CENTER", rank: 4 },
  { id: 11, name: "MEAT BAR אבן גבירול", price: "$$", area: "CENTER", rank: 4 },
  { id: 12, name: "M25 הכרמל", price: "$$$", area: "SOUTH", rank: 4 },
  { id: 13, name: "M25 רמת אביב", price: "$$$", area: "NORTH", rank: 4 },
  { id: 14, name: "LOCAL BURGER", price: "$$", area: "SOUTH", rank: 3 },
  { id: 15, name: "LBS דיזנגוף", price: "$$", area: "CENTER", rank: 4 },
  { id: 16, name: "LBS פארק המסילה", price: "$$", area: "SOUTH", rank: 4 },
  { id: 17, name: "PORT 19 החשמונאים", price: "$$", area: "SOUTH", rank: 4 },
  { id: 18, name: "PORT 19 שלמה המלך", price: "$$", area: "CENTER", rank: 4 },
  { id: 19, name: "PORT 19 הרצל", price: "$$", area: "SOUTH", rank: 4 },
  { id: 20, name: "SUSU AND SONS", price: "$$", area: "CENTER", rank: 3 },
  { id: 21, name: "הגראז'", price: "$$$", area: "NORTH", rank: 4 },
  { id: 22, name: "OSU", price: "$$", area: "CENTER", rank: 4 },
  { id: 23, name: "AMERICA BURGERS", price: "$$", area: "SOUTH", rank: 4 },
  { id: 24, name: "גרינברג", price: "$$", area: "NORTH", rank: 3 },
  { id: 25, name: "הולשטיין", price: "$$", area: "CENTER", rank: 4 },
  { id: 26, name: "הסמטה בשוסטר", price: "$$", area: "NORTH", rank: 4 },
  { id: 27, name: "מקום של בשר", price: "$$$", area: "SOUTH", rank: 4 },
  { id: 28, name: "M32", price: "$$", area: "NORTH", rank: 4 },
  { id: 29, name: "FAT COW", price: "$$", area: "CENTER", rank: 4 },
  { id: 30, name: "המוסד", price: "$$", area: "CENTER", rank: 4 }
];

// בניית HTML בהתאם למסעדות שמתאימות לסינון
var html = "";
for (var i = 0; i < restaurants.length; i++) {
  var r = restaurants[i];
  var ok = true;

  // בדיקת אזור
  if (selectedArea !== "" && r.area !== selectedArea) {
    ok = false;
  }

  // בדיקת דירוג
  if (selectedRank === 4 && r.rank !== 4) {
    ok = false;
  } else if (selectedRank === 3 && r.rank < 3) {
    ok = false;
  }

  // בדיקת מחיר
  if (!priceDouble && !priceTriple) {
    // אם לא נבחר כלום, תן לעבור
  } else if (priceDouble && priceTriple) {
    // אם נבחרו שניהם, תן לעבור
  } else if (priceDouble && r.price !== "$$") {
    ok = false;
  } else if (priceTriple && r.price !== "$$$") {
    ok = false;
  }

  // אם עבר את כל הסינונים — הוסף למסך
  if (ok) {
    html += '<img id="image' + r.id + '" src="EX/pictures/' + r.id + '.png" style="display:none; width:300px;"><br>';
    html += '<button onclick="document.getElementById(\'image' + r.id + '\').style.display=\'block\'">' + r.name + ' - הצג תמונה</button><br>';
    html += '<button onclick="document.getElementById(\'image' + r.id + '\').style.display=\'none\'">הסתר תמונה</button><br><br>';
  }
}

// אם אין תוצאות כלל
if (html === "") {
  html = "<p>no results</p>";
}

// הצגת התוצאות ב־HTML
document.getElementById("all-restaurants").innerHTML = html;
