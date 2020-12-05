import './App.css';
import ProfileHome from './Components/ProfileHome';
import firebase from 'firebase';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';

function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyDR8-JQW20cL8l25o7Kj6zsS3qTVjcpkXw',
      authDomain: 'charitiesforgood-3b94e.firebaseapp.com',
      projectId: 'charitiesforgood-3b94e',
      storageBucket: "charitiesforgood-3b94e.appspot.com",
      messagingSenderId: "289668347122",
      appId: "1:289668347122:web:b0028d826274484346cc6b"
    });
  }
  
  return (
    <Router>
      <Route path="/" component={HomeScreen} />
    </Router>
  );
}

export default App;