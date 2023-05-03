import React, { useRef, useState, useEffect, useContext } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import type { Feedbacks, Projects, Stars } from "@/types";

interface Props {
  feedback: Feedbacks | null;
  stars: Stars | null;
  isAdmin: boolean;
}

const ReviewStars: React.FC<Props> = ({ feedback, stars, isAdmin }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editStars, setEditStars] = useState<number | null>(
    stars?.value || null
  );

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleEditStarsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditStars(parseInt(e.target.value));
  };

  const handleEditStarsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditStars(editStars);
    setEdit(false);
  };

  const handleDelete = () => {
    // links && setLinks(links.filter((item) => item.id !== link!.id));
  };

  return (
    <>
      {isAdmin ? (
        <form
          className="flex w-full flex-col items-center"
          onSubmit={handleEditStarsSubmit}
        >
          {
            <>
              <label className="w-full text-center text-sm" htmlFor="rating">
                How would you rate this feedback ?
              </label>
              <div className="rating mx-auto mt-2">
                <input
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-warning hover:bg-warning"
                  value={1}
                  onClick={() => {
                    setEditStars(1);
                  }}
                />
                <input
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-warning hover:bg-warning"
                  value={2}
                  onClick={() => {
                    setEditStars(2);
                  }}
                />
                <input
                  type="radio"
                  name="rating"
                  value={3}
                  defaultChecked
                  onClick={() => {
                    setEditStars(3);
                  }}
                  className="mask mask-star-2 bg-warning hover:bg-warning"
                />
                <input
                  type="radio"
                  name="rating"
                  value={4}
                  onClick={() => {
                    setEditStars(4);
                  }}
                  className="mask mask-star-2 bg-warning hover:bg-warning"
                />
                <input
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-warning hover:bg-warning"
                  value={5}
                  onClick={() => {
                    setEditStars(5);
                  }}
                />
              </div>
            </>
          }
        </form>
      ) : (
        <>
          <label className="w-full text-center text-sm" htmlFor="rating">
            How would you rate this feedback ?
          </label>
          <div className="rating mx-auto mt-2">
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-warning hover:bg-warning"
              value={1}
              onClick={() => {
                setEditStars(1);
              }}
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-warning hover:bg-warning"
              value={2}
              onClick={() => {
                setEditStars(2);
              }}
            />
            <input
              type="radio"
              name="rating"
              value={3}
              defaultChecked
              onClick={() => {
                setEditStars(3);
              }}
              className="mask mask-star-2 bg-warning hover:bg-warning"
            />
            <input
              type="radio"
              name="rating"
              value={4}
              onClick={() => {
                setEditStars(4);
              }}
              className="mask mask-star-2 bg-warning hover:bg-warning"
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-warning hover:bg-warning"
              value={5}
              onClick={() => {
                setEditStars(5);
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ReviewStars;
