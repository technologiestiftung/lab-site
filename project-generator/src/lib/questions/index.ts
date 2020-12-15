import { buildTargetPath, isFolderSync, slug } from "../utils";
const questions = (force: boolean) => {
  return [
    {
      name: "folderName",
      message: "📁\tWhat should be the folder name? (Will appear in the url)\n",
      type: "input",
      filter: async (value: string) => {
        return slug(value);
      },
      validate: (value: string) => {
        if (value) {
          const pt = buildTargetPath(slug(value));
          if (isFolderSync(pt) === true && force === false) {
            process.stdout.write(
              "\n 🚨 🚨 🚨 The folder already exists  🚨 🚨 🚨 \n\n",
            );
            return false;
          } else if (isFolderSync(pt) === false) {
            return true;
          } else if (isFolderSync(pt) === true && force === true) {
            return true;
          }
        } else {
          process.stdout.write("\n 🚨 🚨 🚨 No value given 🚨 🚨 🚨 \n\n");
          process.exit(1);
        }
      },
    },
    {
      name: "fileType",
      message: "📄\tWhat type of markup do you want to use?\n",
      type: "list",
      choices: [
        { name: "Markdown [M↓]", value: "md", default: true },
        { name: "HTML ", value: "html" },
      ],
    },
    {
      name: "de_title",
      message: "🇩🇪\tWrite a title:\n",
      type: "input",
    },
    {
      name: "en_title",
      message: "🇬🇧\tWrite a title:\n",
      type: "input",
    },
    {
      name: "de_subtitle",
      message: "🇩🇪\tWrite a subtitle:\n",
      type: "input",
    },
    {
      name: "en_subtitle",
      message: "🇬🇧\tWrite a subtitle:\n",
      type: "input",
    },
    {
      name: "de_description",
      message: "🇩🇪\tWrite a description for the RSS feed:\n",
      type: "input",
    },
    {
      name: "en_description",
      message: "🇬🇧\tWrite a description for the RSS feed:\n",
      type: "input",
    },
    {
      name: "type",
      message: "⚙️\tWhat type of project is this?\n",
      type: "list",
      choices: [
        { name: "publication" },
        { name: "workshop" },
        { name: "dataset" },
        { name: "prototype" },
      ],
    },
    {
      name: "colorMode",
      message: "🎨\tIs the header image bright or dark?\n",
      type: "list",
      choices: [
        { name: "bright", value: "bright", default: true },
        { name: "dark", value: "dark" },
      ],
    },
    {
      name: "visible",
      message: "👀\tShould the project be visible?\n",
      type: "list",
      choices: [
        { name: "is visible", value: true },
        { name: "is not visible", value: false },
      ],
    },
    {
      name: "featured",
      message: "🥇\tShould it be a featured image?\n",
      type: "list",
      choices: [
        { name: "is featured", value: true },
        { name: "is not featured", value: false, default: true },
      ],
    },
    //TODO: [IPLSITE-12] Keep authors names up to date with the current team. Using GitHub API for example?
    {
      name: "authors",
      message: "✏️\tWho are the authors?\n",
      type: "checkbox",
      choices: [
        // { name: "🙄\tAlexandra Kapp", value: "alexandra-kapp" },
        { name: "🧐\tBenjamin Seibel", value: "benjamin-seibel" },
        // { name: "😳\tFabian Dinklage", value: "fabian-dinklage" },
        { name: "🤔\tFabian Morón Zirfas", value: "fabian-moron-zirfas" },
        // { name: "😬\tSebastian Meier", value: "sebastian-meier" },
        { name: "🤩\tVictoria Boeck", value: "victoria-boeck" },
        // { name: "🤗\tJolanta Paliszewska ", value: "jolanta-paliszewska" },
        { name: "🤗\tJulia Zimmermann ", value: "julia-zimmermann" },
      ],
    },
    {
      name: "externalUrl",
      message: "🔗\tIs there a external url for the project?\n",
      type: "input",
    },
    {
      name: "status",
      message: "⌛️\tWhat is the status of the project?\n",
      type: "list",
      choices: [
        { name: "is ongoing", value: "ongoing" },
        { name: "is finished", value: "finished", default: true },
      ],
    },
  ];
};
export default questions;
