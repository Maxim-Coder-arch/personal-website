import type { CSSProperties } from "react";
import styles from "./admin-ui.module.scss";

type SkeletonProps = {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
};

export function Skeleton({ width = "100%", height = 16 }: SkeletonProps) {
  return <div className={styles["skeleton"]} style={{ width, height }} />;
}