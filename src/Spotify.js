const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "https://spotifyclientapp.herokuapp.com/";
const clientId = "fdcf5760de4a46f7a825ae4e1bc4a8ba";

const scopes = [
  "streaming",
  "user-read-email",
  "user-read-private",
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}`;

// loginUrl = "https://accounts.spotify.com/authorize?client_id=YourClientId&response_type=code&redirect_uri=https://localhost:3000/&scope=streaming%20user-read-email%20user-read-private"
