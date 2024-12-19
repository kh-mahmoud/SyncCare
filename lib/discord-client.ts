import {
    APIEmbed,
    Routes,
    RESTPostAPIChannelMessageResult,
    RESTPostAPICurrentUserCreateDMChannelResult
} from "discord-api-types/v10";
import {REST} from "@discordjs/rest"



export class DiscordClient {
    private rest:REST
    private DISCROD_ID=process.env.NEXT_PUBLIC_DISCORD_ID
    
    constructor() {
        this.rest = new REST({version:"10"}).setToken(
            process.env.NEXT_PUBLIC_DISCORD_TOKEN??""
        )
    }

    private async createDM(){
        return this.rest.post(Routes.userChannels(),{
            body:{recipient_id:this.DISCROD_ID}
        }) as Promise<RESTPostAPICurrentUserCreateDMChannelResult>
    }

    async sendEmbed(embed:APIEmbed){
        const channel = await this.createDM()

        this.rest.post(Routes.channelMessages(channel.id),{
             body:{embeds:[embed]}
        }) as Promise<RESTPostAPIChannelMessageResult>
    }
}