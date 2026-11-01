import styles from "../../styles/tech-stack.module.scss";

export const TechStackHeader = () => {
    return (
        <header className={`${styles["tech-stack__heading"]} w-full flex flex-col`}>
            <div className="w-full flex justify-start">
                <h2>Tech stack</h2>
            </div>

            <div className="w-full flex justify-end">
                <h3>Те самые технологии</h3>
            </div>
        </header>
    );
};