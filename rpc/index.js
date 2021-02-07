const { Client } = require("discord-rpc");

var startTimestamp = new Date();

async function reconnect() {
	try {
		await login();
	} catch (error) {
		console.error("discord not open:", error);
		setTimeout(async () => {
			await reconnect();
		}, 1000 * 10);
	}
}

reconnect();

async function login() {
	console.log("login");

	rpc = new Client({
		transport: "ipc",
	});

	rpc.on("ready", () => {
		console.log("logged in: ", rpc.user.username);

		rpc.setActivity({
			details: `Working on Discord Open Source`,
			state: `Collaboration open`,
			startTimestamp,
			largeImageKey: "logo2",
			largeImageText: "Discord Open Source",
			instance: false,
			buttons: [
				{ label: "Discord", url: "https://discord.gg/ZrnGQP6p3d" },
				{
					label: "Repository",
					url: "https://github.com/discord-open-source/discord-open-source",
				},
			],
		});
	});

	rpc.on("disconnected", async () => {
		console.log("disconnected");
		await rpc.destroy();
		await reconnect();
	});

	return rpc.login({ clientId: "807686638742142988" });
}
