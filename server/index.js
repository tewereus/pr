const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const { errorHandler, notFound } = require("./middlewares/errorHandler");
const authRouter = require("./routes/users/authRoutes");
const otpRouter = require("./routes/utils/otpRoutes");
const adminRouter = require("./routes/users/adminRoutes");
const productRouter = require("./routes/product/productRoutes");
const prodTypeRouter = require("./routes/product/prodTypeRoutes");
const colorRouter = require("./routes/product/colorRoutes");
const wishlistRouter = require("./routes/other/wishlistRoutes");
const couponRouter = require("./routes/other/couponRoutes");
const imageTypeRouter = require("./routes/image/imageTypeRoutes");
const imageCategoryRouter = require("./routes/image/imageCategoryRoutes");

const PORT = process.env.PORT || 9001;

connectDB();
app.use(morgan("dev"));
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", authRouter);
app.use("/api/v1/otp", otpRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/product-type", prodTypeRouter);
app.use("/api/v1/favourites", wishlistRouter);
app.use("/api/v1/coupons", couponRouter);
app.use("/api/v1/colors", colorRouter);
app.use("/api/v1/image-types", imageCategoryRouter);
app.use("/api/v1/image-types", imageTypeRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log(`server running on port ${PORT}`);
});
