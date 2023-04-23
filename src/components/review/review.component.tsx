import { useContext, useState } from "react";
import { UserContext } from "@/contexts/user.context";
import { addComment } from "@/tools/supabase";
import type { Feedbacks } from "@/types";
import type { FC } from "react";

interface Props {
  feedback: Feedbacks;
}

const Review: FC<Props> = ({ feedback }) => {
  const { currentUser } = useContext(UserContext);
  const [data, setData] = useState<string>("");
  const [stars, setStars] = useState(3);
  return (
    <div className="flex h-[calc(100vh-67.5px)] w-[25vw] flex-col border-r border-t border-l border-primary">
      {currentUser && (
        <form
          className="mb-4 flex w-full flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            addComment({
              id: feedback.id!,
              user_id: currentUser.id,
              content: data,
              created_at: "",
            }).catch((error) => console.log(error));
          }}
        >
          <div className="flex flex h-[64px] w-full items-center py-2 pl-8 text-xl font-bold">
            <h2 className="font-bold">Review</h2>
          </div>
          <label className="w-full text-center text-sm" htmlFor="rating">
            How would you rate this feedback ?
          </label>
          <div className="rating mx-auto mt-2">
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-warning hover:bg-warning"
              value={stars}
              onClick={() => {
                setStars(1);
              }}
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-warning hover:bg-warning"
              value={2}
              onClick={() => {
                setStars(2);
              }}
            />
            <input
              type="radio"
              name="rating"
              value={3}
              defaultChecked
              onClick={() => {
                setStars(3);
              }}
              className="mask mask-star-2 bg-warning hover:bg-warning"
            />
            <input
              type="radio"
              name="rating"
              value={4}
              onClick={() => {
                setStars(4);
              }}
              className="mask mask-star-2 bg-warning hover:bg-warning"
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-warning hover:bg-warning"
              value={5}
              onClick={() => {
                setStars(5);
              }}
            />
          </div>
          <div className="mx-auto mt-2 flex w-[50%]">
            <span className="w-[50%] text-center text-xs">Not Helpful</span>
            <span className="w-[50%] text-center text-xs">Very Helpful</span>
          </div>

          <div className="form-control my-4 mx-auto h-[30vh] w-[88%] rounded-md border border-primary bg-primary shadow-xl">
            <label className="label">
              <span className="label-text pl-2">
                Do you have any notes you want to share ?
              </span>
            </label>
            <textarea
              className="textarea-bordered textarea mx-auto mb-2 h-full w-[95%] resize-none border-primary"
              placeholder="Much wow !"
              value={data}
              onChange={() => setData(data)}
            ></textarea>
          </div>
          <button className="btn-secondary btn-wide btn mx-auto capitalize">
            Send
          </button>
        </form>
      )}
      <hr className="mx-auto w-[88%] text-primary" />
    </div>
  );
};

export default Review;
