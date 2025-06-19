### huyreactnotebook

#  React Note Book

```
Welcome to JSBook!

This is an interactive coding environment. You can write Javascript, see it executed, and write comprehensive documentation using markdown.
- Click any text cell to edit it
- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cell!
- You can show any React component, string, number, or anything else by calling the `print` function. This is a function built into this environment. Call `print` multiple times to show multiple values
- Re-order or delete cells using the buttons on the top right
- Add new cells by hovering on the divider between each cell

If installed with the cli, you can get all of your changes saved into a file. As example, try running `npx huyreactnotebook serve example.js`. All the text and code you write will be saved to the `<your-dir>/example.js` file.
```

## Quick Start

#### Via npx:

```bash
npx huyreactnotebook@latest serve
```

By default, this will create a local file with name `notebook.js` that will be hosted in the default port=4005. Navigate to http://localhost:4005 to edit the file.

You can also directly specify another port number or file that you want to open via additional command line options.

```bash
npx huyreactnotebook@latest serve [options] [filename]

# Set jsbook to run in port=8000
npx huyreactnotebook@latest serve --port 8000

# For example, to create a jsbook file named `notes.js`
npx huyreactnotebook@latest serve notes.js

# Run jsbook and open `notes.js` in a specified port=4000
npx huyreactnotebook@latest serve --port 4000 notes.js

```

#### Via NPM Global installation:

```bash
npm install -g huyreactnotebook@latest
```

Then, similarly to above (same command line options will also works), run:

```bash
huyreactnotebook serve
```

## Features

- Code snippet & preview
- Markdown editor
- Dynamic modules import
- In-browser bundling
- Cache layer
- Data persistence


## Development

1. Install dependencies with legacy-peer-deps and link local packages versions. Note: the extra double-dash is needed

```bash
lerna bootstrap -- --legacy-peer-deps
```

2. Compile packages, start react dev server, and watch outputs

```bash
lerna run start -- parallel
```

3. Launch CLI

```bash
cd jsbook/packages/cli/dist
node index.js serve
```

4. (Optional) Bump version and publish to NPM

```bash
lerna publish
```

## Featured in this project

@monaco-editor/react
@uiw/react-md-editor
axios
bulmaswatch
build-wasm
commander
cors
esbuild
express
http-proxy-middleware
jscodeshift
localforage
monaco-jsx-highlighter
prettier
react
react-app-rewired
react-dom
react-redux
react-resizable
react-scripts
redux
redux-thunk
typescript
