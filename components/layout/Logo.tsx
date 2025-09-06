import logoImg from "@/public/logo.svg";
import Image from "next/image";

function Logo() {
  return (
    <div>
      <Image width={100} height={100} src={logoImg} alt={"logo"} />
    </div>
  );
}

export default Logo;
