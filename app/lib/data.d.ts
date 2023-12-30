export interface Recommendation {
    title: string
    link: string
    image: string
    stars: number
    description: string
    tags: Tag[]
    createdOn: Date
    slug: string
}

export interface Tag {
    name: string
    link?: string
    // icon?: ReactNode
}
