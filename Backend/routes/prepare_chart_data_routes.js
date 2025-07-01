const express = require("express");
const { prepareSalesDataCount, prepareSalesDataRevenue, prepareGenresWiseSalesCount } = require("../controllers/prepare_chart_data_controller");
const { adminProtected } = require("../Middlewares/authMiddlewares");

const router = express.Router();

router.get("/sale_over_time/count",adminProtected ,prepareSalesDataCount);
router.get("/sale_over_time/revenue",adminProtected, prepareSalesDataRevenue);
router.get("/sale_genre_wise/count", adminProtected, prepareGenresWiseSalesCount);

module.exports = router;
