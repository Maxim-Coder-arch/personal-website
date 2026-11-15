import { ITechnology } from "./types";

import { createRepeatedIcons } from "../lib/helpers/create-icons";

import { JsIcon } from "@/src/shared/icons/firm-icons/javascript";
import { TsIcon } from "@/src/shared/icons/firm-icons/typescript";
import { HtmlIcon } from "@/src/shared/icons/firm-icons/html";
import { CssIcon } from "@/src/shared/icons/firm-icons/css";
import { TailwindIcon } from "@/src/shared/icons/firm-icons/tailwind";
import { ReactIcon } from "@/src/shared/icons/firm-icons/react";
import { NextIcon } from "@/src/shared/icons/firm-icons/next";
import { FramerMotionIcon } from "@/src/shared/icons/firm-icons/framer-motion";
import { ZustandIcon } from "@/src/shared/icons/firm-icons/zustand";
import { TanStackQueryIcon } from "@/src/shared/icons/firm-icons/tanstack-query";
import { ScssIcon } from "@/src/shared/icons/firm-icons/scss";
import { CSharpIcon } from "@/src/shared/icons/firm-icons/c-sharp";
import { AspNetIcon } from "@/src/shared/icons/firm-icons/asp-net";
import { GoIcon } from "@/src/shared/icons/firm-icons/golang";
import { PostgresIcon } from "@/src/shared/icons/firm-icons/postgres";
import { MongoIcon } from "@/src/shared/icons/firm-icons/mongo";
import { GitIcon } from "@/src/shared/icons/firm-icons/git";
import { GithubIcon } from "@/src/shared/icons/social-networks/github";
import { VercelIcon } from "@/src/shared/icons/firm-icons/vercel";
import { DockerIcon } from "@/src/shared/icons/firm-icons/docker";
import { MySqlIcon } from "@/src/shared/icons/firm-icons/mysql";
import { ClaudeIcon } from "@/src/shared/icons/firm-icons/claude";
import { GptIcon } from "@/src/shared/icons/firm-icons/gpt";
import { TimewebIcon } from "@/src/shared/icons/firm-icons/timeweb";

export const technologies: ITechnology[] = [
    {
        id: "frontend",
        icons: createRepeatedIcons([
            { svgImage: <HtmlIcon />, pointerLabel: "Html" },
            { svgImage: <CssIcon />, pointerLabel: "Css" },
            { svgImage: <ScssIcon />, pointerLabel: "Scss" },
            { svgImage: <TailwindIcon />, pointerLabel: "Tailwindcss" },
            { svgImage: <JsIcon />, pointerLabel: "Javascript" },
            { svgImage: <TsIcon />, pointerLabel: "Typescript" },
            { svgImage: <ReactIcon />, pointerLabel: "React.js" },
            { svgImage: <NextIcon />, pointerLabel: "Next.js" },
            { svgImage: <ZustandIcon />, pointerLabel: "Zustand" },
            { svgImage: <TanStackQueryIcon />, pointerLabel: "Tanstack query" },
            { svgImage: <FramerMotionIcon />, pointerLabel: "Framer motion" },
        ]),
    },
    {
        id: "backend",
        icons: createRepeatedIcons([
            { svgImage: <CSharpIcon />, pointerLabel: "CSharp" },
            { svgImage: <AspNetIcon />, pointerLabel: "Asp.net core & Entity framework core" },
            { svgImage: <GoIcon />, pointerLabel: "Golang" },
        ]),
    },
    {
        id: "tools",
        icons: createRepeatedIcons([
            { svgImage: <GitIcon />, pointerLabel: "Git" },
            { svgImage: <GithubIcon />, pointerLabel: "Github" },
            { svgImage: <DockerIcon />, pointerLabel: "Docker" },
            { svgImage: <ClaudeIcon />, pointerLabel: "Claude code" },
            { svgImage: <GptIcon />, pointerLabel: "Chat gpt" },
        ]),
    },
    {
        id: "databases",
        icons: createRepeatedIcons([
            { svgImage: <PostgresIcon />, pointerLabel: "Postgresql" },
            { svgImage: <MongoIcon />, pointerLabel: "MongoDB" },
            { svgImage: <MySqlIcon />, pointerLabel: "MySQL" },
        ]),
    },
    {
        id: "other",
        icons: createRepeatedIcons([
            { svgImage: <VercelIcon />, pointerLabel: "Vercel" },
            { svgImage: <TimewebIcon />, pointerLabel: "Timeweb" },
        ]),
    },
];
