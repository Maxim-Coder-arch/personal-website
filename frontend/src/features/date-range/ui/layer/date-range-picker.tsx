"use client";

import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import { Segmented } from "@/src/shared/ui/admin-ui";
import { DATE_FORMAT, RANGE_PRESETS } from "../../model/data";
import type { RangePresetId } from "../../model/types";
import { useDateRange } from "../../lib/hooks/use-date-range";
import styles from "../styles/date-range-picker.module.scss";

type PickerValue = RangePresetId | "custom";

const OPTIONS: { id: PickerValue; label: string }[] = [
  ...RANGE_PRESETS.map(({ id, label }) => ({ id, label })),
  { id: "custom", label: "Период" },
];

export function DateRangePicker() {
  const { range, preset, setPreset, setCustom } = useDateRange();
  const maxDate = format(new Date(), DATE_FORMAT);

  const handleChange = (id: PickerValue) => {
    if (id === "custom") {
      setCustom(range.from, range.to);
      return;
    }
    setPreset(id);
  };

  return (
    <div className={styles["picker"]}>
      <Segmented
        options={OPTIONS}
        value={preset ?? "custom"}
        onChange={handleChange}
        layoutId="date-range-pill"
      />
      <AnimatePresence>
        {preset === null && (
          <motion.div
            className={styles["dates"]}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <input
              type="date"
              className={styles["date"]}
              value={range.from}
              max={maxDate}
              onChange={(event) => {
                const value = event.target.value;
                if (!value) return;
                setCustom(value, value > range.to ? value : range.to);
              }}
            />
            <span className={styles["dash"]}>—</span>
            <input
              type="date"
              className={styles["date"]}
              value={range.to}
              max={maxDate}
              onChange={(event) => {
                const value = event.target.value;
                if (!value) return;
                setCustom(value < range.from ? value : range.from, value);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}