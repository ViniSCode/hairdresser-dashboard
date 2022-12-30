import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { OwnerAlreadyExistsDocument } from "../../../generated/graphql";
import { client } from "../../../lib/urql";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      const email = user.email;

      const {data: {owner}} = await client.query(OwnerAlreadyExistsDocument, {email}).toPromise();
      if (owner === null) {
        await createOwner(email!);
      } else {
        // if customer doesn't exist
      }
      

      return true;
    },
  },
  
  jwt: {
    secret: process.env.JWT_SECRET!,
  },
});

async function createOwner(email: string) {
  const data = await fetch(
    `https://api-sa-east-1.hygraph.com/v2/cla71chwd0qx901uo0ry870iq/master`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.API_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
        mutation CrateCustomer {
          createOwner(data: {email: "${email}"}) { id }
          publishOwner (where: {email: "${email}"}) { id }
        }`,
      }),
    }
  );
  

  const response = await data.json();

  return response;
}
