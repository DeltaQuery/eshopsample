import React from 'react'
import "./DetailSkeleton.css"

export const DetailSkeleton = () => {
  return (
    <>
                <article
                    className="productContainer detailContainer detailSkeletonContainer"
                >
                    <div className="detailImgContainer detailSkeleton--imgContainer">
                      <div className="detailSkeleton--img detailSkeleton">.</div>
                    </div> 

                    <div className="detailInfoContainer">
                        <div className="detailSkeleton--name detailSkeleton"></div>

                        <div className="detailSkeleton--price detailSkeleton"></div>

                        <div className="detailSkeleton--functions detailSkeleton"></div>

                        <div className="detailSkeleton--button detailSkeleton"></div>
                    </div>
                </article>

            </>
  )
}
