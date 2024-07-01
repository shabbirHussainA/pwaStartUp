import React from 'react'
import { Link } from 'react-router-dom';
function SkuGalleryItem({
    sku = "",
    handleLinkClick,
    className = "",
    productLink
}) {
  return (
    <>
      <Link
                onClick={handleLinkClick}
                to={productLink}
                className={className}
                data-cy="GalleryItem-name"
            >
                <span>sku: {sku}</span>
                
                
            </Link>
    </>
  )
}

export default SkuGalleryItem