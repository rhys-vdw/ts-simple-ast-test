import Project  from "ts-simple-ast";
import * as path from "path"

// -- WORKING PROJECT -- //
//
// If you use this config it works for some reason, the type becomes "any". Not
// sure why. The config is the same.

// import { ModuleResolutionKind, ModuleKind, ScriptTarget } from "ts-simple-ast";

// const compilerOptions = {
//     "target": ScriptTarget.ES5,                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */
//     "module": ModuleKind.CommonJS,                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
//     "lib": ["esnext"],                             /* Specify library files to be included in the compilation. */
//     "sourceMap": true,                     /* Generates corresponding '.map' file. */
//     "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
//     "strict": true,                           /* Enable all strict type-checking options. */
//     "noUnusedLocals": true,                /* Report errors on unused locals. */
//     "noUnusedParameters": true,            /* Report errors on unused parameters. */
//     "moduleResolution": ModuleResolutionKind.NodeJs,            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
//     "esModuleInterop": true                   /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
// }

// const project = new Project({
//     compilerOptions,
//         "lib": ["esnext"],
//         "strict": true,
//         "noUnusedLocals": true,
//         "noUnusedParameters": true,
//     },
//     useVirtualFileSystem: true
// })

// -- FAILING PROJECT -- //

const project = new Project({
    tsConfigFilePath: path.join(__dirname, "./tsconfig.json"),
    addFilesFromTsConfig: false
});

const sourceFile = project.createSourceFile(
    "src/index.ts", `
    interface Foo {
        a: number,
        b: number,
    }

    export type Picked = Pick<Foo, "a">
`);

const type = sourceFile.getTypeAliases()[0].getType();

type.getProperties() // <-- THIS LINE THROWS
