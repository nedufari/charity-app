import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController{
    @Get("/welcome")
    indexApiMessage(){
        return {message:"this is the api for the charity app"}
    }
}
