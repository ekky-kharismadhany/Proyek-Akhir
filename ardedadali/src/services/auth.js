import credentials from "../models/credentials"

export default function auth(username, password) {
    console.log(password);
    if (username === credentials.username && password === credentials.password) {
        return true;
    }
    return false;
}