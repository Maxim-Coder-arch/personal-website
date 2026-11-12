"use client";

import { AnimatePresence, motion } from "framer-motion";

import { EyeIcon } from "@/src/shared/icons/globals/eye-icon";
import { EyeOffIcon } from "@/src/shared/icons/globals/eye-off-icon";

import { useAdminLoginForm } from "../../lib/hooks/use-admin-login-form";
import { FADE_VARIANTS, FORM_VARIANTS } from "../../model/animations";
import { LOGIN_COPY } from "../../model/data";

import { LoginField } from "./components/login-field";

import styles from "../styles/admin-auth.module.scss";

export const AdminLoginForm = () => {
    const {
        email,
        password,
        passwordVisible,
        error,
        pending,
        canSubmit,
        controls,
        setEmail,
        setPassword,
        togglePassword,
        handleSubmit,
    } = useAdminLoginForm();

    return (
        <motion.div className={styles["shake"]} animate={controls}>
            <motion.form
                className={styles["login"]}
                variants={FORM_VARIANTS}
                initial="hidden"
                animate="visible"
                noValidate
                onSubmit={handleSubmit}
            >
                <motion.div className={styles["login__head"]} variants={FADE_VARIANTS}>
                    <span className={styles["login__mark"]}>{LOGIN_COPY.mark}</span>
                    <span className={styles["login__eyebrow"]}>{LOGIN_COPY.eyebrow}</span>
                    <h1 className={styles["login__title"]}>{LOGIN_COPY.title}</h1>
                    <p className={styles["login__text"]}>{LOGIN_COPY.text}</p>
                </motion.div>

                <motion.div variants={FADE_VARIANTS}>
                    <LoginField
                        id="email"
                        label={LOGIN_COPY.email}
                        type="email"
                        value={email}
                        autoComplete="username"
                        autoFocus
                        onChange={setEmail}
                    />
                </motion.div>

                <motion.div variants={FADE_VARIANTS}>
                    <LoginField
                        id="password"
                        label={LOGIN_COPY.password}
                        type={passwordVisible ? "text" : "password"}
                        value={password}
                        autoComplete="current-password"
                        onChange={setPassword}
                        trailing={
                            <button
                                type="button"
                                className={styles["field__toggle"]}
                                aria-label={
                                    passwordVisible
                                        ? LOGIN_COPY.hidePassword
                                        : LOGIN_COPY.showPassword
                                }
                                aria-pressed={passwordVisible}
                                onClick={togglePassword}
                            >
                                {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                        }
                    />
                </motion.div>

                <AnimatePresence initial={false}>
                    {error && (
                        <motion.p
                            key={error}
                            role="alert"
                            className={styles["login__error"]}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>

                <motion.div variants={FADE_VARIANTS}>
                    <button
                        type="submit"
                        className={styles["login__submit"]}
                        disabled={pending || !canSubmit}
                    >
                        {pending ? (
                            <>
                                <span className={styles["login__spinner"]} aria-hidden="true" />
                                {LOGIN_COPY.pending}
                            </>
                        ) : (
                            LOGIN_COPY.submit
                        )}
                    </button>
                </motion.div>

                <motion.p className={styles["login__hint"]} variants={FADE_VARIANTS}>
                    {LOGIN_COPY.hint}
                </motion.p>
            </motion.form>
        </motion.div>
    );
};