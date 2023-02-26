export interface Experience {
    company: string;
    title: string;
    logo: string;
    start: string;
    end?: string;
    description: string
}

export interface Proficiency {
    technology: string;
    level: number;
}

export interface BlogPostMetadata {
    slug: string;
    date: string;
    title: string;
    blurb: string;
}

export interface BlogPost {
    metadata: BlogPostMetadata;
}