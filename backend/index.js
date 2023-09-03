import "dotenv/config";
import web from "./application/web.js";

// eslint-disable-next-line no-undef
web.listen(process.env.WEB_PORT, () => {
  console.info("Server Running");
});
