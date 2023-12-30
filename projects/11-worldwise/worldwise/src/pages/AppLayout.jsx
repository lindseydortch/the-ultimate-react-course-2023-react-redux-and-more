import SideBar from '../components/SideBar';
import Map from '../components/Map';
import User from '../components/User';
import styles from './AppLayout.module.css';

function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
