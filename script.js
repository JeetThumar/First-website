// Supabase connection
const supabaseUrl = "https://lmmcloyppyezkxdnahmg.supabase.co";
const supabaseKey = "sb_publishable_cqi8ZmMdwB-3gSo1rvyCgg__k58ElUK";

// IMPORTANT: use a DIFFERENT variable name
const db = supabase.createClient(
  supabaseUrl,
  supabaseKey
);

console.log("Supabase connected successfully");

// Form submit
document.getElementById("myForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const name = document.getElementById("nameInput").value;

  const { error } = await db
    .from("users")
    .insert([{ name }]);

  if (error) {
    console.error("Insert error:", error);
    alert("Error: " + error.message);
  } else {
    alert("Data saved successfully ✅");
    document.getElementById("nameInput").value = "";
    loadUsers();
  }
});

async function loadUsers() {
  const { data, error } = await db
    .from("users")
    .select("*");

  if (error) {
    console.error("Fetch error:", error);
    return;
  }

  const list = document.getElementById("userList");
  list.innerHTML = "";

  data.forEach(user => {
    const li = document.createElement("li");
    li.textContent = user.name;
    list.appendChild(li);
  });
}

// Load data when page opens
loadUsers();
