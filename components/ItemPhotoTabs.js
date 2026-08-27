import React from "react";
import { Button } from "react-bootstrap";
import {
  ITEM_PHOTO_CATEGORIES,
  normalizeItemPhotoCategory,
} from "../utils/itemPhotos";
import styles from "./ItemPhotoTabs.module.css";

export default function ItemPhotoTabs({
  photos = [],
  activeCategory,
  onCategoryChange,
  onRemovePhoto,
  onOpenPhoto,
}) {
  const normalizedCategory = normalizeItemPhotoCategory(activeCategory);
  const visiblePhotos = photos
    .map((photo, index) => ({
      photo,
      index,
      category: normalizeItemPhotoCategory(photo?.category),
    }))
    .filter((entry) => entry.category === normalizedCategory);

  return (
    <section className={styles.photoSection} aria-label="Item pictures">
      <div className={styles.tabs} role="tablist" aria-label="Picture type">
        {ITEM_PHOTO_CATEGORIES.map((category) => {
          const count = photos.filter(
            (photo) =>
              normalizeItemPhotoCategory(photo?.category) === category.id
          ).length;
          const selected = category.id === normalizedCategory;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={`${styles.tab} ${selected ? styles.activeTab : ""}`}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.label}
              <span>{count}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.tabPanel} role="tabpanel">
        {visiblePhotos.length ? (
          <div className={styles.gallery}>
            {visiblePhotos.map(({ photo, index }) => (
              <div key={photo?.storageName || photo?.url || index} className={styles.photoCard}>
                <button
                  type="button"
                  className={styles.photoButton}
                  onClick={() => onOpenPhoto?.(index)}
                  aria-label={`Open ${normalizedCategory} photo ${index + 1}`}
                  disabled={!onOpenPhoto}
                >
                  <img src={photo.url} alt="" className={styles.photo} />
                </button>
                {photo.file && onRemovePhoto && (
                  <Button
                    variant="danger"
                    size="sm"
                    className={styles.removeButton}
                    onClick={() => onRemovePhoto(index)}
                    aria-label="Remove photo"
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            No {normalizedCategory} pictures yet. Take a photo or browse to add
            one to this tab.
          </div>
        )}
      </div>
    </section>
  );
}
