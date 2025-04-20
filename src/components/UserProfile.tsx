import styles from './UserProfile.module.css';

type Props = {
  name: string;
  profilePicture: string;
  bio: string;
};

const UserProfile = ({ name, profilePicture, bio }: Props) => {
  return (
    <div className={styles.card}>
      <img src={profilePicture} alt="Profile" className={styles.img} />
      <h2>{name}</h2>
      <p>{bio}</p>
    </div>
  );
};

export default UserProfile;

