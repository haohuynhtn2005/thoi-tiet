import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAvObaW9zYJCu8zn19NpDp8yL_M2xFArxU',
  authDomain: 'thoi-tiet-eaf1e.firebaseapp.com',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
