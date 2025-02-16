import { motion } from "framer-motion";
import { useMemo } from "react";
import { Form, Link, useLoaderData } from "react-router";
import type { HydratedRec } from "~/lib/data";
import { Star } from "./Star";
import { Token } from "./Token";
import type { Route } from "../routes/_index/+types/route";

const frontmatterDateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    // Frontmatter dates get parsed as GMT:
    timeZone: "Europe/London",
});

export function Recommendation({ recommendation }: { recommendation: HydratedRec }) {
    const { stars: starsQuery } = useLoaderData() as Route.ComponentProps["loaderData"];

    const { slug, image, link, title, stars, description, tags } = recommendation;

    const showStars = !!stars;
    const starArray = Array(stars).fill(0);

    const createdOn = useMemo(
        () => frontmatterDateFormatter.format(recommendation.createdOn),
        [recommendation.createdOn],
    );

    return (
        <motion.div
            className="flex min-h-[264px] w-full flex-col items-start justify-center gap-5 rounded-xl border-2 border-black bg-[#FDFAF7] p-6 shadow-hard-lg sm:flex-row dark:bg-[#232326]"
            id={slug}
            layout="position"
        >
            {!!image && (
                <img
                    alt=""
                    className="aspect-[5/4] max-h-80 border-2 border-black object-cover shadow-hard sm:aspect-[2/3]"
                    src={image}
                />
            )}

            <div className="flex h-full w-full flex-col items-center justify-between">
                <div className="flex w-full flex-col items-center gap-3 pb-8 sm:items-start">
                    <div className="flex flex-col items-center gap-4 pb-5 sm:flex-row sm:pb-0">
                        <a
                            className="font-sans text-4xl hover:text-amber-500 dark:hover:text-purple-600"
                            href={link}
                            rel="noreferrer"
                            target="_blank"
                        >
                            {title}
                        </a>
                        {showStars && (
                            <Form>
                                <button
                                    className="group flex content-center items-center gap-3"
                                    name={starsQuery !== null ? undefined : "stars"}
                                    value={starsQuery !== null ? undefined : stars}
                                    aria-label={
                                        starsQuery !== null
                                            ? "Clear stars filter and show all reccomendations"
                                            : `Show ${stars} star recommendations`
                                    }
                                >
                                    {starArray.map((_, index) => (
                                        <Star key={index} hover={true} />
                                    ))}
                                </button>
                            </Form>
                        )}
                    </div>

                    <span
                        className="font-serif-text"
                        dangerouslySetInnerHTML={{ __html: description }}
                    ></span>
                </div>

                <div className="flex w-full flex-wrap items-center justify-between gap-4 pr-4">
                    <div className="flex items-center gap-3">
                        {tags?.map(tag => <Token key={tag.name} tag={tag} />)}
                    </div>
                    <Link
                        className="font-serif-text hover:text-amber-500 hover:underline dark:hover:text-purple-600"
                        to={`#${slug}`}
                    >
                        {createdOn}
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
