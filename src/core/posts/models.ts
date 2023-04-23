export interface BlogPost {
    slug: string;
    frontmatter: any;
}

export type FileTuple<T> = [string, T]