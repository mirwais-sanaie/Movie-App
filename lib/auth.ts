import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  // new

  callbacks: {
    authorized({
      request,
      auth,
    }: {
      request: import("next/server").NextRequest;
      auth: import("next-auth").Session | null;
    }) {
      return auth?.user ? true : false;
    },
    // async signIn({ user }) {
    //   try {
    //     const existingGuest = await getGuest(user.email);

    //     if (!existingGuest) {
    //       await createGuest({ email: user.email, fullName: user.name });
    //     }
    //     return true;
    //   } catch (err) {
    //     console.error("Sign-in error:", err);
    //     return false;
    //   }
    // },

    // async session({ session }) {
    //   const guest = await getGuest(session.user.email);
    //   session.user.guestId = guest?.id ?? null;
    //   return session;
    // },
  },

  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth(authConfig);
