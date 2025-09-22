import Image from "next/image";
import { signInAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Login - Movie App",
  description: "Login to access your favorite movies",
};

function page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center ">
      <Button className="absolute top-5 left-5">
        <Link href={"/"} className="flex items-center gap-2">
          <ArrowLeft />
          Home
        </Link>
      </Button>
      <h2 className="text-2xl lg:text-3xl font-semibold text-center">
        Sign in to access your favorite movies
      </h2>

      <form action={signInAction}>
        <button className="cursor-pointer flex items-center gap-6 text-lg border-2 border-primary-300 px-10 py-4 font-medium">
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google logo"
            height="24"
            width="24"
          />
          <span>Continue with Google</span>
        </button>
      </form>
    </div>
  );
}

export default page;
