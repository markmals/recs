/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />

declare module "path-esm" {
    /**
     * Returns an object from a path string - the opposite of format().
     *
     * @param path path to evaluate.
     * @throws {TypeError} if `path` is not a string.
     */
    function parse(path: string): ParsedPath

    /**
     * A parsed path object generated by path.parse() or consumed by path.format().
     */
    interface ParsedPath {
        /**
         * The root of the path such as '/' or 'c:\'
         */
        root: string
        /**
         * The full directory path such as '/home/user/dir' or 'c:\path\dir'
         */
        dir: string
        /**
         * The file name including extension (if any) such as 'index.html'
         */
        base: string
        /**
         * The file extension (if any) such as '.html'
         */
        ext: string
        /**
         * The file name without extension (if any) such as 'index'
         */
        name: string
    }
}
