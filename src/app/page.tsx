import classes from './main-page.module.css'
import MainPageContent from '../components/mainPageContent/mainPageContent'
import Standings from '../components/standings/standings'

export default function Home() {
  return (
    <div className={classes.mainPage}>
      <div className={classes.mainBG}>
        <MainPageContent/>
      </div>
      <div className={classes.standingsBox}>
        <Standings/>
      </div>
    </div>
  );
}
