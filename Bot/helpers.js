let helpers = {

	getRole : (reaction, member, roleName) => {
		let role = reaction.message.guild.roles.find(role => role.name === roleName);
		member.addRole(role);
	},

	removeRole : (reaction, member, roleName) => {
		let role = reaction.message.guild.roles.find(role => role.name === roleName);
		member.removeRole(role);
	}

}

module.exports = helpers;
