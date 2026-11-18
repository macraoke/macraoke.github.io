import { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = () => (
  <footer className="mt-10 flex flex-wrap justify-center gap-x-4 gap-y-1 border-t border-white/10 pt-5 text-center text-sm text-zinc-500">
    <p>
      Inspiré par{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.youtube.com/watch?v=1flEYHtgVmg"
      >
        David Castello-Lopes ❤️
      </a>
    </p>
    <p>
      Publication :{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://twitter.com/ValentinViennot"
      >
        @ValentinViennot
      </a>{" "}&amp;{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://twitter.com/roger_miret"
      >
        @roger_miret
      </a>
    </p>
    <p>
      <a href={`${import.meta.env.BASE_URL}legal.txt`}>Mentions&nbsp;légales</a> —{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/ultragaucheforce/macraoke"
      >
        Code source
      </a>
    </p>
  </footer>
);

export default Footer;
