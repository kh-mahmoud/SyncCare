
import { DiscordClient } from "@/lib/discord-client"


export const POST = async () => {

    const discord = new DiscordClient()

    await discord.sendEmbed({
        title: "👨‍⚕️ New Patient Appointment",   
        color:0xdc4f5,
        fields: [
            {
                name: "Go to dashboard",
                value: "https://sync-care.vercel.app/admin"
            }
        ]
    })
    return new Response("ok")
}
