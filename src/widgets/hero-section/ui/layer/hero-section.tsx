import styles from "../styles/hero-section.module.scss";

export const HeroSection = () => {
    return (
        <div className={`${styles["hero-section"]} min-h-screen flex flex-col justify-center`}>
            <div className={`${styles["hero-section__labels"]} flex justify-between`}>
                <div className={`${styles["hero-section__labels__subtitle"]}`}>
                    <h2>maxim novikov</h2>
                    <p>Frontend разработчик</p>
                    <p>react / next.js / typescript</p>
                </div>
                
                <div className={`${styles["hero-section__labels__hero-link"]}`}>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.  exercitationem?</p>

                </div>
            </div>

            <div className={`${styles["hero-section__title"]} flex justify-center`}>
                <h1>frontend engineer</h1>
            </div>

            <div className={`${styles["hero-section__decorators"]} bg-black min-h-5`}>

            </div>
        </div>
    )
}