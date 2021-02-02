import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "http";

@WebSocketGateway()
export class ProjectsGateway {
    @WebSocketServer()
    server: Server;

    handleCompile() {
        this.server.emit("compile", {});
    }
}
