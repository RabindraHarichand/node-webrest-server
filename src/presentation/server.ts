import express from "express";
import path from "path";

interface Options {
  port: number;
  public_path?: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;

  constructor(options: Options) {
    const { port, public_path = "public" } = options;
    this.port = port;
    this.publicPath = public_path;
  }

  async start() {
    //Middlewares

    //Public Folder
    this.app.use(express.static(this.publicPath));

    //*Routes
    this.app.get("/api/todos", (req, res) => {
      res.json([
        { id: 1, text: "Buy Milk", createdAt: new Date() },
        { id: 2, text: "Buy Bread", createdAt: null },
        { id: 3, text: "Buy butter", createdAt: new Date() },
      ]);
    });

    //* SPA
    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      const correctedIndexPath = path.normalize(indexPath);

      res.sendFile(correctedIndexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
