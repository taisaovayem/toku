import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Link } from "@radix-ui/themes";

export function Footer() {
  return (
    <footer style={{ paddingTop: "1rem" }}>
      Đóng góp nội dung tại
      <Link href="https://github.com/taisaovayem/toku">
        <span className="inline-block align-middle"></span> <GitHubLogoIcon />{" "}
        Github
      </Link>{" "}
      hoặc gửi email đến{" "}
      <Link href="mailto:why@taisaovayem.com">why@taisaovayem.com</Link>
    </footer>
  );
}
