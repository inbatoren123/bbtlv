// טעינת ביקורות שמורות כשנכנסים לדף
window.addEventListener("DOMContentLoaded", function () {
  // הגבלת תאריך
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("date").setAttribute("max", today);

  // לא נטען אוטומטית ביקורות כדי שלא יוכפלו
});

// שליחת ביקורת
document.getElementById("reviewForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const date = document.getElementById("date").value;
  const restaurant = document.getElementById("restaurant").value;
  const review = document.getElementById("review").value;

  if (review.length < 5 || review.length > 200) {
    alert("Unvalid input");
    return;
  }
fetch("/submit-review", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ date, restaurant, review })
})
.then(response => response.json())
.then(data => {
  alert(data.message); // מציג את ההודעה מהשרת
})
.catch(error => {
  console.error("Error submitting review:", error);
  alert("שגיאה בשליחת הביקורת לשרת");
});

  // יצירת תיבת ביקורת חדשה
  const reviewBox = document.createElement("div");
  reviewBox.classList.add("reviewBox");
  reviewBox.innerHTML = `
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Restaurant:</strong> ${restaurant}</p>
    <p><strong>Review:</strong> ${review}</p>
  `;

  // הוספת התגובה לדף
  document.getElementById("reviewsContainer").appendChild(reviewBox);

  // שמירה ב-localStorage
  const current = localStorage.getItem("reviewsHTML") || "";
  localStorage.setItem("reviewsHTML", current + reviewBox.outerHTML);

  // איפוס הטופס
  document.getElementById("reviewForm").reset();
});

// כפתור "לכל התגובות"
document.getElementById("loadReviews").addEventListener("click", function () {
  const container = document.getElementById("reviewsContainer");
  container.innerHTML = ""; // נקה תוכן קודם

  const savedReviews = localStorage.getItem("reviewsHTML");

  if (!savedReviews) {
    container.innerHTML = "<p>אין עדיין תגובות.</p>";
    return;
  }

  const title = document.createElement("h2");
  title.textContent = "Submitted Reviews";
  container.appendChild(title);

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = savedReviews;
  tempDiv.querySelectorAll("h2").forEach(h => h.remove()); // מסיר כותרות כפולות
  tempDiv.childNodes.forEach(child => container.appendChild(child));
});


function showAllReviews() {
  fetch("/get-reviews")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("reviewsContainer");
      container.innerHTML = "";

      if (data.length === 0) {
        container.innerHTML = "<p>אין עדיין תגובות.</p>";
        return;
      }

      const title = document.createElement("h2");
      title.textContent = "All Reviews";
      container.appendChild(title);

      data.forEach(review => {
        const box = document.createElement("div");
        box.className = "reviewBox";
        box.innerHTML = `
          <p><strong>Date:</strong> ${review.review_date}</p>
          <p><strong>Restaurant:</strong> ${review.restaurant}</p>
          <p><strong>Review:</strong> ${review.content}</p>
        `;
        container.appendChild(box);
      });

      localStorage.setItem("reviewsHTML", container.innerHTML);
    })
    .catch(err => {
      console.error("Error fetching reviews:", err);
      alert("שגיאה בטעינת הביקורות.");
    });
}


