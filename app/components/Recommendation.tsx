import { motion } from "framer-motion"
import { useMemo } from "react"
import { Form, Link, useLoaderData } from "@remix-run/react"
import type { Recommendation as IRecommendation } from "~/lib/data"
import type { clientLoader } from "~/routes/_index"
import { Star } from "./Star"
import { Token } from "./Token"

export namespace Recommendation {
    export interface Props {
        recommendation: IRecommendation
    }
}

export function Recommendation({ recommendation }: Recommendation.Props) {
    let { starsQuery } = useLoaderData<typeof clientLoader>()

    let { slug, image, link, title, stars, description, tags } = recommendation

    let showStars = !!stars
    let starArray = Array(stars).fill(0)

    let createdOn = useMemo(
        () =>
            new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                // Because the frontmatter dates get parsed as GMT:
                timeZone: "Europe/London",
            }).format(recommendation.createdOn),
        [recommendation.createdOn],
    )

    return (
        <motion.div
            className="shadow-hard-lg flex min-h-[264px] w-full flex-col items-start justify-center gap-5 rounded-xl border-2 border-black bg-[#FDFAF7] p-6 sm:flex-row dark:bg-[#232326]"
            id={slug}
            layout
        >
            {!!image && (
                <img
                    alt=""
                    className="shadow-hard aspect-[5/4] max-h-80 border-2 border-black object-cover sm:aspect-[2/3]"
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
                                    aria-label={
                                        starsQuery !== null
                                            ? "Clear stars filter and show all reccomendations"
                                            : `Show ${stars} star recommendations`
                                    }
                                    className="group flex content-center items-center gap-3"
                                    name={starsQuery !== null ? undefined : "stars"}
                                    value={starsQuery !== null ? undefined : stars}
                                >
                                    {starArray.map((_, index) => (
                                        <Star hover={true} key={index} />
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
                        {tags.map(tag => (
                            <Token key={tag.name} tag={tag} />
                        ))}
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
    )
}
