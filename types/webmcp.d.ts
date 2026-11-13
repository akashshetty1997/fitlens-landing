// Declarative WebMCP attributes (W3C Community Group draft, Chrome only):
// they let in-browser AI agents recognise a form as a tool and fill it.
import "react";

// The type parameter must match React's own declarations for the interfaces to merge.
/* eslint-disable @typescript-eslint/no-unused-vars */
declare module "react" {
  interface FormHTMLAttributes<T> {
    toolname?: string;
    tooldescription?: string;
  }
  interface InputHTMLAttributes<T> {
    toolparamdescription?: string;
  }
}
