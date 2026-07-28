import { useSelector } from "react-redux";

import {
  selectTotalPosts,
  selectDraftPosts,
  selectPublishedPosts,
  selectPinnedPosts,
  selectTotalLikes,
} from "../features/postSlice";

function Dashboard() {
  const totalPosts = useSelector(selectTotalPosts);
  const drafts = useSelector(selectDraftPosts);
  const published = useSelector(selectPublishedPosts);
  const pinned = useSelector(selectPinnedPosts);
  const likes = useSelector(selectTotalLikes);

  const cards = [
    {
      title: "Total Posts",
      value: totalPosts,
      icon: "📄",
      className: "purple",
    },
    {
      title: "Drafts",
      value: drafts,
      icon: "📝",
      className: "orange",
    },
    {
      title: "Published",
      value: published,
      icon: "✅",
      className: "green",
    },
    {
      title: "Likes",
      value: likes,
      icon: "❤️",
      className: "pink",
    },
    {
      title: "Pinned",
      value: pinned,
      icon: "📌",
      className: "blue",
    },
  ];

  return (
    <div className="dashboard">

      {cards.map((card) => (
        <div
          className={`dashboard-card ${card.className}`}
          key={card.title}
        >

          <div className="dashboard-icon">
            {card.icon}
          </div>

          <div>

            <p>{card.title}</p>

            <h2>{card.value}</h2>

          </div>

        </div>
      ))}

    </div>
  );
}

export default Dashboard;