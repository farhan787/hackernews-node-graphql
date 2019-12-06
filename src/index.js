const { GraphQLServer } = require('graphql-yoga');

const links = [
  {
    id: 'link-0',
    description: 'farhan787 github profile link',
    url: 'https://github.com/farhan787'
  }
];

let linksCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a  Hackernews Clone`,
    feed: () => links
  },

  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${linksCount++}`,
        url: args.url,
        description: args.description
      };

      links.push(link);
      return link;
    },

    updateLink: (parent, args) => {
      let linkIndex = links.findIndex(link => link.id == args.id);
      if (linkIndex >= 0 && linkIndex < linksCount) {
        if (args.description) links[linkIndex].description = args.description;
        if (args.url) links[linkIndex].url = args.url;
        return links[linkIndex];
      }
      return null;
    },

    deleteLink: (parent, args) => {
      let linkIndex = links.findIndex(link => link.id == args.id);
      let link = links[linkIndex];
      if (linkIndex >= 0 && linkIndex < linksCount) links.splice(linkIndex, 1);
      return link;
    }
  },

  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log(`Server is running at port 4000`));
