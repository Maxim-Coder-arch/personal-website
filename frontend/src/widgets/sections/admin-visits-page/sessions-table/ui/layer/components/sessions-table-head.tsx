import styles from "../../styles/sessions-table.module.scss";

const COLUMNS = [
    "Время",
    "Посетитель",
    "Страна",
    "Устройство",
    "Браузер",
    "Страниц",
    "Длительность",
    "Вход",
] as const;

export const SessionsTableHead = () => {
    return (
        <thead className={styles["head"]}>
            <tr>
                {COLUMNS.map((column) => (
                    <th key={column} scope="col">
                        {column}
                    </th>
                ))}
            </tr>
        </thead>
    );
};