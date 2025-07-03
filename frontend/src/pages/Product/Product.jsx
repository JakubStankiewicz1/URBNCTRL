import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import "./product.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, addToCart, isInCart } = useProducts();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSize, setHoveredSize] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const product = getProductById(parseInt(id));
  const productImages =
    product?.galleryImages?.length > 0
      ? product.galleryImages
      : [
          product?.images?.primary,
          product?.images?.secondary || product?.images?.primary,
          product?.images?.gallery?.[0] || product?.images?.primary,
          product?.images?.gallery?.[1] ||
            product?.images?.secondary ||
            product?.images?.primary,
        ].filter(Boolean);

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };
  const isSizeOutOfStock = (size) => {
    return product?.sizeStock?.[size] === 0;
  };
  const getSizeStock = (size) => {
    return product?.sizeStock?.[size] || 0;
  };
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };
  const handleMouseEnter = () => {};
  const handleMouseLeave = () => {
    if (!isZoomed) {
      setMousePosition({ x: 50, y: 50 });
    }
  };
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      setMousePosition({ x: 50, y: 50 });
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize || !product) return;

    setIsAddingToCart(true);

    setTimeout(() => {
      const productToAdd = {
        ...product,
        selectedSize,
        id: product.id + "_" + selectedSize,
      };

      addToCart(productToAdd, quantity);
      setIsAddingToCart(false);

      setQuantity(1);
    }, 500);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isSellModalOpen) {
        setIsSellModalOpen(false);
      }
    };

    if (isSellModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isSellModalOpen]);

  if (!product) {
    return (
      <div className="productInfoNotFound">
        <div className="productInfoNotFoundContainer">
          <div className="productInfoNotFoundTitle">Product not found</div>
          <div
            className="productInfoNotFoundButton"
            onClick={() => navigate("/shop")}
          >
            Back to Shop
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="productInfo">
      {" "}
      <div className="productInfoBreadcrumb">
        <div
          className="productInfoBreadcrumbHome"
          onClick={() => navigate("/")}
        >
          Home
          <div className="productInfoBreadcrumbHomeDiv" />
        </div>
        <div className="productInfoBreadcrumbSeparator">
          <MdKeyboardArrowRight />
        </div>
        <div
          className="productInfoBreadcrumbShop"
          onClick={() => navigate("/shop")}
        >
          Shop
          <div className="productInfoBreadcrumbShopDiv" />
        </div>
        <div className="productInfoBreadcrumbSeparator">
          <MdKeyboardArrowRight />
        </div>
        <div className="productInfoBreadcrumbApparel">
          Apparel
          <div className="productInfoBreadcrumbApparelDiv" />
        </div>
        <div className="productInfoBreadcrumbSeparator">
          <MdKeyboardArrowRight />
        </div>
        <div className="productInfoBreadcrumbCurrent">{product?.name}</div>
      </div>
      <div className="productInfoContainer">
        <div className="productInfoContainerDiv">
          <div className="productInfoGallery">
            <div className="productInfoGalleryThumbnails">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={`productInfoGalleryThumbnailItem${selectedImage === index ? " productInfoGalleryThumbnailActive" : ""}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="productInfoGalleryThumbnailImage"
                  />
                </div>
              ))}
            </div>
            <div className="productInfoGalleryMain">
              <div
                className={`productInfoGalleryMainImage${isZoomed ? " productInfoGalleryMainImageZoomed" : ""}`}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={toggleZoom}
              >
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="productInfoGalleryMainImageImg"
                  style={
                    isZoomed
                      ? {
                          transform: `scale(2.5)`,
                          transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                          cursor: "zoom-out",
                        }
                      : { cursor: "zoom-in" }
                  }
                />
                {isZoomed && (
                  <div className="productInfoGalleryMainImageZoomHint">
                    Click to zoom out
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="productInfoDetails">
            <div className="productInfoDetailsTitle">{product?.name}</div>
            <div className="productInfoDetailsPrice">
              {product?.currency}
              {product?.price}
            </div>
            {product?.preOrder && (
              <div className="productInfoDetailsPreorder">
                Please Note: This is a pre-order item. Shipping begins April 7.
              </div>
            )}
            <div className="productInfoDetailsDesc">
              <div className="productInfoDetailsDescLine">
                {product?.description}
              </div>
              {product?.collaboration && (
                <div className="productInfoDetailsDescHighlight">
                  Collaboration with {product.collaboration}
                </div>
              )}
            </div>
            {product?.features && product.features.length > 0 && (
              <div className="productInfoDetailsFeatures">
                <div className="productInfoDetailsFeaturesTitle">Features</div>
                <div className="productInfoDetailsFeaturesList">
                  {product.features.map((feature, index) => (
                    <div key={index} className="productInfoDetailsFeaturesItem">
                      • {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {product?.fitGuide && (
              <div className="productInfoDetailsFitGuide">
                <div className="productInfoDetailsFitGuideTitle">
                  Fit guide:
                </div>
                <div className="productInfoDetailsFitGuideText">
                  {product.fitGuide}
                </div>
              </div>
            )}
            <div className="productInfoDetailsShipping">
              {product?.shippingInfo}
            </div>
            <div className="productInfoDetailsSizeSection">
              <div className="productInfoDetailsSizeTitle">Size</div>
              <div className="productInfoDetailsSizeOptions">
                {product?.sizes?.map((size) => (
                  <div
                    key={size}
                    className={`productInfoDetailsSizeOption${selectedSize === size ? " productInfoDetailsSizeOptionSelected" : ""}${
                      isSizeOutOfStock(size)
                        ? " productInfoDetailsSizeOptionOut"
                        : ""
                    }`}
                    onClick={() =>
                      !isSizeOutOfStock(size) && setSelectedSize(size)
                    }
                    onMouseEnter={() => setHoveredSize(size)}
                    onMouseLeave={() => setHoveredSize(null)}
                  >
                    <div className="productInfoDetailsSizeOptionText">
                      {size}
                    </div>
                    {isSizeOutOfStock(size) && (
                      <div className="productInfoDetailsSizeOptionStock">
                        Out of Stock
                      </div>
                    )}
                    {!isSizeOutOfStock(size) && getSizeStock(size) < 5 && (
                      <div className="productInfoDetailsSizeOptionStock">
                        Only {getSizeStock(size)} left
                      </div>
                    )}
                    {hoveredSize === size && (
                      <div className="productInfoDetailsSizeOptionTooltip">
                        <div className="productInfoDetailsSizeOptionTooltipText">
                          {isSizeOutOfStock(size)
                            ? "This size is currently out of stock"
                            : getSizeStock(size) < 5
                              ? `Only ${getSizeStock(size)} items left in size ${size}`
                              : `${size}`}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="productInfoActions">
              <div
                className={`productInfoActionsQuantity${!selectedSize ? " productInfoActionsQuantityDisabled" : ""}`}
              >
                <button
                  className="productInfoActionsQuantityBtn"
                  onClick={() => selectedSize && handleQuantityChange(-1)}
                  disabled={!selectedSize || quantity <= 1}
                >
                  -
                </button>
                <div className="productInfoActionsQuantityValue">
                  {quantity}
                </div>
                <button
                  className="productInfoActionsQuantityBtn"
                  onClick={() => selectedSize && handleQuantityChange(1)}
                  disabled={!selectedSize}
                >
                  +
                </button>
              </div>{" "}
              <div
                className={`productInfoActionsAddToCart${!selectedSize ? " productInfoActionsAddToCartDisabled" : ""}`}
                onClick={
                  selectedSize && !isAddingToCart ? handleAddToCart : undefined
                }
                style={{
                  cursor:
                    selectedSize && !isAddingToCart ? "pointer" : "not-allowed",
                }}
              >
                <div className="productInfoActionsAddToCartText">
                  {isAddingToCart ? "ADDING..." : "ADD TO CART"}
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>{" "}
      {/* Product Info Sections */}
      <div className="productInfoSections">
        {/* First row - Shipping and Material */}
        <div className="productInfoSectionsRow">
          {/* Shipping and Delivery Info */}
          <div className="productInfoSectionShipping">
            <div className="productInfoSectionShippingItem">
              <div className="productInfoSectionShippingIcon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 6H21L19 16H5L3 6Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 21C9.10457 21 10 20.1046 10 19C10 17.8954 9.10457 17 8 17C6.89543 17 6 17.8954 6 19C6 20.1046 6.89543 21 8 21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M19 21C20.1046 21 21 20.1046 21 19C21 17.8954 20.1046 17 19 17C17.8954 17 18 17.8954 18 19C18 20.1046 17.8954 21 19 21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="productInfoSectionShippingContent">
                <div className="productInfoSectionShippingTitle">
                  {product?.deliveryTime
                    ? `Śro ${product.deliveryTime?.split("-")[0]} Cze - Pią ${product.deliveryTime?.split("-")[1]} Cze`
                    : "Śro 18 Cze - Pią 20 Cze"}
                </div>
                <div className="productInfoSectionShippingSubtitle">
                  Przesyłka standardowa
                </div>
              </div>
              <div className="productInfoSectionShippingPrice">za darmo</div>
            </div>
            <div className="productInfoSectionShippingItem">
              <div className="productInfoSectionShippingIcon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="18"
                    rx="2"
                    ry="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="16"
                    y1="2"
                    x2="16"
                    y2="6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="8"
                    y1="2"
                    x2="8"
                    y2="6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="3"
                    y1="10"
                    x2="21"
                    y2="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="productInfoSectionShippingContent">
                <div className="productInfoSectionShippingTitle">
                  Bezpłatna przesyłka i zwrot
                </div>
              </div>
            </div>
            <div className="productInfoSectionShippingItem">
              <div className="productInfoSectionShippingIcon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12L11 14L15 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="productInfoSectionShippingContent">
                <div className="productInfoSectionShippingTitle">
                  30-dniowe prawo zwrotu
                </div>
              </div>
            </div>{" "}
            <div
              className="productInfoSectionShippingItem productInfoSectionShippingItemClickable"
              onClick={() => setIsSellModalOpen(true)}
            >
              <div className="productInfoSectionShippingIcon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="18"
                    rx="2"
                    ry="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="16"
                    y1="2"
                    x2="16"
                    y2="6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="8"
                    y1="2"
                    x2="8"
                    y2="6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="3"
                    y1="10"
                    x2="21"
                    y2="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="productInfoSectionShippingContent">
                <div className="productInfoSectionShippingTitle">
                  Odsprzedam swoje rzeczy
                </div>
              </div>
              <div className="productInfoSectionShippingIcon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="12"
                    y1="16"
                    x2="12"
                    y2="12"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="12"
                    y1="8"
                    x2="12.01"
                    y2="8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>{" "}
          {/* Material and Care Instructions */}
          <div className="productInfoSectionMaterial">
            {" "}
            <div className="productInfoSectionMaterialHeader">
              <div className="productInfoSectionMaterialTitle">
                Materiał i wskazówki pielęgnacyjne
              </div>
            </div>
            <div className="productInfoSectionMaterialContent">
              {product?.material && (
                <div className="productInfoSectionMaterialItem">
                  <div className="productInfoSectionMaterialLabel">
                    Materiał:
                  </div>
                  <div className="productInfoSectionMaterialValue">
                    {product.material}
                  </div>
                </div>
              )}
              {product?.lining && (
                <div className="productInfoSectionMaterialItem">
                  <div className="productInfoSectionMaterialLabel">
                    Podszewka:
                  </div>
                  <div className="productInfoSectionMaterialValue">
                    {product.lining}
                  </div>
                </div>
              )}
              {product?.careInstructions &&
                product.careInstructions.length > 0 && (
                  <div className="productInfoSectionMaterialItem">
                    <div className="productInfoSectionMaterialLabel">
                      Wskazówki pielęgnacyjne:
                    </div>
                    <div className="productInfoSectionMaterialValue">
                      {product.careInstructions.join(", ")}
                    </div>
                  </div>
                )}{" "}
            </div>
          </div>{" "}
        </div>

        {/* Second row - Details and Size */}
        <div className="productInfoSectionsRowSecond">
          {/* Product Details Section */}
          <div className="productInfoSectionDetails">
            <div className="productInfoSectionDetailsHeader">
              <div className="productInfoSectionDetailsTitle">
                Szczegóły produktu
              </div>
            </div>

            <div className="productInfoSectionDetailsContent">
              {product?.productDetails?.sport && (
                <div className="productInfoSectionDetailsItem">
                  <div className="productInfoSectionDetailsLabel">
                    Rodzaj sportu:
                  </div>
                  <div className="productInfoSectionDetailsValue">
                    {product.productDetails.sport}
                  </div>
                </div>
              )}
              {product?.productDetails?.belt && (
                <div className="productInfoSectionDetailsItem">
                  <div className="productInfoSectionDetailsLabel">Pas:</div>
                  <div className="productInfoSectionDetailsValue">
                    {product.productDetails.belt}
                  </div>
                </div>
              )}
              {product?.productDetails?.neckline && (
                <div className="productInfoSectionDetailsItem">
                  <div className="productInfoSectionDetailsLabel">
                    Rodzaj dekoltu:
                  </div>
                  <div className="productInfoSectionDetailsValue">
                    {product.productDetails.neckline}
                  </div>
                </div>
              )}
              {product?.productDetails?.collar && (
                <div className="productInfoSectionDetailsItem">
                  <div className="productInfoSectionDetailsLabel">
                    Kształt kołnierza:
                  </div>
                  <div className="productInfoSectionDetailsValue">
                    {product.productDetails.collar}
                  </div>
                </div>
              )}
              {product?.productDetails?.pockets && (
                <div className="productInfoSectionDetailsItem">
                  <div className="productInfoSectionDetailsLabel">
                    Kieszenie:
                  </div>
                  <div className="productInfoSectionDetailsValue">
                    {product.productDetails.pockets}
                  </div>
                </div>
              )}
              {product?.productDetails?.sleeves && (
                <div className="productInfoSectionDetailsItem">
                  <div className="productInfoSectionDetailsLabel">
                    Mankiety:
                  </div>
                  <div className="productInfoSectionDetailsValue">
                    {product.productDetails.sleeves}
                  </div>
                </div>
              )}
              {product?.productDetails?.pattern && (
                <div className="productInfoSectionDetailsItem">
                  <div className="productInfoSectionDetailsLabel">Wzór:</div>
                  <div className="productInfoSectionDetailsValue">
                    {product.productDetails.pattern}
                  </div>
                </div>
              )}
              {product?.productDetails?.details && (
                <div className="productInfoSectionDetailsItem">
                  <div className="productInfoSectionDetailsLabel">
                    Szczegóły:
                  </div>
                  <div className="productInfoSectionDetailsValue">
                    {product.productDetails.details}
                  </div>
                </div>
              )}
              {product?.productDetails?.function && (
                <div className="productInfoSectionDetailsItem">
                  <div className="productInfoSectionDetailsLabel">Funkcja:</div>
                  <div className="productInfoSectionDetailsValue">
                    {product.productDetails.function}
                  </div>
                </div>
              )}
              {product?.productDetails?.productNumber && (
                <div className="productInfoSectionDetailsItem">
                  <div className="productInfoSectionDetailsLabel">
                    Numer produktu:
                  </div>
                  <div className="productInfoSectionDetailsValue">
                    {product.productDetails.productNumber}
                  </div>
                </div>
              )}{" "}
            </div>
          </div>

          {/* Size and Fit Section */}
          <div className="productInfoSectionSizeFit">
            <div className="productInfoSectionSizeFitHeader">
              <div className="productInfoSectionSizeFitTitle">
                Rozmiar i krój
              </div>
            </div>

            <div className="productInfoSectionSizeFitContent">
              {product?.sizeAndFit?.modelHeight && (
                <div className="productInfoSectionSizeFitItem">
                  <div className="productInfoSectionSizeFitLabel">
                    Wzrost modela:
                  </div>
                  <div className="productInfoSectionSizeFitValue">
                    {product.sizeAndFit.modelHeight}
                  </div>
                </div>
              )}

              {product?.sizeAndFit?.fitType && (
                <div className="productInfoSectionSizeFitItem">
                  <div className="productInfoSectionSizeFitLabel">Fason:</div>
                  <div className="productInfoSectionSizeFitValue">
                    {product.sizeAndFit.fitType}
                  </div>
                </div>
              )}

              {product?.sizeAndFit?.shape && (
                <div className="productInfoSectionSizeFitItem">
                  <div className="productInfoSectionSizeFitLabel">Kształt:</div>
                  <div className="productInfoSectionSizeFitValue">
                    {product.sizeAndFit.shape}
                  </div>
                </div>
              )}

              {product?.sizeAndFit?.length && (
                <div className="productInfoSectionSizeFitItem">
                  <div className="productInfoSectionSizeFitLabel">Długość:</div>
                  <div className="productInfoSectionSizeFitValue">
                    {product.sizeAndFit.length}
                  </div>
                </div>
              )}

              {product?.sizeAndFit?.sleeveLength && (
                <div className="productInfoSectionSizeFitItem">
                  <div className="productInfoSectionSizeFitLabel">
                    Długość rękaw:
                  </div>
                  <div className="productInfoSectionSizeFitValue">
                    {product.sizeAndFit.sleeveLength}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Sell Modal */}
      {isSellModalOpen && (
        <div className="sellModal" onClick={() => setIsSellModalOpen(false)}>
          <div
            className="sellModalContent"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sellModalHeader">
              <h2 className="sellModalTitle">Odsprzedaj swoje rzeczy</h2>
              <button
                className="sellModalCloseButton"
                onClick={() => setIsSellModalOpen(false)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="18"
                    y1="6"
                    x2="6"
                    y2="18"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>{" "}
            <div className="sellModalBody">
              <div className="sellModalBodyContent">

                <div className="sellModalText">
                  <p className="sellModalDescription">
                    Chcesz rozstać się z tą rzeczą, a okres na zwrot już minął?
                    Jeżeli jest tylko lekko używana, możesz nam ją odsprzedać w
                    zamian za kartę upominkową.{" "}
                    <a href="#" className="sellModalLink">
                      Dowiedz się więcej
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Related Products Section */}
      <RelatedProducts currentProductId={id} />
    </div>
  );
};

export default Product;
