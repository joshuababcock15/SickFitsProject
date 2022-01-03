import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { CartItem } from './schemas/CartItem';
import { User } from './schemas/User';
import { OrderItem } from './schemas/OrderItem';
import { Order } from './schemas/Order';
import { extendGraphqlSchema } from './mutations';
import { Product } from './schemas/Product';
import { Role } from './schemas/Role';
import { ProductImage } from './schemas/ProductImage';
import 'dotenv/config';
import { insertSeedData } from './seed-data';
import { sendPasswordResetEmail } from './lib/mail';
import { permissionsList } from './schemas/fields';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-reg-prep-site';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long should they stay signed in
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  // needs to know which schemas that is responsible for the user
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // Todo: add in init role here
  },
  passwordResetLink: {
    async sendToken(args) {
      // send the email
      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth(
  config({
    // @ts-ignore
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true, // creates a cookie
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      // TODO: add data seeding here
      async onConnect(keystone) {
        console.log('connected to DB!');
        // only want to run it when someone passes an argument
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      // schema items go in here
      User,
      Product,
      ProductImage,
      CartItem,
      OrderItem,
      Order,
      Role,
    }),
    extendGraphqlSchema,
    ui: {
      // TODO: change this for roles
      // show the UI only for people how pass this test
      // isAccessAllowed: false;  test to see if the error definition comes up
      isAccessAllowed: ({ session }) =>
        // console.log(session);
        !!session?.data,
    },
    // TODO: ADD session values here
    session: withItemData(statelessSessions(sessionConfig), {
      // graphQL query
      User: `id name email role { ${permissionsList.join(' ')} }`,
    }),
  })
);
