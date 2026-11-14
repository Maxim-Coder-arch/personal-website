"use client";

import { AdminConfirm } from "@/src/shared/ui/admin-ui";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";

import { useArticlesList } from "../../lib/hooks/use-articles-list";

import { ArticleRow } from "./components/article-row";
import { ArticlesEmpty } from "./components/articles-empty";
import { ArticlesLayout } from "./components/articles-layout";
import { ArticlesSkeleton } from "./components/articles-skeleton";
import { ArticlesToolbar } from "./components/articles-toolbar";

import styles from "../styles/articles-list.module.scss";

export const ArticlesList = () => {
    const { query, articles, search, setSearch, pending, requestDelete, cancelDelete, confirmDelete, deleting } =
        useArticlesList();

    return (
        <>
            <ArticlesLayout
                total={query.data?.length}
                toolbar={<ArticlesToolbar search={search} onSearchChange={setSearch} />}
            >
                <QueryBoundary
                    query={query}
                    loadingFallback={<ArticlesSkeleton />}
                    emptyFallback={<ArticlesEmpty />}
                    isEmpty={(data) => data.length === 0}
                >
                    {() =>
                        articles.length === 0 ? (
                            <p className={styles["nothing"]}>Ничего не найдено</p>
                        ) : (
                            <ul className={styles["list"]}>
                                {articles.map((article, index) => (
                                    <ArticleRow
                                        key={article.id}
                                        article={article}
                                        index={index}
                                        onDelete={requestDelete}
                                    />
                                ))}
                            </ul>
                        )
                    }
                </QueryBoundary>
            </ArticlesLayout>

            <AdminConfirm
                open={pending !== null}
                title="Удалить статью?"
                description={
                    pending ? `«${pending.title}» исчезнет с сайта. Действие нельзя отменить.` : ""
                }
                pending={deleting}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </>
    );
};