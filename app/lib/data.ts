export interface Recommendation {
    image: string
    name: string
    link: string
    stars: number
    description: string
    tags: Tag[]
    createdAt: string
    slug: string
}

export interface Tag {
    name: string
    link?: string
    // icon?: ReactNode
}

export const veracruzRec: Recommendation = {
    image: "/taco.jpg",
    name: "Veracruz Fonda",
    stars: 3,
    link: "",
    description: `
    The best tacos in Austin, Texas. I've tried a lot of tacos in town and 
    these are my favorites so far. They're big and filling and full of fresh 
    ingredients. The atmosphere is great, with indoor and outdoor seating options 
    (though I might avoid the latter in the summer months...)
    `,
    tags: [{ name: "Restaurant" }, { name: "Menu", link: "" }],
    createdAt: "July 3rd, 2023",
    slug: "veracruz-fonda",
}
