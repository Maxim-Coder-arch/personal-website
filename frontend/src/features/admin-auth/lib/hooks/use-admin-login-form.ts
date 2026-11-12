"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { useRouter } from "next/navigation";

import { useAnimationControls, useReducedMotion } from "framer-motion";

import { LoginError } from "@/src/entities/api/admin-auth/admin-auth-api";
import { useAdminLogin } from "@/src/entities/api/admin-auth/admin-auth-queries";

import { SHAKE } from "../../model/animations";
import { LOGIN_COPY } from "../../model/data";

export const useAdminLoginForm = () => {
    const router = useRouter();
    const login = useAdminLogin();
    const controls = useAnimationControls();
    const shouldReduceMotion = useReducedMotion();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const pending = login.isPending || login.isSuccess;
    const canSubmit = email.trim().length > 0 && password.length > 0;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (pending || !canSubmit) {
            return;
        }

        setError(null);

        login.mutate(
            { email, password },
            {
                onSuccess: () => {
                    router.replace("/admin");
                    router.refresh();
                },
                onError: (cause) => {
                    setError(
                        cause instanceof LoginError
                            ? LOGIN_COPY.errors[cause.reason]
                            : LOGIN_COPY.errors.unknown,
                    );

                    if (!shouldReduceMotion) {
                        void controls.start(SHAKE);
                    }
                },
            },
        );
    };

    return {
        email,
        password,
        passwordVisible,
        error,
        pending,
        canSubmit,
        controls,
        setEmail,
        setPassword,
        togglePassword: () => setPasswordVisible((value) => !value),
        handleSubmit,
    };
};