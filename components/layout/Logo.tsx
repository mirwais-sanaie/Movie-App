import logoImg from "@/public/Logo.png";
import Image from "next/image";

function Logo() {
  return (
    <div>
      <Image
        width={100}
        height={100}
        src={logoImg}
        alt={"logo"}
        className="mt-5 mb-3 md:mt-0 md:mb-0"
      />
    </div>
  );
}

export default Logo;
