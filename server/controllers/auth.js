const db = require("./db");

async function login(userdata) {
    const { username, password } = userdata;
    const user = await db.query(
    `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`
  );

  if (user.length > 0) {
    const isAdmin = user[0].id === 1;
    return {user, isAdmin};
  } else {
    return "Invalid Credentials";
  }
}

module.exports = {login};