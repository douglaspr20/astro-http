import { useEffect, useState, type FC } from 'react';
import './LikeCounter.module.css';
import confetti from 'canvas-confetti';
import debounce from 'lodash.debounce';

interface Props {
  postId: string;
}

const LikeCounter: FC<Props> = ({ postId }) => {
  const [likesCount, setLikesCount] = useState(0);
  const [likeClicks, setLikeClicks] = useState(0);
  const [isloading, setIsLoading] = useState(false);

  const likePost = () => {
    setLikesCount((preValue) => preValue + 1);
    setLikeClicks(likeClicks + 1);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2,
      },
    });
  };

  const updateLikes = debounce(() => {
    fetch(`/api/likes/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ likes: likeClicks }),
    });
    setLikeClicks(0);
  }, 500);

  useEffect(() => {
    const getCurrentLikes = async () => {
      const resp = await fetch(`/api/likes/${postId}`);

      if (!resp.ok) {
        console.log('Error fetching likes');
        return;
      }

      const data = await resp.json();

      setLikesCount(data.likes);
      setIsLoading(false);
    };

    setIsLoading(true);
    getCurrentLikes();
  }, []);

  useEffect(() => {
    if (likeClicks > 0) {
      updateLikes();
    }
    return () => {
      updateLikes.cancel();
    };
  }, [likeClicks]);

  return (
    <>
      {isloading ? (
        <div>Loading...</div>
      ) : (
        <button onClick={likePost}>
          {likesCount === 0 ? 'Like this post' : `Likes ${likesCount}`}
        </button>
      )}
    </>
  );
};

export default LikeCounter;
