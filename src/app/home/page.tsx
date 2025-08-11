import classes from './main-page.module.css'
import MainPageContent from '../../components/mainPageContent/mainPageContent'
import Standings from '../../components/standings/standings'
import AboutUs from '@/components/aboutUs/aboutUs';

export default function Home() {
  return (
    <div className={classes.mainPage}>
      <div className={classes.mainBG}>
        <MainPageContent/>
      </div>
      <div className={classes.contentBox}>
        <AboutUs/>
      </div>
      <div className={classes.contentBox}>
        <Standings/>
      </div>
    </div>
  );
}
