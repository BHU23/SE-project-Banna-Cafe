import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { GetReadyPromotion } from "../../../../services/https/promotion";
import { PromotionInterface } from "../../../../interfaces/IPromotion";

export default function PromotionSlide() {
  const [promotions, setPromotions] = useState<PromotionInterface[]>([]);
  const getReadyPromotions = async () => {
    let res = await GetReadyPromotion();
    if (res) {
      setPromotions(res);
    }
  };

  useEffect(() => {
    getReadyPromotions();
  }, []);

  return (
    <>
      {promotions.length != 0 ? (
        <Carousel autoplay>
          {promotions.map((promotion, index) => (
            <div
              key={index}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "235px",
                  backgroundImage: `url(${promotion.Image})`,
                  backgroundSize: "100%",
                  backgroundPosition: "center",
                  lineHeight: "160px",
                  textAlign: "center",
                }}
              ></div>
            </div>
          ))}
        </Carousel>
      ) : (
        // <Carousel>
        //   <div
        //     style={{
        //       width: "100%",
        //       height: "100%",
        //       display: "flex",
        //       justifyContent: "center",
        //       alignItems: "center",
        //     }}
        //   >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundSize: "100%",
            backgroundPosition: "center",
            lineHeight: "160px",
            textAlign: "center",
            color: "#fff",
            backgroundImage: "#181D31",
          }}
        >
          coming soon . . .
        </div>
        //</> </div>
        //</Carousel>
      )}
    </>
  );
}
{
  /* <img
            src={promotion.Image}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              color: "#fff",
              // backgroundSize: "120%",
              // backgroundPosition: "center",
              lineHeight: "160px",
              textAlign: "center",
            }}
          /> */
}
{
  /* </div>
      ))}
    </Carousel> */
}
