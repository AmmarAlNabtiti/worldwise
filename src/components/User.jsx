import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/facAuthContext';
import styles from "./User.module.css";

const FAKE_USER = {
  name: "Ammar",
  email: "Ammark@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function User() {
  // const user = FAKE_USER;
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) return;

  function handleClick() {
    navigate('/');

  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick} >Logout</button>
    </div>
  );
}

export default User;

