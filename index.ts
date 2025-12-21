import mongoose from "mongoose";
import Constant from "@/constant";
import { winsLogger } from "@/library/logger";
import App from "@/app";
import RedisCache from "@/library/redis";
import { enhanceQueryWithCache } from "@/cache";

let server: ReturnType<typeof App.instance.app.listen>;
let shuttingDown = false;

/** Graceful shutdown logic */
const gracefulShutdown = async () => {
  if (shuttingDown) return;
  shuttingDown = true;

  try {
    winsLogger.info("Shutting down gracefully...");

    // Stop accepting new connections
    if (server) {
      await new Promise<void>((resolve, reject) => {
        server.close((err) => {
          if (err) return reject(err);
          resolve();
        });
      });
      winsLogger.info("HTTP server closed.");
    } else {
      winsLogger.info("HTTP server was not running.");
    }

    // Disconnect MongoDB
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      winsLogger.info("MongoDB disconnected.");
    }

    // Shutdown Redis
    await RedisCache.shutdown();
    winsLogger.info("Redis connection closed.");

    winsLogger.info("Shutdown complete. Exiting.");
    process.exit(0);
  } catch (err) {
    winsLogger.error("Error during shutdown", err);
    process.exit(1);
  }
};

(async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(Constant.db.url);
    winsLogger.info("DB_CONNECTED_SUCCESSFULLY...");

    // Initialize Redis cache
    await RedisCache.initialize();

    // Enhance queries with caching
    enhanceQueryWithCache();

    // Start Express server
    const { port } = Constant.server;
    server = App.instance.app.listen(port, () => {
      winsLogger.info(`API_SERVER_IS_LISTENING_ON_PORT: ${port}`);
    });

    // Handle shutdown signals
    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);

    // Handle uncaught errors
    process.on("unhandledRejection", (err: Error) => {
      winsLogger.error("UNHANDLED REJECTION! 💥", err);
      gracefulShutdown();
    });

    process.on("uncaughtException", (err: Error) => {
      winsLogger.error("UNCAUGHT EXCEPTION! 💥", err);
      gracefulShutdown();
    });

  } catch (err) {
    winsLogger.error("STARTUP_FAILED! 💥", err);
    await gracefulShutdown();
  }
})();
