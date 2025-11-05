import classes from './main-page.module.css'
import MainPageContent from "./mainPageContent/mainPageContent";
import Standings from "./standings/standings";
import AboutUs from "./aboutUs/aboutUs";
import FAQ from "./FAQ/FAQ";
import Trainings from "./tranings/tranings";
import Contact from "./contact/contact";

export default function Home() {
  return (
      <div className={classes.mainPage}>
          <div className={classes.mainBG}>
              <MainPageContent />
          </div>
          <div className={classes.contentBox}>
              <AboutUs />
          </div>
          <div className={classes.contentBox}>
              <Standings />
          </div>
          <div className={classes.contentBox}>
              <Trainings />
          </div>
          <div className={classes.contentBox}>
              <FAQ />
          </div>
          <div className={classes.contentBox}>
              <Contact />
          </div>
      </div>
  );
}
