// /* eslint-disable */
// /**
//  * Custom interceptors for the project.
//  *
//  * This project has a section in its package.json:
//  *    "pwa-studio": {
//  *        "targets": {
//  *            "intercept": "./local-intercept.js"
//  *        }
//  *    }
//  *
//  * This instructs Buildpack to invoke this file during the intercept phase,
//  * as the very last intercept to run.
//  *
//  * A project can intercept targets from any of its dependencies. In a project
//  * with many customizations, this function would tap those targets and add
//  * or modify functionality from its dependencies.
//  */


// function localIntercept(targets) {

//     const {Targetables} = require('@magento/pwa-buildpack');
//     const targetables = Targetables.using(targets);

//     // 1. load the 'GalleryItem' component to be adjusted
//     const GalleryItem = targetables.reactComponent(
//         '@magento/venia-ui/lib/components/Gallery/item.js'
//     );
//     // 2. import the component that helps rendering CMS Blocks
//     const SkuGalleryItem = GalleryItem.addImport(
//         "SkuGalleryItem from 'src/components/SkuGalleryItem.js'"
//     );
    

//     // 3. render the CMS Block right after the Product's <Form /> component.
//     GalleryItem.insertAfterJSX(
//         '<Link className={classes.name}/>',
//         `<${SkuGalleryItem} sku={sku} handleLinkClick={handleLinkClick} className ={classes.name} productLink = {productLink}/>`
//     );

//     // -----------------------------------------------------------------------------
    
//   //   // Create a React component targetable linked to the productFullDetail.js file
//   // const ProductDetails = targetables.reactComponent(
//   //   "@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js"
//   // );

//   // // Add an import statement to the productFullDetail.js file and
//   // // return the SingleImportStatement object
//   // const TagList = ProductDetails.addImport("{TagList} from 'tagList'");

//   // // Insert the TagList component after the product description and pass in the
//   // // new categoriesListData object added to the useProductFullDetails() hook
//   // ProductDetails.insertAfterJSX(
//   //   "<RichContent html={productDetails.shortDescription.html} />",
//   //   `<${TagList} categoriesListData={productDetails.categoriesListData} />`
//   // );

//   // // Create an ES Module targetable linked to the useProductFullDetail.js file
//   // const useProductFullDetails = targetables.esModule(
//   //   "@magento/peregrine/lib/talons/ProductFullDetail/useProductFullDetail.js"
//   // );

//   // // Wrap the useProductFullDetail hook with your extension's wrapper file
//   // useProductFullDetails.wrapWithFile(
//   //   "useProductFullDetail",
//   //   "tagList/src/targets/wrapper"
//   // );

//   //   //extension 
//   //   targets.of("my-extension").myListContent.tap((api) => {
//   //       api.addContent("Hello");
//   //       api.addContent("World");
//   //     });
    
// //----------------------------------------------------------------------------------

// const PriceAdjustmentsCart_donations = targetables.reactComponent(
//     '@magento/venia-ui/lib/components/CartPage/PriceAdjustments/priceAdjustments.js'
// );
// const DonationsSectionCart = PriceAdjustmentsCart_donations.addImport("{DonationsSection} from '../../../../../../../@mageworx/donations-veniapwa/src/UI/templates/Donations'");
// PriceAdjustmentsCart_donations.insertAfterJSX(
//     '<Section>',
//     `<${DonationsSectionCart} setIsCartUpdating={setIsCartUpdating} />`
// );

// const PriceSummary_donations = targetables.reactComponent(
//     '@magento/venia-ui/lib/components/CartPage/PriceSummary/priceSummary.js'
// );
// const DonationsSummary = PriceSummary_donations.addImport("{DonationsSummary} from '../../../../../../../@mageworx/donations-veniapwa/src/UI/molecules/DonationsSummary'");
// PriceSummary_donations.insertAfterJSX(
//     '<DiscountSummary>',
//     `<${DonationsSummary} classes={{lineItemLabel: classes.lineItemLabel, price: priceClass}} data={flatData.donations} />`
// );

// const PriceAdjustmentsCheckout_donations = targetables.reactComponent(
//     '@magento/venia-ui/lib/components/CheckoutPage/PriceAdjustments/priceAdjustments.js'
// );
// const DonationsSectionCheckout = PriceAdjustmentsCheckout_donations.addImport("{DonationsSection} from '@mageworx/donations-veniapwa/src/UI/templates/Donations'");
// PriceAdjustmentsCheckout_donations.insertAfterJSX(
//     '<Section>',
//     `<${DonationsSectionCheckout} setIsCartUpdating={setPageIsUpdating} />`
// );
// /* MageWorx donations-veniapwa end */
// }

// module.exports = localIntercept;

function localIntercept() {}
module.exports = localIntercept;