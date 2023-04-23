export interface BlogPost {
    slug: string;
    frontmatter: any;
}

export interface BlogPostMetadata {
    slug: string;
    title: string;
}

export type FileTuple<T> = [string, T]