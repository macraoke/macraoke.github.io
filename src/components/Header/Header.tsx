import { FC } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getNextVideo, getRandomVideo, Videos } from "../../interfaces/Video";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const params = useParams();
  const navigate = useNavigate();

  const top = () => {
    navigate(`/${getNextVideo(params.video)}`);
  };

  const random = () => {
    navigate(`/${getRandomVideo(params.video)}`);
  };

  return (
    <header className="mb-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold tracking-tight">
          <Link to="/" className="text-white no-underline hover:text-white">
            🎤 Macraoke
          </Link>
        </h1>
        <nav className="flex flex-wrap gap-2">
          <button type="button" onClick={random} className="btn">
            🔀 Aléatoire
          </button>
          <button type="button" onClick={top} className="btn">
            Suivant ⏭
          </button>
          <a
            href="https://buymeacoffee.com/Macraoke"
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            🍺 Nous offrir une bière
          </a>
        </nav>
      </div>
      <ul className="-mx-1 flex flex-wrap gap-1">
        {Videos.map((video) => (
          <li key={video.id}>
            <Link
              to={`/${video.id}`}
              className="chip block"
              aria-current={video.id === params.video ? "page" : undefined}
            >
              {video.name}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
