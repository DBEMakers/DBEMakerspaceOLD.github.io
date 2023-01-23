import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: "5a6d2ab5-c8e5-46e5-a1dc-8a8f46fd9c6a", // Get this from tina.io
  token: "a6a2fcc5f60525115a773235620e8b21c8fafd2e", // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "/",
  },
  media: {
    tina: {
      mediaRoot: "/assets/images",
      publicFolder: "",
    },
  },
  schema: {
    collections: [
      {
        name: "exhibitions",
        label: "Exhibitions",
        path: "_exhibitions/2023",
        //  Named 'md' and not 'markdown' as that is a depracated with Tina.io. Using 'markdown' breaks some of the features such as adding content to the body
        format: "md",
        // As Jekyll posts require a date at the beginning, this code automatically adds it.
        ui: {
          filename: {
            readonly: false,
            slugify: values => {
              const date = new Date();
              const day = date.getDate();
              const month = date.getMonth() + 1;
              const year = date.getFullYear();
        
              let currentDate = `${year}-${month}-${day}`;
        
              return `${currentDate}-${values?.title?.toLowerCase().replace(/ /g, '-')}`
            }
          }
        },
        // Default Content for page
        defaultItem: () => {
          return {
            layout: "page",
            // parent: "2023",
            // grand_parent: "Exhibitions",
            
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "equipment",
        label: "Equipment",
        path: "_equipment",
        format: "md",
       
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "parent",
            label: "Sub Category",
            required: true,
            list: true,
            options: [
              {
                value: "Fabrication",
                label: "Fabrication"
              },
              {
                value: "Multimedia",
                label: "Multimedia"
              },
              {
                value: "Other",
                label: "Other"
              },
            ],
          },

          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
