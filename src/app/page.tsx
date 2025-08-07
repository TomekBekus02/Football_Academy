import classes from './main-page.module.css'
export default function Home() {
  return (
    <div className={classes.mainPage}>
      <main className={classes.mainBG}>
        <div className={classes.contentBox}>
          <h1>Rozwijaj swój talent piłkarski z nami</h1>
          <h4>
            Profesjonalna szkółka piłkarska z nowoczesnym podejściem 
            do treningu i rozwoju młodych talentów
          </h4>
          <div className={classes.statsBox}>
            <div className={classes.plateBox}>
              <div className={classes.standingsBox}>
                <h3>150+</h3>
                <h5>Zawodników</h5>
              </div>
            </div>
            <div className={classes.plateBox}>
              <div className={classes.standingsBox}>
                <h3>30</h3>
                <h5>Personelu</h5>
              </div>
            </div>
            <div className={classes.plateBox}>
              <div className={classes.standingsBox}>
                <h3>15</h3>
                <h5>Doświadczenia</h5>
              </div>
            </div>
            <div className={classes.plateBox}>
              <div className={classes.standingsBox}>
                <h3>25</h3>
                <h5>Trofeów</h5>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
