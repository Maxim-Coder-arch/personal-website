"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, ImageOff, Pencil, Trash2 } from "lucide-react";

import { getAdminProjectImageUrl } from "@/src/entities/api/admin-projects/admin-projects-api";
import { ADMIN_ROUTES } from "@/src/shared/config/admin-routes";
import { AdminButton } from "@/src/shared/ui/admin-ui";

import { getRowMotion } from "../../../model/animations";
import type { ProjectRowProps } from "../../../model/types";

import styles from "../../styles/projects-list.module.scss";

export const ProjectRow = ({
    project,
    index,
    total,
    version,
    canMove,
    moving,
    onMove,
    onDelete,
}: ProjectRowProps) => {
    const [broken, setBroken] = useState(false);

    return (
        <motion.li className={styles["row"]} {...getRowMotion(index)}>
            <div className={styles["row__order"]}>
                <button
                    type="button"
                    className={styles["move"]}
                    aria-label="Выше"
                    disabled={!canMove || moving || index === 0}
                    onClick={() => onMove(index, -1)}
                >
                    <ArrowUp size={14} />
                </button>

                <button
                    type="button"
                    className={styles["move"]}
                    aria-label="Ниже"
                    disabled={!canMove || moving || index === total - 1}
                    onClick={() => onMove(index, 1)}
                >
                    <ArrowDown size={14} />
                </button>
            </div>

            <div className={styles["row__thumb"]}>
                {broken ? (
                    <ImageOff size={20} />
                ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={getAdminProjectImageUrl(project.id, version)}
                        alt=""
                        className={styles["row__image"]}
                        onError={() => setBroken(true)}
                    />
                )}
            </div>

            <div className={styles["row__main"]}>
                <Link href={ADMIN_ROUTES.projectEdit(project.id)} className={styles["row__title"]}>
                    {project.title}
                </Link>

                <p className={styles["row__subtitle"]}>{project.subtitle}</p>

                <div className={styles["row__meta"]}>
                    <span>Полей: {project.additionalData.length}</span>
                </div>
            </div>

            <div className={styles["row__actions"]}>
                <AdminButton
                    size="sm"
                    href={ADMIN_ROUTES.projectEdit(project.id)}
                    icon={<Pencil size={14} />}
                >
                    Изменить
                </AdminButton>

                <AdminButton
                    size="sm"
                    variant="danger"
                    icon={<Trash2 size={14} />}
                    onClick={() => onDelete(project)}
                >
                    Удалить
                </AdminButton>
            </div>
        </motion.li>
    );
};