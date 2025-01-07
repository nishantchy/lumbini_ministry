import Link from "next/link";
import { Button } from "../ui/button";

interface ButtonProps {
  href: string;
  text: string;
}

const LinkButton: React.FC<ButtonProps> = ({ href, text }) => {
  return (
    <Link href={href}>
      <Button className="px-6 !py-5 !text-base !rounded-3xl bg-primary text-white  hover:bg-primary-400 transition">
        {text}
      </Button>
    </Link>
  );
};

export default LinkButton;
