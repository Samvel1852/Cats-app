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

  const {
    catCategories,
    status,
    catImages,
    imagesStatus,
    imageBrowsingStatus,
  } = useSelector((state) => state.cats);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCatsCategories());
    dispatch(getCatsImages());
  }, []);

  // useEffect(() => {}, [browsingPage]);

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
          {imagesStatus === "fulfilled" ? (
            catImages.map((image, idx) => {
              return (
                <div key={idx} className={styles.image}>
                  <img className={styles.eachImage} src={image.url} />
                </div>
              );
            })
          ) : (
            <Loading />
          )}
          {imageBrowsingStatus !== "fulfilled" ? <Loading /> : null}
          <button
            onClick={handleImagesBrowsing}
            className={styles.browseImages}
          >
            Browse more...
          </button>
        </div>
        <div className={styles.categoriesContainer}>
          <h1>Select the category</h1>
          <select onChange={handleCategorySelect}>
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
