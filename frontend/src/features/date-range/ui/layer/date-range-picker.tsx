"use client";

import { AnimatePresence, motion } from "framer-motion";

import { Segmented } from "@/src/shared/ui/admin-ui";

import { useDateRangePicker } from "../../lib/hooks/use-date-range-picker";
import { datesMotion } from "../../model/animations";
import { DATE_RANGE_PILL_ID, PICKER_OPTIONS } from "../../model/data";

import styles from "../styles/date-range-picker.module.scss";

export const DateRangePicker = () => {
    const { 
      range, 
      preset, 
      maxDate, 
      handleChange, 
      handleFromChange, 
      handleToChange 
    } = useDateRangePicker();

    return (
        <div className={styles["picker"]}>
            <Segmented
                options={PICKER_OPTIONS}
                value={preset ?? "custom"}
                onChange={handleChange}
                layoutId={DATE_RANGE_PILL_ID}
            />

            <AnimatePresence>
                {preset === null && (
                    <motion.div className={styles["dates"]} {...datesMotion}>
                        <input
                            type="date"
                            className={styles["date"]}
                            value={range.from}
                            max={maxDate}
                            onChange={(event) => handleFromChange(event.target.value)}
                        />
                        <span className={styles["dash"]}>—</span>
                        <input
                            type="date"
                            className={styles["date"]}
                            value={range.to}
                            max={maxDate}
                            onChange={(event) => handleToChange(event.target.value)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};