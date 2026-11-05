import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent, SyntheticEvent } from "react";

import { useRouter } from "next/navigation";

import { useScrollLock } from "@/src/shared/lib/hooks/use-scroll-lock";

interface UseArticleModalParams {
    reading: boolean;
    onExitReading: () => void;
}

export const useArticleModal = ({
    reading,
    onExitReading,
}: UseArticleModalParams) => {
    const router = useRouter();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [closing, setClosing] = useState(false);

    useScrollLock(true);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (dialog && !dialog.open) {
            dialog.showModal();
        }
    }, []);

    const requestClose = useCallback(() => setClosing(true), []);

    const finishClose = useCallback(() => {
        dialogRef.current?.close();
        router.back();
    }, [router]);

    const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
        event.preventDefault();

        if (reading) {
            onExitReading();
            return;
        }

        requestClose();
    };

    const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
        if (event.target === event.currentTarget) {
            requestClose();
        }
    };

    return {
        dialogRef,
        closing,
        requestClose,
        finishClose,
        handleCancel,
        handleBackdropClick,
    };
};