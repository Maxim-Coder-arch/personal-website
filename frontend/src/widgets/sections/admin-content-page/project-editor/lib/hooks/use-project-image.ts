import { useEffect, useMemo, useRef, useState } from "react";

import { PROJECT_EDITOR_CONFIG, PROJECT_IMAGE_TYPES, PROJECT_LIMITS } from "../../model/config";

const { messages } = PROJECT_EDITOR_CONFIG;

export const useProjectImage = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string>();

    const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const reset = () => {
        setFile(null);
        setError(undefined);

        if (inputRef.current) inputRef.current.value = "";
    };

    const select = (next: File | null) => {
        if (!next) return;

        if (!(PROJECT_IMAGE_TYPES as readonly string[]).includes(next.type)) {
            setError(messages.imageType);
            return;
        }

        if (next.size > PROJECT_LIMITS.imageMaxBytes) {
            setError(messages.imageSize);
            return;
        }

        setError(undefined);
        setFile(next);
    };

    return { inputRef, file, previewUrl, error, select, reset };
};