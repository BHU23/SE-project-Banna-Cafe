import React, { useState, useEffect } from "react";
import { MenusInterface } from "../../../../interfaces/IMenu";
import { message } from "antd";
import { FaStar } from "react-icons/fa";
import { IoRestaurantOutline } from "react-icons/io5";
import "./review.css";
import { CreateRating, UpdateRating } from "../../../../services/https/rating";
import { RatingsInterface } from "../../../../interfaces/IRating";
import { MembersInterface } from "../../../../interfaces/IMember";
interface ReviewMenuProps {
  onCloseReviewMenupop: () => void;
  reviewMenu: MenusInterface | undefined;
  member: MembersInterface | null;
  ratings: RatingsInterface[];
}
function ReviewMenu({
  reviewMenu,
  onCloseReviewMenupop,
  member,
  ratings,
}: ReviewMenuProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };
  const memberRatings = ratings.filter(
    (r) => r.MemberID === member?.ID && r.MenuID === reviewMenu?.ID
  );
  useEffect(() => {
    if (memberRatings.length !== 0) {
      handleStarClick(memberRatings[0]?.Score ?? 0);
    }
  }, []);
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= rating ? "star-selected" : "star-normal"}
          onClick={() => handleStarClick(i)}
        />
      );
    }
    return stars;
  };

  const submitRating = async () => {
    if (memberRatings.length === 0) {
      let values: RatingsInterface = {
        MemberID: Number(localStorage.getItem("id")),
        MenuID: reviewMenu?.ID,
        Score: rating,
      };
      let res = await CreateRating(values);
      if (res.status) {
        messageApi.open({
          type: "success",
          content: "ให้คะแนนสำเร็จ",
        });
        setTimeout(function () {
          onCloseReviewMenupop();
        }, 1000);
      } else {
        messageApi.open({
          type: "error",
          content: res.message,
        });
      }
    } else {
      let values: RatingsInterface = {
          ID: memberRatings[0].ID,
        MemberID: Number(localStorage.getItem("id")),
        MenuID: reviewMenu?.ID,
        Score: rating,
      };
      let res = await UpdateRating(values);
      if (res.status) {
        messageApi.open({
          type: "success",
          content: "เปลี่ยนคะแนนสำเร็จ",
        });
        setTimeout(function () {
          onCloseReviewMenupop();
        }, 1000);
      } else {
        messageApi.open({
          type: "error",
          content: res.message,
        });
      }
    }
  };

  return (
    <div className="review-crad">
      {contextHolder}
      <div className="rat-costadd">
        <div className="addmenu-rating"></div>
        <span className="icon-close-addmenu" onClick={onCloseReviewMenupop}>
          <IoRestaurantOutline />
        </span>
      </div>
      <div className="form-review">
        <div className="reviewmenu-imge">
          <img src={reviewMenu?.MenuImage} alt="Menu Image" />
        </div>
        <div className="addmenu-name">
          {reviewMenu?.MenuName} <br />
          <span>{reviewMenu?.MenuNameEng} </span>
        </div>
        <div className="rating-star">{renderStars()}</div>
      </div>
      <button className="btn-review" type="submit" onClick={submitRating}>
        +ให้คะแนน
      </button>
    </div>
  );
}
export default ReviewMenu;
