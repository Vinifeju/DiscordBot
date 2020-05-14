let Discord = require('discord.js');
let client = new Discord.Client();

let CONFIG = require('../config/config.json');
let HELPERS = require('./helpers.js');
let ROLES = require('./roles.js');

client.on('message', (msg) => {

	// - Команда

	let cmd = msg.content.substring(CONFIG.prefix.length).split(' ').join(' ');

	// Проверка команды

	switch (cmd) {

		case 'roles':
			if (!msg.member.hasPermission('ADMINISTRATOR'))
				return msg.channel.send('Недостаточно прав!');

			if(msg.channel.name !== 'получение-ролей')
				return;

			let reactionList = ['🐍', '🐘', '🔖', '🌐', '🟧', '☕', '💻', '🖥️', '💩', '🐦', '📱', '🟣', '💠', '👶'];

			let embed = new Discord.RichEmbed()
			.setColor('#009e4f')
			.setTitle('Получение ролей | Getting Roles')
			.addField(name = 'Python dev', value = '🐍', true)
			.addField(name = 'PHP dev', value = '🐘', true)
			.addField(name = 'Front end', value = '🔖', true)
			.addField(name = 'Back end', value = '🌐', true)
			.addField(name = 'JavaScript', value = '🟧', true)
			.addField(name = 'Java', value = '☕', true)
			.addField(name = 'C++', value = '💻', true)
			.addField(name = 'C#', value = '🖥️', true)
			.addField(name = '1C', value = '💩', true)
			.addField(name = 'Swift', value = '🐦', true)
			.addField(name = 'Kotlin', value = '📱', true)
			.addField(name = 'Design', value = '🟣', true)
			.addField(name = '3D-шник', value = '💠', true)
			.addField(name = 'Начинающий', value = '👶', true)
			.setFooter('Для того что-бы получить роль, нажмите на emoji');

			// сообщение с командой пользователя, удаляется

			msg.delete();

			// выводим в чат embed, и проставляем на нем реакции.

			msg.channel.send(embed).then(embedMessage => {
				reactionList.reduce((promise, emoji) => promise.then(() => embedMessage.react(emoji)), Promise.resolve());
			});


		break;
	}

});


client.on('messageReactionAdd', (reaction, user) => {

	if (user.bot || reaction.message.channel.name !== 'получение-ролей')
		return;

	// участник который поставил реакцию

	let member = reaction.message.guild.members.find(member => member.id === user.id);

	if (member.roles.size >= 6) {
		return member.send("Вы не можете иметь больше 5 ролей!");
	}

	HELPERS.getRole(reaction, member, ROLES[reaction.emoji.name]);

	
});

client.on('messageReactionRemove', (reaction, user) => {

	if (user.bot || reaction.message.channel.name !== 'получение-ролей')
		return;

	// участник который убрал реакцию

	let member = reaction.message.guild.members.find(member => member.id === user.id);

	HELPERS.removeRole(reaction, member, ROLES[reaction.emoji.name]);

});

let TOKEN = process.env.VINI_TOKEN;
client.login(TOKEN);
