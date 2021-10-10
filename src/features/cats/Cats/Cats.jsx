import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Loading from "../../Loading/Loading";
import {
  getCatsImages,
  getCatsCategories,
  browseMoreImages,
  getImagesByCategory,
} from "../catsSlice";

import styles from "./Cats.module.css";

export function Cats() {
  const [browsingPage, setBrowsingPage] = useState(2);

  const dispatch = useDispatch();

  const {
    catCategories,
    status,
    catImages,
    imagesStatus,
    imageBrowsingStatus,
  } = useSelector((state) => state.cats);

  useEffect(() => {
    dispatch(getCatsCategories());
    dispatch(getCatsImages());
  }, [dispatch]);

  const handleImagesBrowsing = () => {
    dispatch(browseMoreImages(browsingPage));
    setBrowsingPage(browsingPage + 1);
  };

  const handleCategorySelect = ({ target: { value } }) => {
    dispatch(getImagesByCategory(value));
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.imgContainer}>
          <h1>Images</h1>
          <div className="imagesBlock">
            {imagesStatus === "fulfilled" ? (
              catImages.map((image, idx) => {
                return (
                  <img
                    key={idx}
                    className={styles.eachImage}
                    src={image.url}
                    alt="it is a cat"
                  />
                );
              })
            ) : (
              <Loading />
            )}
          </div>
          {imageBrowsingStatus !== "fulfilled" ? <Loading /> : null}
          {imagesStatus === "fulfilled" && (
            <button
              onClick={handleImagesBrowsing}
              className={styles.browseImages}
            >
              Browse more...
            </button>
          )}
        </div>
        <div className={styles.categoriesContainer}>
          <p className={styles.categoryTitle}>Select the category</p>
          <select
            className={styles.selectCategory}
            onChange={handleCategorySelect}
          >
            <option value={"..."}>...</option>
            {status === "fulfilled" &&
              catCategories.map((category, idx) => {
                return (
                  <option
                    value={category.id}
                    className={styles.category}
                    key={idx}
                  >
                    {category.name}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
    </>
  );
}
