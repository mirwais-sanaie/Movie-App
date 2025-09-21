import Image from "next/image";
import { signInAction } from "@/lib/actions";

function page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center ">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>

      <form action={signInAction}>
        <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
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
