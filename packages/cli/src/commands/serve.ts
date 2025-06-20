import path from "path";
import { Command } from "commander";
import { serve } from "@huyreactnotebook/local-api";

interface LocalApiError {
  code: string;
}

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  .command("serve [filename]") // [filename] optional args
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run server on", "4005") // <number> mandatory arg, ensure all param is string
  .action(async (filename = "notebook.js", options: { port: string }) => {
    const isLocalApiError = (err: any): err is LocalApiError => {
      return typeof err.code === "string";
    };

    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      const basename = path.basename(filename);
      await serve(parseInt(options.port), basename, dir, !isProduction);
      console.log(`
        Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.
      `);
    } catch (err) {
      if (isLocalApiError(err)) {
        if (err.code === "EADDRINUSE") {
          console.error("Port is in use. Try running on a different port.");
        }
      } else if (err instanceof Error) {
        console.log("Here's the problem", err.message);
      }
      process.exit(1);
    }
  });
