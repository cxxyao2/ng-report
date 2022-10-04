/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 55755:
/*!*****************************************!*\
  !*** ./src/app/utils/make-mock-data.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createYearlyMockData": () => (/* binding */ createYearlyMockData)
/* harmony export */ });
/** Constants used to fill up our data base. */
const Products = [
    'AC fertilizer',
    'AB antifreeze',
    'diesel No1',
    'PD gas',
    'WD30 diesel No2',
    'W-40 Lubricant',
    'Multi Lubricant',
];
const SalesNames = [
    'Maia',
    'Asher',
    'Olivia',
    'Atticus',
    'Amelia',
    'Jack',
    'Charlotte',
];
const Customers = [
    'Saint Laurent Hospital',
    'Juif Community',
    'Alibaba Group',
    'Nord Station',
    'Amelia Academy',
];
/** Builds and returns a new User. */
function createNewOrder(id) {
    const salesName = SalesNames[Math.round(Math.random() * (SalesNames.length - 1))];
    const product = Products[Math.round(Math.random() * (Products.length - 1))];
    const customer = Customers[Math.round(Math.random() * (Customers.length - 1))];
    const month = Math.round(Math.random() * 11);
    const today = new Date();
    const day = Math.round(Math.random() * 27);
    const date = new Date(today.getFullYear(), month, day, 0, 0, 0);
    const amount = Math.round(Math.random() * 2000);
    return {
        position: id,
        orderDate: date,
        productName: product,
        customerName: customer,
        salespersonName: salesName,
        amount,
    };
}
function createYearlyMockData(counter = 10000) {
    // Create init orders
    const orders = Array.from({ length: counter }, (_, k) => createNewOrder(k + 1));
    // create product sales data array :  [{name:string, value:number}]
    const productSalesArray = [];
    Products.forEach((product) => {
        const filterResult = orders.filter((order) => order.productName === product);
        let productAmount = 0;
        filterResult.forEach((order) => {
            productAmount += order.amount;
        });
        productSalesArray.push({ name: product, value: productAmount });
    });
    // create customer sales data :   name:string[], amount:number[]
    const customerAmountArray = [];
    const customerNameArray = [];
    Customers.forEach((customerName) => {
        const filterResult = orders.filter((order) => order.customerName === customerName);
        let customerAmount = 0;
        filterResult.forEach((order) => {
            customerAmount += order.amount;
        });
        customerNameArray.push(customerName);
        customerAmountArray.push(customerAmount);
    });
    // create salesperson sales data :   name:string[], amount:number[]
    const salesAmountArray = [];
    const salesNameArray = [];
    SalesNames.forEach((sname) => {
        const filterResult = orders.filter((order) => order.salespersonName === sname);
        let salesAmount = 0;
        filterResult.forEach((order) => {
            salesAmount += order.amount;
        });
        salesNameArray.push(sname);
        salesAmountArray.push(salesAmount);
    });
    return {
        initOrders: orders,
        productsData: productSalesArray,
        customersData: { names: customerNameArray, amounts: customerAmountArray },
        salesData: { names: salesNameArray, amounts: salesAmountArray },
    };
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************************************!*\
  !*** ./src/app/yearly-data-create.worker.ts ***!
  \**********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var src_app_utils_make_mock_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/utils/make-mock-data */ 55755);

/// <reference lib="webworker" />
addEventListener('message', ({ data }) => {
    const response = (0,src_app_utils_make_mock_data__WEBPACK_IMPORTED_MODULE_0__.createYearlyMockData)(data);
    postMessage(response);
});

})();

/******/ })()
;
//# sourceMappingURL=src_app_yearly-data-create_worker_ts.js.map