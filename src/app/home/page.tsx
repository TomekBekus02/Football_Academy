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
          <div id="oNas" className={classes.contentBox}>
              <AboutUs />
          </div>
          <div className={classes.contentBox}>
              <Standings />
          </div>
          <div id="Treningi" className={classes.contentBox}>
              <Trainings />
          </div>
          <div id="FAQ" className={classes.contentBox}>
              <FAQ />
          </div>
          <div id="kontakt" className={classes.contentBox}>
              <Contact />
          </div>
      </div>
  );
}
