import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";

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

  // const categoryId = Number(window.location.pathname.slice(1));

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

  const handleCategorySelect = (id) => {
    dispatch(getImagesByCategory(id));
  };

  return (
    <>
      <Router>
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
                      alt="Loading..."
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
                onClick={() => handleImagesBrowsing()}
                className={styles.browseImages}
              >
                Browse more...
              </button>
            )}
          </div>
          <div className={styles.categoriesContainer}>
            <p className={styles.categoryTitle}>Select the category</p>
            <ul className={styles.selectCategory}>
              <li
                onClick={() => handleCategorySelect(1)}
                className={styles.home}
              >
                <Link to={"/"}>home</Link>
              </li>
              {status === "fulfilled" &&
                catCategories.map((category, idx) => {
                  return (
                    <li
                      onClick={() => handleCategorySelect(category.id)}
                      value={category.id}
                      className={styles.category}
                      key={idx}
                    >
                      <Link to={`${category.id}`}>{category.name}</Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </Router>
    </>
  );
}
