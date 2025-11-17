/// <reference types="react" />
// Temporary JSX shims to ensure project-wide JSX types are available.
// This avoids TS7026 errors when the global JSX.IntrinsicElements are not
// picked up by the type system. Prefer removing this after ensuring
// `@types/react` is found by the compiler.
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
